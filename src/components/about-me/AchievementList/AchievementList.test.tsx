import { render, screen, within } from "@testing-library/react";
import type { Achievement } from "@/types/about-me";
import AchievementList from "./AchievementList";

const ACHIEVEMENTS: Achievement[] = [
  { text: "CyberSkiller", badge: "Finalist" },
  { text: "Took part in a hackathon" },
];

describe("<AchievementList />", () => {
  describe("when it is rendered with a title and achievements", () => {
    it("shows the title as a section heading", () => {
      render(
        <AchievementList title="Achievements" achievements={ACHIEVEMENTS} />,
      );

      expect(
        screen.getByRole("heading", { level: 2, name: "Achievements" }),
      ).toBeInTheDocument();
    });

    it("shows every achievement as a list item, in order", () => {
      render(
        <AchievementList title="Achievements" achievements={ACHIEVEMENTS} />,
      );

      const items = within(screen.getByRole("list")).getAllByRole("listitem");

      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("CyberSkiller");
      expect(items[1]).toHaveTextContent("Took part in a hackathon");
    });
  });

  describe("when an achievement has a badge", () => {
    it("shows the badge next to it", () => {
      render(
        <AchievementList title="Achievements" achievements={ACHIEVEMENTS} />,
      );

      const items = screen.getAllByRole("listitem");

      expect(within(items[0]).getByText("Finalist")).toBeInTheDocument();
    });
  });

  describe("when an achievement has no badge", () => {
    it("shows only its text", () => {
      render(
        <AchievementList title="Achievements" achievements={ACHIEVEMENTS} />,
      );

      expect(screen.getAllByRole("listitem")[1]).toHaveTextContent(
        /^Took part in a hackathon$/,
      );
    });
  });

  describe("when an achievement contains a very long word", () => {
    it("lets the text wrap onto the next line", () => {
      const longWord = "Supercalifragilisticexpialidocious".repeat(3);

      render(
        <AchievementList
          title="Achievements"
          achievements={[{ text: longWord }]}
        />,
      );

      expect(screen.getByText(longWord)).toHaveClass("wrap-break-word");
    });
  });
});
