import { act, fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes } from "react-router";
import { AUTHOR_NAME } from "@/constants/about-me";
import { getArticle } from "@/services/api/client/articles";
import type { Article } from "@/services/api/schemas/article";
import ArticlePage from "./articles.$id";

// The page must never call the real API in unit tests.
vi.mock("@/services/api/client/articles", () => ({
  getArticle: vi.fn(),
}));

const FIRST: Article = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world",
  content: "The first article on my blog.",
  publishedAt: "2026-11-01T12:00:00.000Z",
};

const SECOND: Article = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "Setting up WSL",
  content: "How I set up my machine.",
  publishedAt: "2026-11-05T12:00:00.000Z",
};

/** The app with the about me page at "/" and this page at /articles/{id}, opened at `address`. */
const renderApp = (address: string) =>
  render(
    <MemoryRouter initialEntries={[address]}>
      <Routes>
        <Route path="/" element={<h1>About me page</h1>} />
        <Route
          path="/articles/:id"
          element={
            <>
              <ArticlePage />
              <Link to={`/articles/${SECOND.id}`}>Open the second article</Link>
            </>
          }
        />
        <Route path="/articles-without-id" element={<ArticlePage />} />
      </Routes>
    </MemoryRouter>,
  );

describe("<ArticlePage /> /articles/{id}", () => {
  afterEach(() => {
    vi.mocked(getArticle).mockReset();
  });

  describe("when a visitor opens an article address directly, from a bookmark", () => {
    it("loads the article with the ID from the address", async () => {
      vi.mocked(getArticle).mockResolvedValue(FIRST);

      renderApp(`/articles/${FIRST.id}`);

      expect(
        await screen.findByRole("heading", { level: 1, name: "Hello, world" }),
      ).toBeInTheDocument();
      expect(getArticle).toHaveBeenCalledWith(
        FIRST.id,
        expect.any(AbortSignal),
      );
    });

    it("shows the footer", () => {
      vi.mocked(getArticle).mockReturnValue(new Promise(() => {}));

      renderApp(`/articles/${FIRST.id}`);

      expect(screen.getByRole("contentinfo")).toHaveTextContent(AUTHOR_NAME);
    });
  });

  describe("when the visitor goes from one article to another", () => {
    it("loads the new article and never shows the old one under the new address", async () => {
      let answerSecond: (article: Article) => void = () => {};
      vi.mocked(getArticle).mockImplementation((id) =>
        id === FIRST.id
          ? Promise.resolve(FIRST)
          : new Promise((resolve) => {
              answerSecond = resolve;
            }),
      );
      renderApp(`/articles/${FIRST.id}`);
      await screen.findByRole("heading", { name: "Hello, world" });

      fireEvent.click(
        screen.getByRole("link", { name: "Open the second article" }),
      );

      expect(
        screen.queryByRole("heading", { name: "Hello, world" }),
      ).not.toBeInTheDocument();
      expect(screen.getByRole("status")).toHaveTextContent(
        "Loading the article…",
      );
      await act(async () => answerSecond(SECOND));
      expect(
        screen.getByRole("heading", { level: 1, name: "Setting up WSL" }),
      ).toBeInTheDocument();
    });
  });

  describe("when the visitor clicks the way back", () => {
    it("goes to the about me page", async () => {
      vi.mocked(getArticle).mockResolvedValue(FIRST);
      renderApp(`/articles/${FIRST.id}`);
      await screen.findByRole("heading", { name: "Hello, world" });

      fireEvent.click(
        screen.getByRole("link", { name: "Back to the about me page" }),
      );

      expect(
        screen.getByRole("heading", { level: 1, name: "About me page" }),
      ).toBeInTheDocument();
    });
  });

  describe("when the address has no ID at all", () => {
    it("says the article does not exist", () => {
      renderApp("/articles-without-id");

      expect(
        screen.getByRole("heading", { level: 1, name: "Article not found" }),
      ).toBeInTheDocument();
      expect(getArticle).not.toHaveBeenCalled();
    });
  });
});
