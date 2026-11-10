import type { Meta, StoryObj } from "@storybook/react-vite";

import TextSection from "./TextSection";

const meta = {
  title: "about-me/TextSection",
  component: TextSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "About me",
    text: "I'm Alan. I've been fascinated by technology since I was a kid.",
  },
} satisfies Meta<typeof TextSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongWord: Story = {
  args: {
    text: "Supercalifragilisticexpialidocious".repeat(3),
  },
};
