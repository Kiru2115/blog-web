import type { Meta, StoryObj } from "@storybook/react-vite";

import SiteFooter from "./SiteFooter";

const meta = {
  title: "about-me/SiteFooter",
  component: SiteFooter,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    name: "Alan Maroń",
    year: 2026,
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
