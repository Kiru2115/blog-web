import type { Meta, StoryObj } from "@storybook/react-vite";

import cameraIcon from "@/assets/icons/camera.svg";
import heartIcon from "@/assets/icons/heart.svg";
import IconTitle from "./IconTitle";

const meta = {
  title: "about-me/IconTitle",
  component: IconTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    icon: heartIcon,
    children: "Interests",
  },
} satisfies Meta<typeof IconTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OtherIcon: Story = {
  args: {
    icon: cameraIcon,
    children: "My photography",
  },
};

export const LongText: Story = {
  args: {
    children: "Supercalifragilisticexpialidocious".repeat(2),
  },
};
