import { render, screen, within } from "@testing-library/react";
import type { Interest } from "@/types/about-me";
import InterestGrid from "./InterestGrid";

const INTERESTS: Interest[] = [
  { label: "Gaming", icon: "/icons/gamepad.svg" },
  { label: "Travel", icon: "/icons/plane.svg" },
];

describe("<InterestGrid />", () => {
  describe("when it is rendered with a title and interests", () => {
    it("shows the title as a section heading", () => {
      render(<InterestGrid title="Interests" interests={INTERESTS} />);

      expect(
        screen.getByRole("heading", { level: 2, name: "Interests" }),
      ).toBeInTheDocument();
    });

    it("shows every interest as a list item, in order", () => {
      render(<InterestGrid title="Interests" interests={INTERESTS} />);

      const items = within(screen.getByRole("list")).getAllByRole("listitem");

      expect(items.map((item) => item.textContent)).toEqual([
        "Gaming",
        "Travel",
      ]);
    });

    it("shows the icon of every interest, hidden from screen readers", () => {
      render(<InterestGrid title="Interests" interests={INTERESTS} />);

      const [gamingIcon] = screen.getAllByTestId("interest-icon");

      expect(gamingIcon).toHaveAttribute("aria-hidden", "true");
      expect(gamingIcon).toHaveStyle({
        maskImage: 'url("/icons/gamepad.svg")',
      });
    });
  });

  describe("when a label is very long", () => {
    it("lets the label wrap inside its tile", () => {
      render(
        <InterestGrid
          title="Interests"
          interests={[{ label: "Cybersecurity".repeat(6), icon: "/x.svg" }]}
        />,
      );

      expect(screen.getByText("Cybersecurity".repeat(6))).toHaveClass(
        "wrap-break-word",
      );
    });
  });
});
