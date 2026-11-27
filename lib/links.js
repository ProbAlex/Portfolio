import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import homelab from "@/data/homelab.json";

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const projectSections = Object.entries(projectsData).map(([title, projects]) => ({
  title,
  id: slugify(title),
  projects,
}));

export const skillSections = Object.entries(skillsData).map(([title, skills]) => ({
  title,
  id: slugify(title),
  skills,
}));

// Every card a skill can point at: the project cards plus the homelab panel.
const linkableProjects = [
  ...projectSections.flatMap((section) => section.projects),
  { id: homelab.id, box_title: homelab.title, tech: homelab.tech },
];

const allSkills = skillSections.flatMap((section) => section.skills);

export function getProject(id) {
  return linkableProjects.find((project) => project.id === id);
}

export function skillId(skill) {
  return slugify(skill.name);
}

// Each framework lives under exactly one skill, so a tech name maps to one anchor.
export function skillIdForTech(tech) {
  const skill = allSkills.find(
    (s) => s.name === tech || s.frameworks.some((framework) => framework.name === tech)
  );
  return skill ? skillId(skill) : null;
}

export function projectsForSkill(skill) {
  const names = new Set([skill.name, ...skill.frameworks.map((framework) => framework.name)]);
  return linkableProjects.filter((project) => project.tech?.some((tech) => names.has(tech)));
}
