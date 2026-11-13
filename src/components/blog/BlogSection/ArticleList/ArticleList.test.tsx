import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { Article } from "@/services/api/schemas/article";
import ArticleList from "./ArticleList";

/** The titles are links, and links need a router around them. */
const renderList = (articles: Article[]) =>
  render(
    <MemoryRouter>
      <ArticleList articles={articles} />
    </MemoryRouter>,
  );

const ARTICLES: Article[] = [
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "Setting up WSL, Docker and Git on Windows",
    content: "How I set up my machine.",
    publishedAt: "2026-11-05T12:00:00.000Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world",
    content: "The first article on my blog.",
    publishedAt: "2026-11-01T12:00:00.000Z",
  },
];

describe("<ArticleList />", () => {
  describe("when it is rendered with articles", () => {
    it("shows every title as a sub-heading, in the order it got them", () => {
      renderList(ARTICLES);

      const titles = screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);

      expect(titles).toEqual([
        "Setting up WSL, Docker and Git on Windows",
        "Hello, world",
      ]);
    });

    it("shows the publication date of every article in words", () => {
      renderList(ARTICLES);

      const [newest] = screen.getAllByRole("listitem");

      expect(within(newest).getByText("5 November 2026")).toHaveAttribute(
        "dateTime",
        "2026-11-05T12:00:00.000Z",
      );
    });

    it("links every title to the page of its article", () => {
      renderList(ARTICLES);

      expect(
        screen.getByRole("link", { name: "Hello, world" }),
      ).toHaveAttribute(
        "href",
        "/articles/5e1f0a2b-0001-4000-8000-000000000001",
      );
    });

    it("does not show the text of the articles", () => {
      renderList(ARTICLES);

      expect(
        screen.queryByText("How I set up my machine."),
      ).not.toBeInTheDocument();
    });
  });

  describe("when a title is very long", () => {
    it("lets the title wrap instead of overflowing", () => {
      renderList([{ ...ARTICLES[0], title: "Supercalifragilistic".repeat(8) }]);

      expect(screen.getByRole("heading", { level: 3 })).toHaveClass(
        "wrap-break-word",
      );
    });
  });
});
