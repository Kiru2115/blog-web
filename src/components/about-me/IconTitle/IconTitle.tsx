import type { ReactNode } from "react";

interface Props {
  icon: string;
  children: ReactNode;
}

const IconTitle = ({ icon, children }: Props) => {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        data-testid="icon-title-icon"
        className="size-7 shrink-0 bg-gi-secondary mask-contain mask-center mask-no-repeat"
        style={{ maskImage: `url("${icon}")` }}
      />
      <span className="min-w-0 wrap-break-word">{children}</span>
    </span>
  );
};

export default IconTitle;
