import Link from "next/link";
import careerData from "@/data/career.json";
import Timeline from "@/components/career/Timeline";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Career | Alexander Dial",
  description: "Where Alexander Dial has studied and worked so far.",
};

export default function CareerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Career"
        title="Career timeline"
        lead="Where I've studied and worked so far. Each job links to the project I worked on there."
      />

      <div className="container-page grid flex-grow gap-10 py-14 md:py-20 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div className="card p-6 md:p-10">
          <Timeline data={careerData} />
        </div>

        <aside className="card reveal h-fit p-6 lg:sticky lg:top-24" style={{ "--i": 2 }}>
          <h2 className="text-lg font-semibold tracking-tight">Want the full version?</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            My résumé and CV have the details this timeline leaves out.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <a href="/Alexander_Dial_Resume_FullStack.pdf" download className="btn btn-primary">
              <i className="fas fa-file-arrow-down" aria-hidden="true" />
              Download résumé
            </a>
            <a href="/Alexander_Dial_CV.pdf" download className="btn btn-secondary">
              <i className="fas fa-file-arrow-down" aria-hidden="true" />
              Download CV
            </a>
            <Link href="/contact" className="text-link justify-center text-sm">
              Or get in touch
              <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>

      <CTASection
        heading="Have a job in mind?"
        subtext="I'm open to internships and full-time roles where I can keep growing as a developer. Let's connect."
      />
    </>
  );
}
