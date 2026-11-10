import { render, screen } from "@testing-library/react";
import IconTitle from "./IconTitle";

describe("<IconTitle />", () => {
  describe("when it is rendered inside a heading", () => {
    it("keeps the heading's accessible name to the text only", () => {
      render(
        <h2>
          <IconTitle icon="/heart.svg">Interests</IconTitle>
        </h2>,
      );

      expect(
        screen.getByRole("heading", { name: "Interests" }),
      ).toBeInTheDocument();
    });

    it("marks the icon as decorative", () => {
      render(<IconTitle icon="/heart.svg">Interests</IconTitle>);

      expect(screen.getByTestId("icon-title-icon")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("draws the icon in a palette colour", () => {
      render(<IconTitle icon="/heart.svg">Interests</IconTitle>);

      const icon = screen.getByTestId("icon-title-icon");

      expect(icon).toHaveClass("bg-gi-secondary");
      expect(icon.style.maskImage).toBe('url("/heart.svg")');
    });
  });
});
