import type { Article } from "@/services/api/schemas/article";
import { formatDate } from "@/utils/date/formatDate";
import { splitParagraphs } from "./utils/splitParagraphs";

interface Props {
  article: Article;
}

/**
 * The whole article. The text is rendered as text, never as HTML:
 * a <script> or <b> in the content shows up as those characters and never runs.
 */
const ArticleContent = ({ article }: Props) => {
  const paragraphs = splitParagraphs(article.content);

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-extrabold text-gi-primary wrap-break-word sm:text-4xl">
          {article.title}
        </h1>
        <time
          dateTime={article.publishedAt}
          className="text-sm text-gi-dark-gray"
        >
          {formatDate(article.publishedAt)}
        </time>
      </header>
      <div className="flex flex-col gap-5">
        {paragraphs.map((paragraph, index) => (
          <p
            // Paragraphs have no IDs, and their order never changes while the article is shown.
            key={index}
            className="text-lg leading-relaxed whitespace-pre-line wrap-break-word"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
};

export default ArticleContent;
