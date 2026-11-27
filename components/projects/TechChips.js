import Link from "next/link";
import { skillIdForTech } from "@/lib/links";

// Tech tags that link to the matching skill card when one exists.
export default function TechChips({ tech, dark = false, className = "" }) {
  if (!tech || tech.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Tech used">
      {tech.map((name) => {
        const skillId = skillIdForTech(name);
        const base = `chip ${dark ? "chip-dark" : ""}`;
        return (
          <li key={name}>
            {skillId ? (
              <Link
                href={`/skills#${skillId}`}
                className={`${base} chip-link`}
                title={`See ${name} on the skills page`}
              >
                {name}
              </Link>
            ) : (
              <span className={base}>{name}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
