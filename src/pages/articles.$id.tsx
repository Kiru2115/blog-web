import { useParams } from "react-router";
import SiteFooter from "@/components/about-me/SiteFooter/SiteFooter";
import ArticleView from "@/components/blog/ArticleView/ArticleView";
import { AUTHOR_NAME } from "@/constants/about-me";

/** The page of one article, at /articles/{id}. */
const ArticlePage = () => {
  const { id = "" } = useParams();

  return (
    <>
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-8 sm:py-14">
        <ArticleView id={id} />
      </main>
      <SiteFooter name={AUTHOR_NAME} year={new Date().getFullYear()} />
    </>
  );
};

export default ArticlePage;
