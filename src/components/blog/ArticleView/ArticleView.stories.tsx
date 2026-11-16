import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import type { Article } from "@/services/api/schemas/article";
import { ApiError } from "@/services/api/utils/apiError";
import ArticleView from "./ArticleView";
import type { LoadArticle } from "./utils/useArticle";

const ARTICLE: Article = {
  id: "5e1f0a2b-0004-4000-8000-000000000004",
  title: "My first Nest.js API",
  content:
    "How I built the API of this blog with Nest.js, Prisma and PostgreSQL, step by step.\n\nFirst came the database: one table for the articles, created by a migration.\n\nThen the endpoints. Reading is open to everyone, writing needs the admin token.",
  publishedAt: "2026-11-10T12:00:00.000Z",
};

// Loaders live outside the stories, so they keep the same identity between renders.
const loadArticle: LoadArticle = () => Promise.resolve(ARTICLE);
const loadForever: LoadArticle = () => new Promise(() => {});
const loadMissing: LoadArticle = () =>
  Promise.reject(
    new ApiError("The API answered with status 404.", { status: 404 }),
  );
const failToLoad: LoadArticle = () =>
  Promise.reject(new ApiError("The API could not be reached."));
const loadHtml: LoadArticle = () =>
  Promise.resolve({
    ...ARTICLE,
    content:
      'This article tries to run a script: <script>alert("hacked")</script>\n\nAnd to make text <b>bold</b> with HTML. Both show up as plain text.',
  });
const loadLongTitle: LoadArticle = () =>
  Promise.resolve({
    ...ARTICLE,
    title: "Supercalifragilisticexpialidocious".repeat(4),
  });

const meta = {
  title: "blog/ArticleView",
  component: ArticleView,
  // The way back is a link, and links need a router around them.
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    id: ARTICLE.id,
    loadArticle,
  },
} satisfies Meta<typeof ArticleView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticle: Story = {};

export const Loading: Story = {
  args: { loadArticle: loadForever },
};

export const NotFound: Story = {
  args: { loadArticle: loadMissing },
};

export const InvalidId: Story = {
  args: { id: "not-a-valid-id" },
};

export const LoadingFailed: Story = {
  args: { loadArticle: failToLoad },
};

export const HtmlInContent: Story = {
  args: { loadArticle: loadHtml },
};

export const LongTitle: Story = {
  args: { loadArticle: loadLongTitle },
};
