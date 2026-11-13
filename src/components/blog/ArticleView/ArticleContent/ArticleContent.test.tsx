import { render, screen } from "@testing-library/react";
import type { Article } from "@/services/api/schemas/article";
import ArticleContent from "./ArticleContent";

const ARTICLE: Article = {
  id: "5e1f0a2b-0004-4000-8000-000000000004",
  title: "My first Nest.js API",
  content:
    "How I built the API of this blog.\n\nFirst the database, then the endpoints.\nThen the tests.",
  publishedAt: "2026-11-10T12:00:00.000Z",
};

describe("<ArticleContent />", () => {
  describe("when it gets an article", () => {
    it("shows the title as the main heading", () => {
      render(<ArticleContent article={ARTICLE} />);

      expect(
        screen.getByRole("heading", { level: 1, name: "My first Nest.js API" }),
      ).toBeInTheDocument();
    });

    it("shows the publication date in words", () => {
      render(<ArticleContent article={ARTICLE} />);

      expect(screen.getByText("10 November 2026")).toHaveAttribute(
        "dateTime",
        "2026-11-10T12:00:00.000Z",
      );
    });

    it("shows the whole text, with its paragraphs kept", () => {
      const { container } = render(<ArticleContent article={ARTICLE} />);

      const paragraphs = [...container.querySelectorAll("article p")].map(
        (paragraph) => paragraph.textContent,
      );

      expect(paragraphs).toEqual([
        "How I built the API of this blog.",
        "First the database, then the endpoints.\nThen the tests.",
      ]);
    });
  });

  describe("when the content contains HTML", () => {
    const html =
      '<script>document.title = "hacked"</script><b>bold</b><img src="x" onerror="document.title = \'hacked\'">';

    it("shows the HTML as text, so the visitor sees the characters", () => {
      render(<ArticleContent article={{ ...ARTICLE, content: html }} />);

      expect(screen.getByText(html)).toBeInTheDocument();
    });

    it("never turns it into elements, so nothing in it can run", () => {
      const { container } = render(
        <ArticleContent article={{ ...ARTICLE, content: html }} />,
      );

      expect(container.querySelector("script, b, img")).toBeNull();
    });
  });

  describe("when the title is very long", () => {
    it("lets the title wrap instead of overflowing", () => {
      render(
        <ArticleContent
          article={{ ...ARTICLE, title: "Supercalifragilistic".repeat(8) }}
        />,
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
        "wrap-break-word",
      );
    });
  });
});
