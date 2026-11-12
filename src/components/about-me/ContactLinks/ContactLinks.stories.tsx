import type { Meta, StoryObj } from "@storybook/react-vite";

import ContactLinks from "./ContactLinks";

const meta = {
  title: "about-me/ContactLinks",
  component: ContactLinks,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Contact",
    links: [{ label: "GitHub", url: "https://github.com/Kiru2115" }],
  },
} satisfies Meta<typeof ContactLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyLinks: Story = {
  args: {
    links: [
      { label: "GitHub", url: "https://github.com/Kiru2115" },
      { label: "LinkedIn", url: "https://www.linkedin.com" },
      { label: "Instagram", url: "https://www.instagram.com" },
    ],
  },
};

export const Empty: Story = {
  args: {
    links: [],
  },
};
