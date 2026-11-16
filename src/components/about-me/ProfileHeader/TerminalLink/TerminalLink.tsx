import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

/** A link that looks like a command typed into a console: a prompt, the text and a blinking cursor. */
const TerminalLink = ({ href, children }: Props) => {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-md border border-gi-orange/50 bg-gi-dark-primary px-4 py-2.5 font-mono text-sm text-white transition-colors hover:border-gi-orange hover:bg-gi-orange/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-orange"
    >
      <span aria-hidden="true" className="text-gi-orange">
        ~$
      </span>
      <span className="wrap-break-word">{children}</span>
      <span
        aria-hidden="true"
        data-testid="terminal-cursor"
        className="h-4 w-2 shrink-0 animate-[blink_1s_step-end_infinite] bg-gi-orange motion-reduce:animate-none"
      />
    </a>
  );
};

export default TerminalLink;
