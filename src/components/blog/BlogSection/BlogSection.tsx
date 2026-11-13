import { Button, InfoMessage, Section } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import { getArticles } from "@/services/api/client/articles";
import ArticleList from "./ArticleList/ArticleList";
import { type LoadArticles, useArticles } from "./utils/useArticles";

interface Props {
  title: ReactNode;
  /** Where the articles come from. The API by default; tests and stories pass their own. */
  loadArticles?: LoadArticles;
}

const BlogSection = ({ title, loadArticles = getArticles }: Props) => {
  const { state, retry } = useArticles(loadArticles);

  return (
    <Section title={title} aria-busy={state.status === "loading"}>
      {state.status === "loading" && (
        <p role="status" className="text-gi-dark-gray">
          Loading articles…
        </p>
      )}

      {state.status === "error" && (
        <div className="flex flex-col items-start gap-4">
          <InfoMessage role="alert" variant="error">
            The articles could not be loaded.
          </InfoMessage>
          <Button type="outlined" size="small" onClick={retry}>
            Try again
          </Button>
        </div>
      )}

      {state.status === "success" && state.articles.length === 0 && (
        <InfoMessage>No articles yet. Come back soon.</InfoMessage>
      )}

      {state.status === "success" && state.articles.length > 0 && (
        <ArticleList articles={state.articles} />
      )}
    </Section>
  );
};

export default BlogSection;
