import { Button } from "@gi-org-pl/athena";
import type { HeroLink, Photo } from "@/types/about-me";

interface Props {
  name: string;
  tagline: string;
  portrait: Photo;
  links: HeroLink[];
}

const ProfileHeader = ({ name, tagline, portrait, links }: Props) => {
  return (
    <header className="flex flex-col items-center gap-6 rounded-4xl bg-linear-to-br from-gi-blue-lightest via-background to-gi-ash px-6 py-10 text-center sm:flex-row sm:gap-8 sm:px-10 sm:text-left">
      <img
        src={portrait.src}
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
        className="size-32 shrink-0 rounded-full object-cover shadow-lg ring-4 ring-background sm:size-40"
      />
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <h1 className="text-4xl font-extrabold text-gi-primary wrap-break-word sm:text-5xl">
            {name}
          </h1>
          <p className="mt-2 text-lg text-gi-dark-gray wrap-break-word">
            {tagline}
          </p>
        </div>
        {links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-3 sm:justify-start">
            {links.map((link) => (
              <li key={link.url}>
                <Button asChild type={link.isPrimary ? "primary" : "outlined"}>
                  <a href={link.url}>{link.label}</a>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default ProfileHeader;
