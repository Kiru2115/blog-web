import { act, renderHook, waitFor } from "@testing-library/react";
import type { Article } from "@/services/api/schemas/article";
import { type LoadArticles, useArticles } from "./useArticles";

const ARTICLE: Article = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world",
  content: "The first article on my blog.",
  publishedAt: "2026-11-01T12:00:00.000Z",
};

const OTHER_ARTICLE: Article = {
  ...ARTICLE,
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "Setting up WSL",
};

/** A loader whose answer the test decides on, at the moment it wants. */
const controlledLoader = () => {
  let resolve: (articles: Article[]) => void = () => {};
  let reject: (reason: unknown) => void = () => {};
  let signal: AbortSignal | undefined;

  const load = vi.fn<LoadArticles>((abortSignal) => {
    signal = abortSignal;
    return new Promise<Article[]>((onResolve, onReject) => {
      resolve = onResolve;
      reject = onReject;
    });
  });

  return {
    load,
    resolve: (articles: Article[]) => resolve(articles),
    reject: (reason: unknown) => reject(reason),
    signal: () => signal,
  };
};

describe("useArticles", () => {
  describe("when the articles have not come yet", () => {
    it("is loading", () => {
      const { load } = controlledLoader();

      const { result } = renderHook(() => useArticles(load));

      expect(result.current.state).toEqual({ status: "loading" });
    });
  });

  describe("when the articles come", () => {
    it("gives the articles", async () => {
      const load = vi.fn<LoadArticles>().mockResolvedValue([ARTICLE]);

      const { result } = renderHook(() => useArticles(load));

      await waitFor(() =>
        expect(result.current.state).toEqual({
          status: "success",
          articles: [ARTICLE],
        }),
      );
    });
  });

  describe("when loading fails", () => {
    it("reports an error", async () => {
      const load = vi.fn<LoadArticles>().mockRejectedValue(new Error("down"));

      const { result } = renderHook(() => useArticles(load));

      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "error" }),
      );
    });
  });

  describe("when the visitor tries again", () => {
    it("is loading again, then gives the articles", async () => {
      const load = vi
        .fn<LoadArticles>()
        .mockRejectedValueOnce(new Error("down"))
        .mockResolvedValueOnce([ARTICLE]);
      const { result } = renderHook(() => useArticles(load));
      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "error" }),
      );

      act(() => result.current.retry());

      expect(result.current.state).toEqual({ status: "loading" });
      await waitFor(() =>
        expect(result.current.state).toEqual({
          status: "success",
          articles: [ARTICLE],
        }),
      );
      expect(load).toHaveBeenCalledTimes(2);
    });
  });

  describe("when the component leaves the page before the answer", () => {
    it("cancels the request", () => {
      const loader = controlledLoader();
      const { unmount } = renderHook(() => useArticles(loader.load));

      unmount();

      expect(loader.signal()?.aborted).toBe(true);
    });
  });

  describe("when an old request answers after a new one has started", () => {
    it("ignores the old articles", async () => {
      const first = controlledLoader();
      const second = controlledLoader();
      const { result, rerender } = renderHook(({ load }) => useArticles(load), {
        initialProps: { load: first.load },
      });

      rerender({ load: second.load });
      await act(async () => second.resolve([OTHER_ARTICLE]));
      await act(async () => first.resolve([ARTICLE]));

      expect(first.signal()?.aborted).toBe(true);
      expect(result.current.state).toEqual({
        status: "success",
        articles: [OTHER_ARTICLE],
      });
    });

    it("ignores the old error", async () => {
      const first = controlledLoader();
      const second = controlledLoader();
      const { result, rerender } = renderHook(({ load }) => useArticles(load), {
        initialProps: { load: first.load },
      });

      rerender({ load: second.load });
      await act(async () => second.resolve([OTHER_ARTICLE]));
      await act(async () => first.reject(new Error("cancelled")));

      expect(result.current.state).toEqual({
        status: "success",
        articles: [OTHER_ARTICLE],
      });
    });
  });
});
