import {
  type Article,
  articleListSchema,
  articleSchema,
} from "@/services/api/schemas/article";
import { parseResponse } from "@/services/api/utils/parseResponse";
import { apiClient } from "./apiClient";

/** All articles, in the order the API sends them: newest first. */
export const getArticles = async (signal?: AbortSignal): Promise<Article[]> => {
  const response = await apiClient.get<unknown>("/articles", { signal });

  return parseResponse(articleListSchema, response.data);
};

/** One whole article. The API answers 404 when there is no article with this ID. */
export const getArticle = async (
  id: string,
  signal?: AbortSignal,
): Promise<Article> => {
  const response = await apiClient.get<unknown>(
    `/articles/${encodeURIComponent(id)}`,
    { signal },
  );

  return parseResponse(articleSchema, response.data);
};
