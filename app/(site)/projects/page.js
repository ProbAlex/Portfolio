import { projectSections } from "@/lib/links";
import ProjectCard from "@/components/projects/ProjectCard";
import HomelabSection from "@/components/projects/HomelabSection";
import PageHeader, { JumpLinks } from "@/components/PageHeader";
import HashHighlighter from "@/components/HashHighlighter";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Projects | Alexander Dial",
  description: "Client websites, apps and the homelab Alexander Dial has built and worked on.",
};

function SectionHeading({ id, title, count }) {
  return (
    <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-4">
      <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      {count !== undefined && (
        <span className="font-mono text-sm text-muted">
          {count} {count === 1 ? "project" : "projects"}
        </span>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const jumpLinks = [
    ...projectSections.map(({ id, title }) => ({ id, title })),
    { id: "homelab", title: "Homelab" },
  ];

  return (
    <>
      <HashHighlighter />
      <PageHeader
        eyebrow="Projects"
        title="What I've built"
        lead="Client work, my own apps and websites, and the homelab I run. Select a tech tag to see that skill."
      >
        <JumpLinks label="Project sections" links={jumpLinks} />
      </PageHeader>

      <div className="container-page flex-grow space-y-16 py-14 md:space-y-24 md:py-20">
        {projectSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="anchor-target"
            aria-labelledby={`${section.id}-title`}
          >
            <SectionHeading id={section.id} title={section.title} count={section.projects.length} />
            <div className="grid gap-6 md:grid-cols-2">
              {section.projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>
        ))}

        <section id="homelab" className="anchor-target" aria-labelledby="homelab-title">
          <SectionHeading id="homelab" title="Homelab" />
          <HomelabSection />
        </section>
      </div>

      <CTASection
        heading="Interested in working together?"
        subtext="Tell me what you're building and how I could help."
      />
    </>
  );
}
