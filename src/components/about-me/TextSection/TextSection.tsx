import { Section } from "@gi-org-pl/athena";
import type { ReactNode } from "react";

interface Props {
  title: ReactNode;
  text: string;
}

const TextSection = ({ title, text }: Props) => {
  return (
    <Section title={title}>
      <p className="text-lg leading-relaxed wrap-break-word">{text}</p>
    </Section>
  );
};

export default TextSection;
