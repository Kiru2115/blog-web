import { render, screen } from "@testing-library/react";
import PageSection from "./PageSection";

describe("<PageSection />", () => {
  describe("when it is rendered with a title and content", () => {
    it("shows the title as a section heading", () => {
      render(<PageSection title="About me">Some text.</PageSection>);

      expect(
        screen.getByRole("heading", { level: 2, name: "About me" }),
      ).toBeInTheDocument();
    });

    it("is a region named by its title, with the content inside", () => {
      render(<PageSection title="About me">Some text.</PageSection>);

      expect(
        screen.getByRole("region", { name: "About me" }),
      ).toHaveTextContent("Some text.");
    });
  });

  describe("when it gets extra attributes", () => {
    it("passes them on to the section, for example an id for a link to it", () => {
      render(
        <PageSection title="My photography" id="photos" aria-busy="true">
          Photos
        </PageSection>,
      );

      const section = screen.getByRole("region", { name: "My photography" });

      expect(section).toHaveAttribute("id", "photos");
      expect(section).toHaveAttribute("aria-busy", "true");
    });
  });

  describe("when there are two sections on one page", () => {
    it("gives each heading its own id, so each section has the right name", () => {
      render(
        <>
          <PageSection title="Blog">Articles</PageSection>
          <PageSection title="Contact">Links</PageSection>
        </>,
      );

      expect(screen.getByRole("region", { name: "Blog" })).toHaveTextContent(
        "Articles",
      );
      expect(screen.getByRole("region", { name: "Contact" })).toHaveTextContent(
        "Links",
      );
    });
  });
});
