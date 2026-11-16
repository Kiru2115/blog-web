import type { ReactNode } from "react";
import PageSection from "@/components/shared/PageSection/PageSection";
import type { Interest } from "@/types/about-me";

interface Props {
  title: ReactNode;
  interests: Interest[];
}

/** Interests as tiles, each with its own icon. */
const InterestGrid = ({ title, interests }: Props) => {
  return (
    <PageSection title={title}>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {interests.map((interest) => (
          <li
            key={interest.label}
            className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-3"
          >
            <span
              aria-hidden="true"
              data-testid="interest-icon"
              className="size-6 bg-gi-orange mask-contain mask-center mask-no-repeat"
              style={{ maskImage: `url("${interest.icon}")` }}
            />
            <span className="wrap-break-word">{interest.label}</span>
          </li>
        ))}
      </ul>
    </PageSection>
  );
};

export default InterestGrid;
