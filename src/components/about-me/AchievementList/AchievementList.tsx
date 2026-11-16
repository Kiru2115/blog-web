import { Badge } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import PageSection from "@/components/shared/PageSection/PageSection";
import type { Achievement } from "@/types/about-me";

interface Props {
  title: ReactNode;
  achievements: Achievement[];
}

const AchievementList = ({ title, achievements }: Props) => {
  return (
    <PageSection title={title}>
      <ul className="flex flex-col gap-3">
        {achievements.map((achievement) => (
          <li key={achievement.text} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-2 size-2 shrink-0 rounded-full bg-gi-orange"
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
    </PageSection>
  );
};

export default AchievementList;
