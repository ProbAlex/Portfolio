import careerData from "@/data/career.json";
import Timeline from "@/components/career/Timeline";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Career | Alexander Dial",
};

export default function CareerPage() {
  return (
    <>
      <section className="flex-grow py-12 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Career Journey</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <Timeline data={careerData} />
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a job in mind?"
        subtext="I'm open to internships and full-time roles where I can keep growing as a developer. Let's connect."
      />
    </>
  );
}
