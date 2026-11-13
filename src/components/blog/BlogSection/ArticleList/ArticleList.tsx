import type { Article } from "@/services/api/schemas/article";

interface Props {
  articles: Article[];
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });

const ArticleList = ({ articles }: Props) => {
  return (
    <ul aria-label="Articles" className="flex flex-col divide-y divide-gi-ash">
      {articles.map((article) => (
        <li
          key={article.id}
          className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0"
        >
          <h3 className="text-lg font-bold text-gi-primary wrap-break-word">
            {article.title}
          </h3>
          <time
            dateTime={article.publishedAt}
            className="text-sm text-gi-dark-gray"
          >
            {DATE_FORMAT.format(new Date(article.publishedAt))}
          </time>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
