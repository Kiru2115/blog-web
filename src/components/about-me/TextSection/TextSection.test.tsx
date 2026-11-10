import { render, screen } from "@testing-library/react";
import TextSection from "./TextSection";

describe("<TextSection />", () => {
  describe("when it is rendered with a title and a text", () => {
    it("shows the title as a section heading", () => {
      render(<TextSection title="About me" text="I like computers." />);

      expect(
        screen.getByRole("heading", { level: 2, name: "About me" }),
      ).toBeInTheDocument();
    });

    it("shows the text", () => {
      render(<TextSection title="About me" text="I like computers." />);

      expect(screen.getByText("I like computers.")).toBeInTheDocument();
    });
  });

  describe("when the text contains a very long word", () => {
    it("lets the text wrap onto the next line", () => {
      const longWord = "Supercalifragilisticexpialidocious".repeat(3);

      render(<TextSection title="About me" text={longWord} />);

      expect(screen.getByText(longWord)).toHaveClass("wrap-break-word");
    });
  });
});
