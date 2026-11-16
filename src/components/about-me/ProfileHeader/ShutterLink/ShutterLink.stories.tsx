import type { Meta, StoryObj } from "@storybook/react-vite";

import ShutterLink from "./ShutterLink";

const meta = {
  title: "about-me/ProfileHeader/ShutterLink",
  component: ShutterLink,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    href: "#photos",
    children: "See my photos",
  },
} satisfies Meta<typeof ShutterLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongText: Story = {
  args: {
    children: "Supercalifragilisticexpialidocious".repeat(3),
  },
};
