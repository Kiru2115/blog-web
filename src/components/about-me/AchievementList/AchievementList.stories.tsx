import type { Meta, StoryObj } from "@storybook/react-vite";

import AchievementList from "./AchievementList";

const meta = {
  title: "about-me/AchievementList",
  component: AchievementList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    title: "Achievements",
    achievements: [
      {
        text: "CyberSkiller, a nationwide competition held at Kozminski University",
        badge: "Finalist",
      },
      { text: "Participant in the TeleInfoCup olympiad" },
      { text: "Took part in a hackathon in Opole (2025)" },
    ],
  },
} satisfies Meta<typeof AchievementList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutBadges: Story = {
  args: {
    achievements: [
      { text: "Participant in the TeleInfoCup olympiad" },
      { text: "Took part in a hackathon in Opole (2025)" },
    ],
  },
};

export const LongWord: Story = {
  args: {
    achievements: [
      {
        text: "Supercalifragilisticexpialidocious".repeat(3),
        badge: "Finalist",
      },
    ],
  },
};
