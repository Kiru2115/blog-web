import { Badge, Button, Section } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import type { Project } from "@/types/about-me";

interface Props {
  title: ReactNode;
  projects: Project[];
}

const ProjectList = ({ title, projects }: Props) => {
  return (
    <Section title={title}>
      <ul className="flex flex-col divide-y divide-gi-ash">
        {projects.map((project) => (
          <li
            key={project.url}
            className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0"
          >
            <h3 className="text-xl font-bold text-gi-primary wrap-break-word">
              {project.name}
            </h3>
            <p className="wrap-break-word">{project.description}</p>
            <ul
              aria-label={`Technologies used in ${project.name}`}
              className="flex flex-wrap gap-2"
            >
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Badge variant="outlined">{technology}</Badge>
                </li>
              ))}
            </ul>
            <div>
              <Button asChild type="outlined" size="small">
                <a href={project.url}>{project.name} on GitHub</a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default ProjectList;
