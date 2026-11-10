import { render, screen, within } from "@testing-library/react";
import TagList from "./TagList";

describe("<TagList />", () => {
  describe("when it is rendered with a title and tags", () => {
    it("shows the title as a section heading", () => {
      render(<TagList title="Interests" tags={["Gaming", "Travel"]} />);

      expect(
        screen.getByRole("heading", { level: 2, name: "Interests" }),
      ).toBeInTheDocument();
    });

    it("shows every tag as a list item, in order", () => {
      render(<TagList title="Interests" tags={["Gaming", "Travel"]} />);

      const items = within(screen.getByRole("list")).getAllByRole("listitem");

      expect(items.map((item) => item.textContent)).toEqual([
        "Gaming",
        "Travel",
      ]);
    });

    it("uses the secondary badge style by default", () => {
      render(<TagList title="Interests" tags={["Gaming"]} />);

      expect(screen.getByText("Gaming").parentElement).toHaveClass("bg-gi-ash");
    });
  });

  describe("when the primary variant is chosen", () => {
    it("uses the primary badge style", () => {
      render(
        <TagList
          title="Currently learning"
          tags={["React"]}
          variant="primary"
        />,
      );

      expect(screen.getByText("React").parentElement).toHaveClass(
        "bg-gi-primary",
      );
    });
  });

  describe("when there are no tags", () => {
    it("shows an empty list", () => {
      render(<TagList title="Interests" tags={[]} />);

      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });
});
