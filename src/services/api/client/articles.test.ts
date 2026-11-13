import type { AxiosResponse } from "axios";
import { ApiError } from "@/services/api/utils/apiError";
import { apiClient } from "./apiClient";
import { getArticle, getArticles } from "./articles";

const ARTICLES = [
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "Setting up WSL",
    content: "How I set up my machine.",
    publishedAt: "2026-11-05T12:00:00.000Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world",
    content: "The first article on my blog.",
    publishedAt: "2026-11-01T12:00:00.000Z",
  },
];

const answerWith = (data: unknown) =>
  vi
    .spyOn(apiClient, "get")
    .mockResolvedValue({ data } as AxiosResponse<unknown>);

describe("getArticles", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("when the API answers with a list of articles", () => {
    it("asks for /articles and passes the abort signal on", async () => {
      const get = answerWith(ARTICLES);
      const { signal } = new AbortController();

      await getArticles(signal);

      expect(get).toHaveBeenCalledWith("/articles", { signal });
    });

    it("returns the articles in the order the API sent them", async () => {
      answerWith(ARTICLES);

      await expect(getArticles()).resolves.toEqual(ARTICLES);
    });
  });

  describe("when the API answers with an empty list", () => {
    it("returns an empty list", async () => {
      answerWith([]);

      await expect(getArticles()).resolves.toEqual([]);
    });
  });

  describe("when the answer does not match the schema", () => {
    it("rejects with an ApiError", async () => {
      answerWith([{ ...ARTICLES[0], id: "not-a-uuid" }]);

      await expect(getArticles()).rejects.toThrow(ApiError);
    });
  });

  describe("when the request fails", () => {
    it("rejects with the error from the client", async () => {
      const error = new ApiError("The API could not be reached.");
      vi.spyOn(apiClient, "get").mockRejectedValue(error);

      await expect(getArticles()).rejects.toBe(error);
    });
  });
});

describe("getArticle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("when the API answers with the article", () => {
    it("asks for /articles/{id} and returns the article", async () => {
      const get = answerWith(ARTICLES[0]);
      const { signal } = new AbortController();

      await expect(getArticle(ARTICLES[0].id, signal)).resolves.toEqual(
        ARTICLES[0],
      );
      expect(get).toHaveBeenCalledWith(`/articles/${ARTICLES[0].id}`, {
        signal,
      });
    });
  });

  describe("when the ID has characters that mean something in an address", () => {
    it("encodes them, so the ID stays one part of the address", async () => {
      const get = answerWith(ARTICLES[0]);

      await getArticle("../status?x=1").catch(() => undefined);

      expect(get).toHaveBeenCalledWith("/articles/..%2Fstatus%3Fx%3D1", {
        signal: undefined,
      });
    });
  });

  describe("when the answer does not match the schema", () => {
    it("rejects with an ApiError", async () => {
      answerWith({ ...ARTICLES[0], content: 42 });

      await expect(getArticle(ARTICLES[0].id)).rejects.toThrow(ApiError);
    });
  });

  describe("when the API answers 404", () => {
    it("rejects with the ApiError from the client, status included", async () => {
      const error = new ApiError("The API answered with status 404.", {
        status: 404,
      });
      vi.spyOn(apiClient, "get").mockRejectedValue(error);

      await expect(getArticle(ARTICLES[0].id)).rejects.toBe(error);
    });
  });
});
