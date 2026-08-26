import skillsData from "@/data/skills.json";
import SkillCard from "@/components/skills/SkillCard";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Skills | Alexander Dial",
};

export default function SkillsPage() {
  return (
    <>
      <section className="flex-grow py-12 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Skills</h2>

          <div className="space-y-12">
            {Object.entries(skillsData).map(([sectionTitle, skills]) => (
              <div key={sectionTitle} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center md:text-left">{sectionTitle}</h3>
                <div className="skills-container">
                  <div className="flex space-x-6 pb-4 px-2">
                    {skills.map((skill) => (
                      <SkillCard key={skill.box_title} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Like what you see?"
        subtext="These are the tools I reach for. If they line up with what you're building, let's talk."
      />
    </>
  );
}
