import { Badge, Section } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import type { Achievement } from "@/types/about-me";

interface Props {
  title: ReactNode;
  achievements: Achievement[];
}

const AchievementList = ({ title, achievements }: Props) => {
  return (
    <Section title={title}>
      <ul className="flex flex-col gap-3">
        {achievements.map((achievement) => (
          <li key={achievement.text} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-2 size-2 shrink-0 rounded-full bg-gi-secondary"
            />
            <span className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="wrap-break-word">{achievement.text}</span>
              {achievement.badge && (
                <Badge type="success" variant="secondary">
                  {achievement.badge}
                </Badge>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default AchievementList;
