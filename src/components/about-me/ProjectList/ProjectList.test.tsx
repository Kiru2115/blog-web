import { render, screen, within } from "@testing-library/react";
import type { Project } from "@/types/about-me";
import ProjectList from "./ProjectList";

const PROJECTS: Project[] = [
  {
    name: "blog-api",
    description: "The back end of my blog.",
    url: "https://github.com/example/blog-api",
    technologies: ["Nest.js", "Prisma"],
  },
  {
    name: "blog-web",
    description: "The front end of my blog.",
    url: "https://github.com/example/blog-web",
    technologies: ["React"],
  },
];

describe("<ProjectList />", () => {
  describe("when it is rendered with a title and projects", () => {
    it("shows the title as a section heading", () => {
      render(<ProjectList title="Projects" projects={PROJECTS} />);

      expect(
        screen.getByRole("heading", { level: 2, name: "Projects" }),
      ).toBeInTheDocument();
    });

    it("shows every project name as a sub-heading, in order", () => {
      render(<ProjectList title="Projects" projects={PROJECTS} />);

      const names = screen
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent);

      expect(names).toEqual(["blog-api", "blog-web"]);
    });

    it("shows the description of every project", () => {
      render(<ProjectList title="Projects" projects={PROJECTS} />);

      expect(screen.getByText("The back end of my blog.")).toBeInTheDocument();
      expect(screen.getByText("The front end of my blog.")).toBeInTheDocument();
    });

    it("lists the technologies of every project", () => {
      render(<ProjectList title="Projects" projects={PROJECTS} />);

      const technologies = screen.getByRole("list", {
        name: "Technologies used in blog-api",
      });

      expect(
        within(technologies)
          .getAllByRole("listitem")
          .map((item) => item.textContent),
      ).toEqual(["Nest.js", "Prisma"]);
    });

    it("links to every project on GitHub", () => {
      render(<ProjectList title="Projects" projects={PROJECTS} />);

      expect(
        screen.getByRole("link", { name: "blog-api on GitHub" }),
      ).toHaveAttribute("href", "https://github.com/example/blog-api");
      expect(
        screen.getByRole("link", { name: "blog-web on GitHub" }),
      ).toHaveAttribute("href", "https://github.com/example/blog-web");
    });
  });

  describe("when a project link is reached with the keyboard", () => {
    it("has a visible focus style", () => {
      render(<ProjectList title="Projects" projects={PROJECTS} />);

      expect(
        screen.getByRole("link", { name: "blog-api on GitHub" }),
      ).toHaveClass("focus-visible:ring-[3px]");
    });
  });
});
