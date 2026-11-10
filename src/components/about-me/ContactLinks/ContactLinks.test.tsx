import { render, screen } from "@testing-library/react";
import type { ContactLink } from "@/types/about-me";
import ContactLinks from "./ContactLinks";

const LINKS: ContactLink[] = [
  { label: "GitHub", url: "https://github.com/example" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/example" },
];

describe("<ContactLinks />", () => {
  describe("when it is rendered with a title and links", () => {
    it("shows the title as a section heading", () => {
      render(<ContactLinks title="Contact" links={LINKS} />);

      expect(
        screen.getByRole("heading", { level: 2, name: "Contact" }),
      ).toBeInTheDocument();
    });

    it("shows every link, in order, with its address", () => {
      render(<ContactLinks title="Contact" links={LINKS} />);

      const links = screen.getAllByRole("link");

      expect(links.map((link) => link.textContent)).toEqual([
        "GitHub",
        "LinkedIn",
      ]);
      expect(links[0]).toHaveAttribute("href", "https://github.com/example");
    });
  });

  describe("when there are no links", () => {
    it("shows no links", () => {
      render(<ContactLinks title="Contact" links={[]} />);

      expect(screen.queryAllByRole("link")).toHaveLength(0);
    });
  });
});
