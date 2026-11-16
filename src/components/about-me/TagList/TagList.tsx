import type { ReactNode } from "react";
import PageSection from "@/components/shared/PageSection/PageSection";

interface Props {
  title: ReactNode;
  tags: string[];
}

/** Tags that look like lines in a terminal: "> TypeScript". */
const TagList = ({ title, tags }: Props) => {
  return (
    <PageSection title={title}>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-gi-dark-primary/60 px-2.5 py-1 font-mono text-sm"
          >
            <span aria-hidden="true" className="text-gi-orange">
              &gt;
            </span>
            <span className="wrap-break-word">{tag}</span>
          </li>
        ))}
      </ul>
    </PageSection>
  );
};

export default TagList;
