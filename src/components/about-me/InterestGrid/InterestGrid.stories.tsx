import type { Meta, StoryObj } from "@storybook/react-vite";
import { INTERESTS } from "@/constants/about-me";
import InterestGrid from "./InterestGrid";

const meta = {
  title: "about-me/InterestGrid",
  component: InterestGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Interests",
    interests: INTERESTS,
  },
} satisfies Meta<typeof InterestGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FewInterests: Story = {
  args: {
    interests: INTERESTS.slice(0, 2),
  },
};

export const LongLabel: Story = {
  args: {
    interests: [
      { ...INTERESTS[0], label: "Computer science and everything around it" },
      ...INTERESTS.slice(1, 3),
    ],
  },
};
