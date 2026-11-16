import type { Meta, StoryObj } from "@storybook/react-vite";
import ArticleContent from "./ArticleContent";

const meta = {
  title: "blog/ArticleView/ArticleContent",
  component: ArticleContent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    article: {
      id: "5e1f0a2b-0004-4000-8000-000000000004",
      title: "My first Nest.js API",
      content:
        "How I built the API of this blog with Nest.js, Prisma and PostgreSQL, step by step.\n\nFirst came the database: one table for the articles, created by a migration.\nThe seed adds four example articles.\n\nThen the endpoints. Reading is open to everyone, writing needs the admin token.",
      publishedAt: "2026-11-10T12:00:00.000Z",
    },
  },
} satisfies Meta<typeof ArticleContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleParagraph: Story = {
  args: {
    article: {
      id: "5e1f0a2b-0001-4000-8000-000000000001",
      title: "Hello, world: why I am starting this blog",
      content:
        "This is the first article on my blog. I want to write about what I learn as a developer intern.",
      publishedAt: "2026-11-01T09:00:00.000Z",
    },
  },
};

export const HtmlInContent: Story = {
  args: {
    article: {
      id: "5e1f0a2b-0005-4000-8000-000000000005",
      title: "What happens to HTML in an article",
      content:
        'This article tries to run a script: <script>alert("hacked")</script>\n\nAnd to make text <b>bold</b> with HTML. Both show up as plain text.',
      publishedAt: "2026-11-12T12:00:00.000Z",
    },
  },
};

export const LongTitle: Story = {
  args: {
    article: {
      id: "5e1f0a2b-0001-4000-8000-000000000001",
      title: "Supercalifragilisticexpialidocious".repeat(4),
      content: "A short text under a very long title.",
      publishedAt: "2026-11-01T09:00:00.000Z",
    },
  },
};
