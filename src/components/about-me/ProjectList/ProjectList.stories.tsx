import type { Meta, StoryObj } from "@storybook/react-vite";

import ProjectList from "./ProjectList";

const meta = {
  title: "about-me/ProjectList",
  component: ProjectList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Projects",
    projects: [
      {
        name: "blog-api",
        description:
          "The back end of my blog: a REST API with Swagger documentation, running in Docker.",
        url: "https://github.com/Kiru2115/blog-api",
        technologies: ["Nest.js", "Prisma", "PostgreSQL", "Docker"],
      },
      {
        name: "blog-web",
        description:
          "The front end of my blog, including the page you are reading.",
        url: "https://github.com/Kiru2115/blog-web",
        technologies: ["React", "Vite", "Tailwind CSS", "Playwright"],
      },
    ],
  },
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleProject: Story = {
  args: {
    projects: [
      {
        name: "blog-api",
        description: "The back end of my blog.",
        url: "https://github.com/Kiru2115/blog-api",
        technologies: ["Nest.js"],
      },
    ],
  },
};

export const LongDescription: Story = {
  args: {
    projects: [
      {
        name: "blog-api",
        description: "Supercalifragilisticexpialidocious".repeat(3),
        url: "https://github.com/Kiru2115/blog-api",
        technologies: ["Nest.js", "Prisma"],
      },
    ],
  },
};
