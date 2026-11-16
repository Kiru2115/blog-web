import { Link } from "react-router";
import type { Article } from "@/services/api/schemas/article";
import { formatDate } from "@/utils/date/formatDate";

interface Props {
  articles: Article[];
}

const ArticleList = ({ articles }: Props) => {
  return (
    <ul aria-label="Articles" className="flex flex-col divide-y divide-gi-ash">
      {articles.map((article) => (
        <li
          key={article.id}
          className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0"
        >
          <h3 className="text-lg font-bold text-gi-primary wrap-break-word">
            <Link
              to={`/articles/${article.id}`}
              className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-primary"
            >
              {article.title}
            </Link>
          </h3>
          <time
            dateTime={article.publishedAt}
            className="text-sm text-gi-dark-gray"
          >
            {formatDate(article.publishedAt)}
          </time>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
