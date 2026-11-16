import { Button, InfoMessage } from "@gi-org-pl/athena";
import { Link } from "react-router";
import { getArticle } from "@/services/api/client/articles";
import ArticleContent from "./ArticleContent/ArticleContent";
import { type LoadArticle, useArticle } from "./utils/useArticle";

interface Props {
  /** The ID from the page address. It may be invalid: the page then says the article does not exist. */
  id: string;
  /** Where the article comes from. The API by default; tests and stories pass their own. */
  loadArticle?: LoadArticle;
}

const ArticleView = ({ id, loadArticle = getArticle }: Props) => {
  const { state, retry } = useArticle(id, loadArticle);

  return (
    <div className="flex flex-col gap-8" aria-busy={state.status === "loading"}>
      <Link
        to="/"
        className="self-start rounded-sm font-bold text-gi-orange underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-orange"
      >
        <span aria-hidden="true">← </span>
        Back to the about me page
      </Link>

      {state.status === "loading" && (
        <p role="status" className="text-lg text-gi-gray">
          Loading the article…
        </p>
      )}

      {state.status === "success" && <ArticleContent article={state.article} />}

      {state.status === "notFound" && (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Article not found
          </h1>
          <InfoMessage variant="info">
            There is no article at this address. It may have been deleted, or
            the link has a mistake.
          </InfoMessage>
        </div>
      )}

      {state.status === "error" && (
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Something went wrong
          </h1>
          <InfoMessage role="alert" variant="error">
            The article could not be loaded.
          </InfoMessage>
          <Button type="ghost" size="small" onClick={retry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
