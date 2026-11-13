import { render, screen, within } from "@testing-library/react";
import type { Article } from "@/services/api/schemas/article";
import ArticleList from "./ArticleList";

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
      render(<ArticleList articles={ARTICLES} />);

      const titles = screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);

      expect(titles).toEqual([
        "Setting up WSL, Docker and Git on Windows",
        "Hello, world",
      ]);
    });

    it("shows the publication date of every article in words", () => {
      render(<ArticleList articles={ARTICLES} />);

      const [newest] = screen.getAllByRole("listitem");

      expect(within(newest).getByText("5 November 2026")).toHaveAttribute(
        "dateTime",
        "2026-11-05T12:00:00.000Z",
      );
    });

    it("does not show the text of the articles", () => {
      render(<ArticleList articles={ARTICLES} />);

      expect(
        screen.queryByText("How I set up my machine."),
      ).not.toBeInTheDocument();
    });
  });

  describe("when a title is very long", () => {
    it("lets the title wrap instead of overflowing", () => {
      render(
        <ArticleList
          articles={[
            { ...ARTICLES[0], title: "Supercalifragilistic".repeat(8) },
          ]}
        />,
      );

      expect(screen.getByRole("heading", { level: 3 })).toHaveClass(
        "wrap-break-word",
      );
    });
  });
});
