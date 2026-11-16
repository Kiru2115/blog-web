import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import ArticleList from "./ArticleList";

const meta = {
  title: "blog/BlogSection/ArticleList",
  component: ArticleList,
  // The titles are links, and links need a router around them.
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
    articles: [
      {
        id: "5e1f0a2b-0004-4000-8000-000000000004",
        title: "My first Nest.js API",
        content: "How I built the API of this blog.",
        publishedAt: "2026-11-10T12:00:00.000Z",
      },
      {
        id: "5e1f0a2b-0001-4000-8000-000000000001",
        title: "Hello, world: why I am starting this blog",
        content: "The first article on my blog.",
        publishedAt: "2026-11-01T09:00:00.000Z",
      },
    ],
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleArticle: Story = {
  args: {
    articles: [
      {
        id: "5e1f0a2b-0001-4000-8000-000000000001",
        title: "Hello, world: why I am starting this blog",
        content: "The first article on my blog.",
        publishedAt: "2026-11-01T09:00:00.000Z",
      },
    ],
  },
};

export const LongTitle: Story = {
  args: {
    articles: [
      {
        id: "5e1f0a2b-0001-4000-8000-000000000001",
        title: "Supercalifragilisticexpialidocious".repeat(4),
        content: "The first article on my blog.",
        publishedAt: "2026-11-01T09:00:00.000Z",
      },
    ],
  },
};
