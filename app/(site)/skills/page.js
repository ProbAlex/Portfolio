import { projectsForSkill, skillSections } from "@/lib/links";
import SkillCard from "@/components/skills/SkillCard";
import PageHeader, { JumpLinks } from "@/components/PageHeader";
import HashHighlighter from "@/components/HashHighlighter";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Skills | Alexander Dial",
  description: "Languages, frameworks and tools Alexander Dial works with, linked to the projects that use them.",
};

export default function SkillsPage() {
  return (
    <>
      <HashHighlighter />
      <PageHeader
        eyebrow="Skills"
        title="What I work with"
        lead="The languages, frameworks and tools I use. Where a skill shows up in my work, the card links to those projects."
      >
        <JumpLinks label="Skill sections" links={skillSections} />
      </PageHeader>

      <div className="container-page flex-grow space-y-16 py-14 md:space-y-20 md:py-20">
        {skillSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="anchor-target grid gap-6 md:grid-cols-[200px_1fr] md:gap-10"
            aria-labelledby={`${section.id}-title`}
          >
            <div className="border-b border-line pb-4 md:sticky md:top-24 md:self-start md:border-b-0 md:pb-0">
              <h2 id={`${section.id}-title`} className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="mt-1 font-mono text-sm text-muted">
                {section.skills.length} {section.skills.length === 1 ? "skill" : "skills"}
              </p>
            </div>
            <div className="grid items-start gap-4 sm:grid-cols-2">
              {section.skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  projects={projectsForSkill(skill)}
                  index={index}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <CTASection
        heading="Like what you see?"
        subtext="These are the tools I use most. If they match your stack, let's talk."
        secondaryHref="/projects"
        secondaryLabel="See my projects"
      />
    </>
  );
}
