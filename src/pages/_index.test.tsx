import { render, screen } from "@testing-library/react";
import {
  AUTHOR_NAME,
  AUTHOR_PORTRAIT,
  PHOTOS,
  PHOTOS_SECTION_ID,
} from "@/constants/about-me";
import Index from "./_index";

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

    it("shows a footer with the current year", () => {
      render(<Index />);

      expect(screen.getByRole("contentinfo")).toHaveTextContent(
        `© ${new Date().getFullYear()} ${AUTHOR_NAME}`,
      );
    });
  });
});
