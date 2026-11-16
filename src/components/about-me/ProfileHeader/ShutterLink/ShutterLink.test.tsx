import { render, screen } from "@testing-library/react";
import ShutterLink from "./ShutterLink";

const renderLink = (text = "See my photos") =>
  render(<ShutterLink href="#photos">{text}</ShutterLink>);

describe("<ShutterLink />", () => {
  describe("when it is rendered with a text and an address", () => {
    it("is a link named by its text", () => {
      renderLink();

      expect(
        screen.getByRole("link", { name: "See my photos" }),
      ).toHaveAttribute("href", "#photos");
    });

    it("hides the shutter drawing from screen readers", () => {
      renderLink();

      expect(screen.getByTestId("shutter")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("turns off the flash for people who prefer less motion", () => {
      renderLink();

      expect(screen.getByRole("link")).toHaveClass(
        "active:after:opacity-80",
        "motion-reduce:after:hidden",
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
