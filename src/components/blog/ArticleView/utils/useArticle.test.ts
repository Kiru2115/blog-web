import { act, renderHook, waitFor } from "@testing-library/react";
import type { Article } from "@/services/api/schemas/article";
import { ApiError } from "@/services/api/utils/apiError";
import { type LoadArticle, useArticle } from "./useArticle";

const FIRST: Article = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world",
  content: "The first article on my blog.",
  publishedAt: "2026-11-01T12:00:00.000Z",
};

const SECOND: Article = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "Setting up WSL",
  content: "How I set up my machine.",
  publishedAt: "2026-11-05T12:00:00.000Z",
};

/** A loader whose answers the test gives, one request at a time, when it wants. */
const controlledLoader = () => {
  const requests: {
    id: string;
    signal: AbortSignal;
    resolve: (article: Article) => void;
    reject: (reason: unknown) => void;
  }[] = [];

  const load = vi.fn<LoadArticle>(
    (id, signal) =>
      new Promise<Article>((resolve, reject) => {
        requests.push({ id, signal, resolve, reject });
      }),
  );

  return { load, requests };
};

describe("useArticle", () => {
  describe("when the article has not come yet", () => {
    it("is loading", () => {
      const { load } = controlledLoader();

      const { result } = renderHook(() => useArticle(FIRST.id, load));

      expect(result.current.state).toEqual({ status: "loading" });
    });
  });

  describe("when the article comes", () => {
    it("gives the article it asked for by ID", async () => {
      const load = vi.fn<LoadArticle>().mockResolvedValue(FIRST);

      const { result } = renderHook(() => useArticle(FIRST.id, load));

      await waitFor(() =>
        expect(result.current.state).toEqual({
          status: "success",
          article: FIRST,
        }),
      );
      expect(load).toHaveBeenCalledWith(FIRST.id, expect.any(AbortSignal));
    });
  });

  describe("when the ID in the address is not valid", () => {
    it("says the article does not exist, without asking the API", () => {
      const load = vi.fn<LoadArticle>();

      const { result } = renderHook(() => useArticle("not-a-valid-id", load));

      expect(result.current.state).toEqual({ status: "notFound" });
      expect(load).not.toHaveBeenCalled();
    });
  });

  describe.each([
    [404, "there is no article with this ID"],
    [400, "the API does not accept the ID"],
  ])("when the API answers %i, because %s", (status) => {
    it("says the article does not exist", async () => {
      const load = vi
        .fn<LoadArticle>()
        .mockRejectedValue(new ApiError("Not found.", { status }));

      const { result } = renderHook(() => useArticle(FIRST.id, load));

      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "notFound" }),
      );
    });
  });

  describe.each([
    ["answers with an error status", new ApiError("Down.", { status: 500 })],
    ["cannot be reached", new ApiError("The API could not be reached.")],
    ["answers with data in the wrong shape", new Error("Wrong shape.")],
  ])("when the API %s", (_, error) => {
    it("reports an error", async () => {
      const load = vi.fn<LoadArticle>().mockRejectedValue(error);

      const { result } = renderHook(() => useArticle(FIRST.id, load));

      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "error" }),
      );
    });
  });

  describe("when the visitor tries again", () => {
    it("is loading again, then gives the article", async () => {
      const load = vi
        .fn<LoadArticle>()
        .mockRejectedValueOnce(new Error("Down."))
        .mockResolvedValueOnce(FIRST);
      const { result } = renderHook(() => useArticle(FIRST.id, load));
      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "error" }),
      );

      act(() => result.current.retry());

      expect(result.current.state).toEqual({ status: "loading" });
      await waitFor(() =>
        expect(result.current.state).toEqual({
          status: "success",
          article: FIRST,
        }),
      );
      expect(load).toHaveBeenCalledTimes(2);
    });
  });

  describe("when the ID changes to another article", () => {
    it("never shows the old article while the new one loads", async () => {
      const { load, requests } = controlledLoader();
      const { result, rerender } = renderHook(
        ({ id }) => useArticle(id, load),
        {
          initialProps: { id: FIRST.id },
        },
      );
      await act(async () => requests[0].resolve(FIRST));
      expect(result.current.state).toEqual({
        status: "success",
        article: FIRST,
      });

      rerender({ id: SECOND.id });

      expect(result.current.state).toEqual({ status: "loading" });
      await act(async () => requests[1].resolve(SECOND));
      expect(result.current.state).toEqual({
        status: "success",
        article: SECOND,
      });
    });

    it("cancels the old request and ignores its late article", async () => {
      const { load, requests } = controlledLoader();
      const { result, rerender } = renderHook(
        ({ id }) => useArticle(id, load),
        {
          initialProps: { id: FIRST.id },
        },
      );

      rerender({ id: SECOND.id });
      await act(async () => requests[1].resolve(SECOND));
      await act(async () => requests[0].resolve(FIRST));

      expect(requests[0].signal.aborted).toBe(true);
      expect(result.current.state).toEqual({
        status: "success",
        article: SECOND,
      });
    });

    it("ignores a late error of the old request", async () => {
      const { load, requests } = controlledLoader();
      const { result, rerender } = renderHook(
        ({ id }) => useArticle(id, load),
        {
          initialProps: { id: FIRST.id },
        },
      );

      rerender({ id: SECOND.id });
      await act(async () => requests[1].resolve(SECOND));
      await act(async () => requests[0].reject(new Error("Cancelled.")));

      expect(result.current.state).toEqual({
        status: "success",
        article: SECOND,
      });
    });
  });

  describe("when the page closes before the answer", () => {
    it("cancels the request", () => {
      const { load, requests } = controlledLoader();
      const { unmount } = renderHook(() => useArticle(FIRST.id, load));

      unmount();

      expect(requests[0].signal.aborted).toBe(true);
    });
  });
});
