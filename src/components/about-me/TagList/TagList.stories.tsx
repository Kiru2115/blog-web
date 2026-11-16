import type { Meta, StoryObj } from "@storybook/react-vite";

import TagList from "./TagList";

const meta = {
  title: "about-me/TagList",
  component: TagList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Currently learning",
    tags: ["TypeScript", "React", "Nest.js", "Docker", "Git", "Linux"],
  },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTag: Story = {
  args: {
    tags: ["TypeScript", "Infrastructure as code with Terraform and Ansible"],
  },
};

export const Empty: Story = {
  args: {
    tags: [],
  },
};
