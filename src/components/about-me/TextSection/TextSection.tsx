import type { ReactNode } from "react";
import PageSection from "@/components/shared/PageSection/PageSection";

interface Props {
  title: ReactNode;
  text: string;
}

const TextSection = ({ title, text }: Props) => {
  return (
    <PageSection title={title}>
      <p className="text-lg leading-relaxed wrap-break-word">{text}</p>
    </PageSection>
  );
};

export default TextSection;
