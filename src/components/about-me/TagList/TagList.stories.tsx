import type { Meta, StoryObj } from "@storybook/react-vite";

import TagList from "./TagList";

const meta = {
  title: "about-me/TagList",
  component: TagList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outlined"],
    },
  },
  args: {
    title: "Interests",
    tags: ["Computer science", "Cybersecurity", "Photography", "Travel"],
  },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {};

export const Primary: Story = {
  args: {
    title: "Currently learning",
    tags: ["TypeScript", "React", "Nest.js", "Docker", "Git", "Linux"],
    variant: "primary",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};

export const Empty: Story = {
  args: {
    tags: [],
  },
};
