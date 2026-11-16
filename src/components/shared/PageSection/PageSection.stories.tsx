import type { Meta, StoryObj } from "@storybook/react-vite";
import PageSection from "./PageSection";

const meta = {
  title: "shared/PageSection",
  component: PageSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "About me",
    children: "I'm Alan. I've been fascinated by technology since I was a kid.",
  },
} satisfies Meta<typeof PageSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title: "A very long section title that has to wrap on a narrow screen",
  },
};
