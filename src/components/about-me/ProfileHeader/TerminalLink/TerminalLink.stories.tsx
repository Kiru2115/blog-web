import type { Meta, StoryObj } from "@storybook/react-vite";

import TerminalLink from "./TerminalLink";

const meta = {
  title: "about-me/ProfileHeader/TerminalLink",
  component: TerminalLink,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    href: "https://github.com/Kiru2115",
    children: "GitHub",
  },
} satisfies Meta<typeof TerminalLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongText: Story = {
  args: {
    children: "Supercalifragilisticexpialidocious".repeat(3),
  },
};
