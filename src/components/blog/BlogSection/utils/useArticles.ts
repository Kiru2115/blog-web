import { useCallback, useEffect, useState } from "react";
import type { Article } from "@/services/api/schemas/article";

export type LoadArticles = (signal: AbortSignal) => Promise<Article[]>;

export type ArticlesState =
  | { status: "loading" }
  | { status: "success"; articles: Article[] }
  | { status: "error" };

/**
 * Loads the articles once the component is on the page.
 * `loadArticles` must keep the same identity between renders
 * (a module-level function), or the articles load again on every render.
 */
export const useArticles = (loadArticles: LoadArticles) => {
  const [state, setState] = useState<ArticlesState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  // `attempt` is a dependency on purpose: every new attempt loads the articles again.
  useEffect(() => {
    const controller = new AbortController();

    loadArticles(controller.signal).then(
      (articles) => {
        if (!controller.signal.aborted) {
          setState({ status: "success", articles });
        }
      },
      () => {
        if (!controller.signal.aborted) {
          setState({ status: "error" });
        }
      },
    );

    // The visitor left before the answer came: stop the request, ignore the answer.
    return () => controller.abort();
  }, [loadArticles, attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((previous) => previous + 1);
  }, []);

  return { state, retry };
};
