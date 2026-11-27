import Link from "next/link";
import { skillId } from "@/lib/links";

export default function SkillCard({ skill, projects, index = 0 }) {
  return (
    <article
      id={skillId(skill)}
      data-highlight
      className="card card-hover anchor-target reveal flex flex-col p-5"
      style={{ "--i": index }}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-canvas">
          {skill.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={skill.icon} alt="" className="h-6 w-6 object-contain" loading="lazy" />
          ) : (
            <i className={`${skill.faIcon} text-lg text-accent`} aria-hidden="true" />
          )}
        </span>
        <h3 className="text-lg font-semibold tracking-tight text-ink">{skill.name}</h3>
      </div>

      {skill.frameworks.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${skill.name} frameworks and tools`}>
          {skill.frameworks.map((framework) => (
            <li key={framework.name} className="chip">
              {framework.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={framework.icon} alt="" className="h-3.5 w-3.5 object-contain" loading="lazy" />
              )}
              {framework.name}
            </li>
          ))}
        </ul>
      )}

      {projects.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Used in</p>
          <ul className="mt-1.5">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects#${project.id}`}
                  className="group -mx-2 flex min-h-[44px] items-center justify-between rounded-lg px-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft hover:text-accent-strong"
                >
                  {project.box_title}
                  <i
                    className="fas fa-arrow-right text-xs text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
