import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { getArticle } from "@/services/api/client/articles";
import type { Article } from "@/services/api/schemas/article";
import { ApiError } from "@/services/api/utils/apiError";
import ArticleView from "./ArticleView";
import type { LoadArticle } from "./utils/useArticle";

vi.mock("@/services/api/client/articles", () => ({
  getArticle: vi.fn(),
}));

const ARTICLE: Article = {
  id: "5e1f0a2b-0004-4000-8000-000000000004",
  title: "My first Nest.js API",
  content: "How I built the API of this blog.\n\nStep by step.",
  publishedAt: "2026-11-10T12:00:00.000Z",
};

/** The back link needs a router around it. */
const renderInRouter = (ui: ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

const neverAnswers: LoadArticle = () => new Promise(() => {});

const expectWayBack = () =>
  expect(
    screen.getByRole("link", { name: "Back to the about me page" }),
  ).toHaveAttribute("href", "/");

describe("<ArticleView />", () => {
  describe("when the article is loading", () => {
    it("says that it is loading and marks the page as busy", () => {
      const { container } = renderInRouter(
        <ArticleView id={ARTICLE.id} loadArticle={neverAnswers} />,
      );

      expect(screen.getByRole("status")).toHaveTextContent(
        "Loading the article…",
      );
      expect(container.firstElementChild).toHaveAttribute("aria-busy", "true");
    });

    it("already shows the way back to the about me page", () => {
      renderInRouter(
        <ArticleView id={ARTICLE.id} loadArticle={neverAnswers} />,
      );

      expectWayBack();
    });
  });

  describe("when the API answers with the article", () => {
    it("shows the whole article, with its paragraphs", async () => {
      const load = vi.fn<LoadArticle>().mockResolvedValue(ARTICLE);

      renderInRouter(<ArticleView id={ARTICLE.id} loadArticle={load} />);

      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: "My first Nest.js API",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("How I built the API of this blog."),
      ).toBeInTheDocument();
      expect(screen.getByText("Step by step.")).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(load).toHaveBeenCalledWith(ARTICLE.id, expect.any(AbortSignal));
    });
  });

  describe("when the article does not exist", () => {
    it("says so, with a way back", async () => {
      const load = vi
        .fn<LoadArticle>()
        .mockRejectedValue(
          new ApiError("The API answered with status 404.", { status: 404 }),
        );

      renderInRouter(<ArticleView id={ARTICLE.id} loadArticle={load} />);

      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: "Article not found",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/There is no article at this address/),
      ).toBeInTheDocument();
      expectWayBack();
      expect(
        screen.queryByRole("button", { name: "Try again" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("when the address has an invalid ID", () => {
    it("says the article does not exist, without asking the API", () => {
      const load = vi.fn<LoadArticle>();

      renderInRouter(<ArticleView id="not-a-valid-id" loadArticle={load} />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Article not found" }),
      ).toBeInTheDocument();
      expectWayBack();
      expect(load).not.toHaveBeenCalled();
    });
  });

  describe("when the API is down, answers with an error or with a wrong shape", () => {
    it("shows an error with a way to try again", async () => {
      const load = vi.fn<LoadArticle>().mockRejectedValue(new Error("Down."));

      renderInRouter(<ArticleView id={ARTICLE.id} loadArticle={load} />);

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "The article could not be loaded.",
      );
      expect(
        screen.getByRole("button", { name: "Try again" }),
      ).toBeInTheDocument();
      expectWayBack();
    });
  });

  describe("when the visitor clicks Try again and the API answers", () => {
    it("loads again and shows the article", async () => {
      const load = vi
        .fn<LoadArticle>()
        .mockRejectedValueOnce(new Error("Down."))
        .mockResolvedValueOnce(ARTICLE);
      renderInRouter(<ArticleView id={ARTICLE.id} loadArticle={load} />);

      fireEvent.click(await screen.findByRole("button", { name: "Try again" }));

      expect(screen.getByRole("status")).toHaveTextContent(
        "Loading the article…",
      );
      expect(
        await screen.findByRole("heading", { name: "My first Nest.js API" }),
      ).toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("when no loader is given", () => {
    it("loads the article from the API", async () => {
      vi.mocked(getArticle).mockResolvedValue(ARTICLE);

      renderInRouter(<ArticleView id={ARTICLE.id} />);

      expect(
        await screen.findByRole("heading", { name: "My first Nest.js API" }),
      ).toBeInTheDocument();
      expect(getArticle).toHaveBeenCalledWith(
        ARTICLE.id,
        expect.any(AbortSignal),
      );
    });
  });
});
