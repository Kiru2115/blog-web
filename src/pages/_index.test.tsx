import { render, screen } from "@testing-library/react";
import {
  AUTHOR_NAME,
  AUTHOR_PORTRAIT,
  PHOTOS,
  PHOTOS_SECTION_ID,
} from "@/constants/about-me";
import { getArticles } from "@/services/api/client/articles";
import Index from "./_index";

// The page must never call the real API in unit tests. By default the articles never come.
vi.mock("@/services/api/client/articles", () => ({
  getArticles: vi.fn(() => new Promise(() => {})),
}));

describe("<Index /> home page", () => {
  describe("when a visitor opens it", () => {
    it("shows the author's name as the only main heading", () => {
      render(<Index />);

      const mainHeadings = screen.getAllByRole("heading", { level: 1 });

      expect(mainHeadings).toHaveLength(1);
      expect(mainHeadings[0]).toHaveTextContent(AUTHOR_NAME);
    });

    it("shows every section of the page, in order", () => {
      render(<Index />);

      const sectionHeadings = screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent);

      expect(sectionHeadings).toEqual([
        "About me",
        "Blog",
        "Interests",
        "Achievements",
        "Currently learning",
        "Projects",
        "My photography",
        "Contact",
      ]);
    });

    it("gives the portrait and every photo a text alternative", () => {
      render(<Index />);

      for (const image of [AUTHOR_PORTRAIT, ...PHOTOS]) {
        expect(
          screen.getByRole("img", { name: image.alt }),
        ).toBeInTheDocument();
      }
    });

    it("links from the header to the photography section", () => {
      render(<Index />);

      expect(
        screen.getByRole("link", { name: "See my photos" }),
      ).toHaveAttribute("href", `#${PHOTOS_SECTION_ID}`);
      expect(
        screen.getByRole("region", { name: "My photography" }),
      ).toHaveAttribute("id", PHOTOS_SECTION_ID);
    });

    it("keeps the content at a comfortable reading width", () => {
      render(<Index />);

      expect(screen.getByRole("main")).toHaveClass("max-w-3xl", "mx-auto");
    });

    it("shows the rest of the page while the articles are still loading", () => {
      render(<Index />);

      expect(screen.getByRole("region", { name: "Blog" })).toHaveTextContent(
        "Loading articles…",
      );
      expect(
        screen.getByRole("region", { name: "Contact" }),
      ).toBeInTheDocument();
    });

    it("shows the articles from the API in the blog section", async () => {
      vi.mocked(getArticles).mockResolvedValueOnce([
        {
          id: "5e1f0a2b-0001-4000-8000-000000000001",
          title: "Hello, world",
          content: "The first article on my blog.",
          publishedAt: "2026-11-01T12:00:00.000Z",
        },
      ]);

      render(<Index />);

      expect(
        await screen.findByRole("heading", { level: 3, name: "Hello, world" }),
      ).toBeInTheDocument();
    });

    it("shows a footer with the current year", () => {
      render(<Index />);

      expect(screen.getByRole("contentinfo")).toHaveTextContent(
        `© ${new Date().getFullYear()} ${AUTHOR_NAME}`,
      );
    });
  });
});
