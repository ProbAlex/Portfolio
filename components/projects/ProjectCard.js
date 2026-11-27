import Image from "next/image";
import TechChips from "./TechChips";
import RepoStats from "./RepoStats";
import ReleaseDownload from "./ReleaseDownload";

export function ProjectPreview({ project, sizes }) {
  if (!project.image) return null;
  return (
    <a
      href={project.deployment_link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className="group block overflow-hidden rounded-xl border border-line bg-canvas"
    >
      <Image
        src={project.image}
        alt=""
        width={1280}
        height={800}
        sizes={sizes}
        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </a>
  );
}

export default function ProjectCard({ project, index = 0 }) {
  return (
    <article
      id={project.id}
      data-highlight
      className="card card-hover anchor-target reveal flex flex-col p-6 md:p-7"
      style={{ "--i": index }}
    >
      {project.image && (
        <div className="mb-6">
          <ProjectPreview project={project} sizes="(min-width: 768px) 520px, 100vw" />
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-ink">{project.box_title}</h3>
          {project.role && <p className="mt-1 text-sm font-medium text-accent">{project.role}</p>}
        </div>
        {project.github && <RepoStats repo={project.repo} />}
      </div>

      {project.highlight && (
        <p className="mt-4 inline-flex items-center gap-2 self-start rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent-strong">
          <i className="fas fa-chart-line" aria-hidden="true" />
          {project.highlight.value} {project.highlight.label}
        </p>
      )}

      <p className="mt-4 leading-relaxed text-body">{project.description}</p>

      <TechChips tech={project.tech} className="mt-5" />

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        {project.live && (
          <a
            href={project.deployment_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex-1"
          >
            Visit site
            <i className="fas fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
          </a>
        )}
        {project.github && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary flex-1"
          >
            <i className="fab fa-github" aria-hidden="true" />
            Repository
          </a>
        )}
        {project.github && project.releases && <ReleaseDownload repo={project.repo} />}
      </div>
    </article>
  );
}
