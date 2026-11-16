import type { HeroLink, Photo } from "@/types/about-me";
import ShutterLink from "./ShutterLink/ShutterLink";
import TerminalLink from "./TerminalLink/TerminalLink";

interface Props {
  name: string;
  tagline: string;
  portrait: Photo;
  links: HeroLink[];
}

const ProfileHeader = ({ name, tagline, portrait, links }: Props) => {
  return (
    <header className="flex flex-col items-center gap-6 rounded-xl border border-white/10 bg-gi-primary/30 px-6 py-8 text-center sm:flex-row sm:gap-8 sm:px-8 sm:text-left">
      <img
        src={portrait.src}
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
        className="size-32 shrink-0 rounded-full object-cover ring-2 ring-gi-orange sm:size-40"
      />
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <h1 className="text-4xl font-extrabold text-white wrap-break-word sm:text-5xl">
            {name}
          </h1>
          <p className="mt-2 text-lg text-gi-gray wrap-break-word">{tagline}</p>
        </div>
        {links.length > 0 && (
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            {links.map((link) => (
              <li key={link.url}>
                {link.variant === "terminal" ? (
                  <TerminalLink href={link.url}>{link.label}</TerminalLink>
                ) : (
                  <ShutterLink href={link.url}>{link.label}</ShutterLink>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default ProfileHeader;
