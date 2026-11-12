import { Badge, Section } from "@gi-org-pl/athena";
import type { ReactNode } from "react";

interface Props {
  title: ReactNode;
  tags: string[];
  variant?: "primary" | "secondary" | "outlined";
}

const TagList = ({ title, tags, variant = "secondary" }: Props) => {
  return (
    <Section title={title}>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge size="big" variant={variant}>
              {tag}
            </Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default TagList;
