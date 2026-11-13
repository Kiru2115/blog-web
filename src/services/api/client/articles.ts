import {
  type Article,
  articleListSchema,
} from "@/services/api/schemas/article";
import { parseResponse } from "@/services/api/utils/parseResponse";
import { apiClient } from "./apiClient";

/** All articles, in the order the API sends them: newest first. */
export const getArticles = async (signal?: AbortSignal): Promise<Article[]> => {
  const response = await apiClient.get<unknown>("/articles", { signal });

  return parseResponse(articleListSchema, response.data);
};
