import { Button, Section } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import type { ContactLink } from "@/types/about-me";

interface Props {
  title: ReactNode;
  links: ContactLink[];
}

const ContactLinks = ({ title, links }: Props) => {
  return (
    <Section title={title}>
      <p className="mb-4 wrap-break-word">
        Want to see more of my work or get in touch? Find me here:
      </p>
      <ul className="flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.url}>
            <Button asChild>
              <a href={link.url}>{link.label}</a>
            </Button>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default ContactLinks;
