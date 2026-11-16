import { render, screen, within } from "@testing-library/react";
import TagList from "./TagList";

describe("<TagList />", () => {
  describe("when it is rendered with a title and tags", () => {
    it("shows the title as a section heading", () => {
      render(
        <TagList title="Currently learning" tags={["TypeScript", "React"]} />,
      );

      expect(
        screen.getByRole("heading", { level: 2, name: "Currently learning" }),
      ).toBeInTheDocument();
    });

    it("shows every tag as a list item, in order", () => {
      render(
        <TagList title="Currently learning" tags={["TypeScript", "React"]} />,
      );

      const items = within(screen.getByRole("list")).getAllByRole("listitem");

      expect(items).toHaveLength(2);
      expect(within(items[0]).getByText("TypeScript")).toBeInTheDocument();
      expect(within(items[1]).getByText("React")).toBeInTheDocument();
    });

    it("starts every tag with a terminal prompt that screen readers skip", () => {
      render(<TagList title="Currently learning" tags={["TypeScript"]} />);

      const prompt = within(screen.getByRole("listitem")).getByText(">");

      expect(prompt).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("when a tag is very long", () => {
    it("lets the tag wrap instead of overflowing", () => {
      render(
        <TagList title="Currently learning" tags={["Kubernetes".repeat(8)]} />,
      );

      expect(screen.getByText("Kubernetes".repeat(8))).toHaveClass(
        "wrap-break-word",
      );
    });
  });

  describe("when there are no tags", () => {
    it("shows an empty list", () => {
      render(<TagList title="Currently learning" tags={[]} />);

      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });
});
