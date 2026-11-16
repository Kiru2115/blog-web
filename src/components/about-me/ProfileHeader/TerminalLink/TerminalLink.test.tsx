import { render, screen } from "@testing-library/react";
import TerminalLink from "./TerminalLink";

const renderLink = (text = "GitHub") =>
  render(<TerminalLink href="https://github.com/example">{text}</TerminalLink>);

describe("<TerminalLink />", () => {
  describe("when it is rendered with a text and an address", () => {
    it("is a link named only by its text, without the prompt", () => {
      renderLink();

      expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
        "href",
        "https://github.com/example",
      );
    });

    it("hides the prompt and the cursor from screen readers", () => {
      renderLink();

      expect(screen.getByText("~$")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByTestId("terminal-cursor")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("stops the cursor blinking for people who prefer less motion", () => {
      renderLink();

      expect(screen.getByTestId("terminal-cursor")).toHaveClass(
        "animate-[blink_1s_step-end_infinite]",
        "motion-reduce:animate-none",
      );
    });

    it("shows a visible outline when it gets keyboard focus", () => {
      renderLink();

      expect(screen.getByRole("link")).toHaveClass("focus-visible:outline-2");
    });
  });

  describe("when the text is a very long word", () => {
    it("lets the text wrap onto the next line", () => {
      renderLink("Supercalifragilisticexpialidocious".repeat(3));

      expect(
        screen.getByText("Supercalifragilisticexpialidocious".repeat(3)),
      ).toHaveClass("wrap-break-word");
    });
  });
});
