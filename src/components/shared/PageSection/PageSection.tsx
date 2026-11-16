import { type HTMLAttributes, type ReactNode, useId } from "react";

interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  children: ReactNode;
}

/**
 * A section of a page: a dark card with a heading.
 * The heading names the section, so screen readers list it as a region.
 */
const PageSection = ({ title, children, ...props }: Props) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col gap-4 rounded-xl border border-white/10 bg-gi-primary/30 p-5 sm:p-6"
      {...props}
    >
      <h2
        id={titleId}
        className="border-b border-white/10 pb-3 text-xl font-bold text-white"
      >
        {title}
      </h2>
      <div className="text-gi-ash">{children}</div>
    </section>
  );
};

export default PageSection;
