import type { ReactNode } from "react";
import PageSection from "@/components/shared/PageSection/PageSection";
import type { Project } from "@/types/about-me";

interface Props {
  title: ReactNode;
  projects: Project[];
}

/** Projects as a list: an icon on the left, the name with a GitHub link, the text and the technologies. */
const ProjectList = ({ title, projects }: Props) => {
  return (
    <PageSection title={title}>
      <ul className="flex flex-col divide-y divide-white/10">
        {projects.map((project) => (
          <li
            key={project.url}
            className="flex gap-4 py-4 first:pt-0 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gi-orange/10"
            >
              <span
                data-testid="project-icon"
                className="size-5 bg-gi-orange mask-contain mask-center mask-no-repeat"
                style={{ maskImage: `url("${project.icon}")` }}
              />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-bold text-white wrap-break-word">
                  {project.name}
                </h3>
                <a
                  href={project.url}
                  aria-label={`${project.name} on GitHub`}
                  className="rounded-sm text-sm font-bold text-gi-orange underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-orange"
                >
                  GitHub <span aria-hidden="true">→</span>
                </a>
              </div>
              <p className="wrap-break-word">{project.description}</p>
              <ul
                aria-label={`Technologies used in ${project.name}`}
                className="flex flex-wrap gap-1.5"
              >
                {project.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded border border-white/15 px-2 py-0.5 font-mono text-xs text-gi-gray"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </PageSection>
  );
};

export default ProjectList;
