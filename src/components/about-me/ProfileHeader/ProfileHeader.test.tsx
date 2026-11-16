import { render, screen, within } from "@testing-library/react";
import type { HeroLink, Photo } from "@/types/about-me";
import ProfileHeader from "./ProfileHeader";

const PORTRAIT: Photo = {
  src: "/portrait.jpg",
  alt: "Portrait of Alan Maroń",
  width: 480,
  height: 480,
};

const LINKS: HeroLink[] = [
  { label: "GitHub", url: "https://github.com/example", variant: "terminal" },
  { label: "See my photos", url: "#photos", variant: "shutter" },
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

      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAccessibleName("GitHub");
      expect(links[0]).toHaveAttribute("href", "https://github.com/example");
      expect(links[1]).toHaveAccessibleName("See my photos");
      expect(links[1]).toHaveAttribute("href", "#photos");
    });

    it("shows a terminal link as a console command and a shutter link as a camera button", () => {
      renderHeader();

      const github = screen.getByRole("link", { name: "GitHub" });
      const photos = screen.getByRole("link", { name: "See my photos" });

      expect(within(github).getByTestId("terminal-cursor")).toBeInTheDocument();
      expect(within(github).queryByTestId("shutter")).not.toBeInTheDocument();
      expect(within(photos).getByTestId("shutter")).toBeInTheDocument();
      expect(
        within(photos).queryByTestId("terminal-cursor"),
      ).not.toBeInTheDocument();
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
