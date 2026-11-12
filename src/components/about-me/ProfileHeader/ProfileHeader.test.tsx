import { render, screen } from "@testing-library/react";
import type { HeroLink, Photo } from "@/types/about-me";
import ProfileHeader from "./ProfileHeader";

const PORTRAIT: Photo = {
  src: "/portrait.jpg",
  alt: "Portrait of Alan Maroń",
  width: 480,
  height: 480,
};

const LINKS: HeroLink[] = [
  { label: "GitHub", url: "https://github.com/example", isPrimary: true },
  { label: "See my photos", url: "#photos" },
];

const renderHeader = (name = "Alan Maroń", links = LINKS) =>
  render(
    <ProfileHeader
      name={name}
      tagline="Intern developer"
      portrait={PORTRAIT}
      links={links}
    />,
  );

describe("<ProfileHeader />", () => {
  describe("when it is rendered with a name, a tagline, a portrait and links", () => {
    it("shows the name as the main heading", () => {
      renderHeader();

      expect(
        screen.getByRole("heading", { level: 1, name: "Alan Maroń" }),
      ).toBeInTheDocument();
    });

    it("shows the tagline", () => {
      renderHeader();

      expect(screen.getByText("Intern developer")).toBeInTheDocument();
    });

    it("shows the portrait with a text alternative", () => {
      renderHeader();

      expect(
        screen.getByRole("img", { name: "Portrait of Alan Maroń" }),
      ).toHaveAttribute("src", "/portrait.jpg");
    });

    it("shows every link, in order, with its address", () => {
      renderHeader();

      const links = screen.getAllByRole("link");

      expect(links.map((link) => link.textContent)).toEqual([
        "GitHub",
        "See my photos",
      ]);
      expect(links[1]).toHaveAttribute("href", "#photos");
    });

    it("styles only the primary link as a filled button", () => {
      renderHeader();

      expect(screen.getByRole("link", { name: "GitHub" })).toHaveClass(
        "bg-gi-primary",
      );
      expect(
        screen.getByRole("link", { name: "See my photos" }),
      ).not.toHaveClass("bg-gi-primary");
    });
  });

  describe("when there are no links", () => {
    it("shows no link list", () => {
      renderHeader("Alan Maroń", []);

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("when the name is a very long word", () => {
    it("lets the heading wrap onto the next line", () => {
      renderHeader("Supercalifragilisticexpialidocious".repeat(3));

      expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
        "wrap-break-word",
      );
    });
  });
});
