import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import type { Article } from "@/services/api/schemas/article";
import BlogSection from "./BlogSection";
import type { LoadArticles } from "./utils/useArticles";

const ARTICLES: Article[] = [
  {
    id: "5e1f0a2b-0004-4000-8000-000000000004",
    title: "My first Nest.js API",
    content: "How I built the API of this blog.",
    publishedAt: "2026-11-10T12:00:00.000Z",
  },
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "Setting up WSL, Docker and Git on Windows",
    content: "How I set up my machine for web development.",
    publishedAt: "2026-11-05T18:30:00.000Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world: why I am starting this blog",
    content: "The first article on my blog.",
    publishedAt: "2026-11-01T09:00:00.000Z",
  },
];

// Loaders live outside the stories, so they keep the same identity between renders.
const loadArticles: LoadArticles = () => Promise.resolve(ARTICLES);
const loadNothing: LoadArticles = () => Promise.resolve([]);
const loadForever: LoadArticles = () => new Promise(() => {});
const failToLoad: LoadArticles = () =>
  Promise.reject(new Error("The API could not be reached."));
const loadLongTitle: LoadArticles = () =>
  Promise.resolve([
    { ...ARTICLES[0], title: "Supercalifragilisticexpialidocious".repeat(4) },
  ]);

const meta = {
  title: "blog/BlogSection",
  component: BlogSection,
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
    title: "Blog",
    loadArticles,
  },
} satisfies Meta<typeof BlogSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithArticles: Story = {};

export const Loading: Story = {
  args: { loadArticles: loadForever },
};

export const Empty: Story = {
  args: { loadArticles: loadNothing },
};

export const LoadingFailed: Story = {
  args: { loadArticles: failToLoad },
};

export const LongTitle: Story = {
  args: { loadArticles: loadLongTitle },
};
