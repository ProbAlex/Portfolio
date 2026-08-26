import projectsData from "@/data/projects.json";
import ProjectCard from "@/components/projects/ProjectCard";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Projects | Alexander Dial",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="flex-grow py-12 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Projects</h2>

          <div className="space-y-12">
            {Object.entries(projectsData).map(([sectionTitle, projects]) => (
              <div key={sectionTitle} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center md:text-left">{sectionTitle}</h3>
                <div className="projects-container">
                  <div className="flex space-x-6 pb-4 px-2">
                    {projects.map((project) => (
                      <ProjectCard key={project.box_title} project={project} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Interested in working together?"
        subtext="I'd love to hear about what you're building and how I could help."
      />
    </>
  );
}
