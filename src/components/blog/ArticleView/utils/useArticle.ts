import { useCallback, useEffect, useState } from "react";
import { type Article, articleIdSchema } from "@/services/api/schemas/article";
import { ApiError } from "@/services/api/utils/apiError";

export type LoadArticle = (id: string, signal: AbortSignal) => Promise<Article>;

type Outcome =
  | { status: "success"; article: Article }
  | { status: "notFound" }
  | { status: "error" };

export type ArticleState = { status: "loading" } | Outcome;

/** What a finished request said, and which ID and attempt it was for. */
interface Answer {
  id: string;
  attempt: number;
  outcome: Outcome;
}

/** The API answers 404 for a missing article and 400 for an ID it does not accept. */
const isMissingArticle = (error: unknown): boolean =>
  error instanceof ApiError && (error.status === 404 || error.status === 400);

/**
 * Loads the article with this ID, and loads again whenever the ID changes.
 * An answer counts only for the ID and the attempt it was asked for, so the
 * old article is never shown under a new address.
 * `loadArticle` must keep the same identity between renders (a module-level function).
 */
export const useArticle = (id: string, loadArticle: LoadArticle) => {
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [attempt, setAttempt] = useState(0);
  const isValidId = articleIdSchema.safeParse(id).success;

  useEffect(() => {
    // An address with an invalid ID cannot point to an article: no request needed.
    if (!isValidId) {
      return;
    }

    const controller = new AbortController();
    const answerWith = (outcome: Outcome) => {
      if (!controller.signal.aborted) {
        setAnswer({ id, attempt, outcome });
      }
    };

    loadArticle(id, controller.signal).then(
      (article) => answerWith({ status: "success", article }),
      (error: unknown) =>
        answerWith(
          isMissingArticle(error)
            ? { status: "notFound" }
            : { status: "error" },
        ),
    );

    // The visitor left, or asked for another article: stop the old request.
    return () => controller.abort();
  }, [id, attempt, isValidId, loadArticle]);

  const retry = useCallback(() => {
    setAttempt((previous) => previous + 1);
  }, []);

  let state: ArticleState = { status: "loading" };

  if (!isValidId) {
    state = { status: "notFound" };
  } else if (answer?.id === id && answer.attempt === attempt) {
    state = answer.outcome;
  }

  return { state, retry };
};
