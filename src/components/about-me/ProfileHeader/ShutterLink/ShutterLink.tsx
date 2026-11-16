import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

/** A link that looks like a camera shutter button: pressing it squeezes the shutter and flashes. */
const ShutterLink = ({ href, children }: Props) => {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 py-1.5 pr-5 pl-1.5 font-bold text-white transition-colors after:pointer-events-none after:absolute after:inset-0 after:bg-white after:opacity-0 after:transition-opacity after:duration-700 hover:border-gi-orange/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-orange active:after:opacity-80 active:after:duration-0 motion-reduce:after:hidden"
    >
      <span
        aria-hidden="true"
        data-testid="shutter"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-white"
      >
        <span className="size-6 rounded-full bg-white transition-transform duration-150 group-hover:scale-90 group-active:scale-75 motion-reduce:transition-none" />
      </span>
      <span className="wrap-break-word">{children}</span>
    </a>
  );
};

export default ShutterLink;
