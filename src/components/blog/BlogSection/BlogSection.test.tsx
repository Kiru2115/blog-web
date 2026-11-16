import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { getArticles } from "@/services/api/client/articles";
import type { Article } from "@/services/api/schemas/article";
import BlogSection from "./BlogSection";
import type { LoadArticles } from "./utils/useArticles";

vi.mock("@/services/api/client/articles", () => ({
  getArticles: vi.fn(),
}));

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

/** The article titles are links, and links need a router around them. */
const renderInRouter = (ui: ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

const neverAnswers: LoadArticles = () => new Promise(() => {});

describe("<BlogSection />", () => {
  describe("when the articles are loading", () => {
    it("shows the title as a section heading", () => {
      renderInRouter(<BlogSection title="Blog" loadArticles={neverAnswers} />);

      expect(
        screen.getByRole("heading", { level: 2, name: "Blog" }),
      ).toBeInTheDocument();
    });

    it("says that it is loading and marks the section as busy", () => {
      renderInRouter(<BlogSection title="Blog" loadArticles={neverAnswers} />);

      expect(screen.getByRole("status")).toHaveTextContent("Loading articles…");
      expect(screen.getByRole("region", { name: "Blog" })).toHaveAttribute(
        "aria-busy",
        "true",
      );
    });
  });

  describe("when the articles come", () => {
    it("lists every article title, in the order the API sent them", async () => {
      const load = vi.fn<LoadArticles>().mockResolvedValue(ARTICLES);

      renderInRouter(<BlogSection title="Blog" loadArticles={load} />);

      await screen.findByRole("list", { name: "Articles" });
      expect(
        screen
          .getAllByRole("heading", { level: 3 })
          .map((heading) => heading.textContent),
      ).toEqual(["Setting up WSL, Docker and Git on Windows", "Hello, world"]);
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(screen.getByRole("region", { name: "Blog" })).toHaveAttribute(
        "aria-busy",
        "false",
      );
    });
  });

  describe("when there are no articles", () => {
    it("says so instead of showing an empty list", async () => {
      const load = vi.fn<LoadArticles>().mockResolvedValue([]);

      renderInRouter(<BlogSection title="Blog" loadArticles={load} />);

      expect(
        await screen.findByText("No articles yet. Come back soon."),
      ).toBeInTheDocument();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("when the articles cannot be loaded", () => {
    it("shows an error with a way to try again", async () => {
      const load = vi.fn<LoadArticles>().mockRejectedValue(new Error("down"));

      renderInRouter(<BlogSection title="Blog" loadArticles={load} />);

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "The articles could not be loaded.",
      );
      expect(
        screen.getByRole("button", { name: "Try again" }),
      ).toBeInTheDocument();
    });
  });

  describe("when the visitor clicks Try again and the API answers", () => {
    it("loads again and lists the articles", async () => {
      const load = vi
        .fn<LoadArticles>()
        .mockRejectedValueOnce(new Error("down"))
        .mockResolvedValueOnce(ARTICLES);
      renderInRouter(<BlogSection title="Blog" loadArticles={load} />);

      fireEvent.click(await screen.findByRole("button", { name: "Try again" }));

      expect(screen.getByRole("status")).toHaveTextContent("Loading articles…");
      expect(await screen.findByText("Hello, world")).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(load).toHaveBeenCalledTimes(2);
    });
  });

  describe("when no loader is given", () => {
    it("loads the articles from the API", async () => {
      vi.mocked(getArticles).mockResolvedValue(ARTICLES);

      renderInRouter(<BlogSection title="Blog" />);

      expect(await screen.findByText("Hello, world")).toBeInTheDocument();
      expect(getArticles).toHaveBeenCalledWith(expect.any(AbortSignal));
    });
  });
});
