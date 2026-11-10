import type { Meta, StoryObj } from "@storybook/react-vite";

import portrait from "@/assets/images/portrait.jpg";
import ProfileHeader from "./ProfileHeader";

const meta = {
  title: "about-me/ProfileHeader",
  component: ProfileHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    name: "Alan Maroń",
    tagline: "An IT enthusiast through and through.",
    portrait: {
      src: portrait,
      alt: "Portrait of Alan Maroń",
      width: 480,
      height: 480,
    },
    links: [
      { label: "GitHub", url: "https://github.com/Kiru2115", isPrimary: true },
      { label: "See my photos", url: "#photos" },
    ],
  },
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLinks: Story = {
  args: {
    links: [],
  },
};

export const LongName: Story = {
  args: {
    name: "Supercalifragilisticexpialidocious Supercalifragilisticexpialidocious",
  },
};
