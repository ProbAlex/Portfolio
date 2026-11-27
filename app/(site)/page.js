import Image from "next/image";
import Link from "next/link";
import WallHole from "@/components/WallHole";
import CTASection from "@/components/CTASection";
import IntroOverlay from "@/components/IntroOverlay";
import TechChips from "@/components/projects/TechChips";
import { ProjectPreview } from "@/components/projects/ProjectCard";
import { getProject } from "@/lib/links";

const FACTS = [
  {
    value: "$1,000+",
    label: "First-season revenue for TireDash Mobile, a site I built on my own",
  },
  {
    value: "8Forge Studios",
    label: "Junior React developer on the team that maintains stfrd.com",
  },
  {
    value: "leafyserver",
    label: "My self-hosted homelab: media, game servers, office tools and a VPN",
  },
  {
    value: "NYIT",
    label: "Student at New York Institute of Technology since 2025",
  },
];

const FEATURED_IDS = ["tiredash-mobile", "noisitron", "yappitron"];

function FeaturedCard({ project, large = false, index }) {
  return (
    <article
      className={`card card-hover reveal flex flex-col p-6 md:p-8 ${large ? "lg:row-span-2" : ""}`}
      style={{ "--i": index }}
    >
      {project.role && (
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-accent">{project.role}</p>
      )}
      <h3
        className={`font-semibold tracking-tight text-ink ${
          large ? "mt-2 text-3xl md:text-4xl" : "text-xl"
        }`}
      >
        {project.box_title}
      </h3>

      {large && project.highlight && (
        <p className="mt-4 inline-flex items-center gap-2 self-start rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent-strong">
          <i className="fas fa-chart-line" aria-hidden="true" />
          {project.highlight.value} {project.highlight.label}
        </p>
      )}

      {large && project.image && (
        <div className="mt-6">
          <ProjectPreview project={project} sizes="(min-width: 1024px) 560px, 100vw" />
        </div>
      )}

      <p className={`leading-relaxed text-body ${large ? "mt-6 text-lg" : "mt-3"}`}>
        {project.description}
      </p>

      <TechChips tech={project.tech} className="mt-5" />

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
        <Link href={`/projects#${project.id}`} className="text-link">
          Project details
          <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
        </Link>
        {large && project.live && (
          <a
            href={project.deployment_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            {project.deployment_link.replace("https://", "")}
            <i className="fas fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function HomePage() {
  const [lead, ...rest] = FEATURED_IDS.map(getProject);

  return (
    <>
      <IntroOverlay />

      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <div className="container-page grid items-center gap-10 py-10 md:grid-cols-[1.35fr_1fr] md:py-20 lg:gap-16">
          <div>
            <p className="reveal inline-flex items-center gap-2.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-sm font-medium text-body">
              <span className="status-dot" aria-hidden="true" />
              Open to internships and full-time roles
            </p>
            <h1
              className="reveal mt-6 text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-ink"
              style={{ "--i": 1 }}
            >
              Alexander Dial
            </h1>
            <p
              className="reveal mt-6 max-w-[34rem] text-lg leading-relaxed text-body md:text-xl"
              style={{ "--i": 2 }}
            >
              I&apos;m a student developer at New York Tech. I build websites for clients, apps
              I want to use myself, and the homelab that runs my media and game servers.
            </p>
            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--i": 3 }}>
              <Link href="/contact" className="btn btn-primary">
                Get in touch
                <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                See my projects
              </Link>
            </div>
            <div
              className="reveal mt-4 flex flex-wrap items-center gap-x-6 text-sm text-muted"
              style={{ "--i": 4 }}
            >
              <a
                href="/Alexander_Dial_Resume_FullStack.pdf"
                download
                className="inline-flex min-h-[44px] items-center gap-2 font-medium transition-colors hover:text-ink"
              >
                <i className="fas fa-file-arrow-down" aria-hidden="true" />
                Résumé (PDF)
              </a>
              <a
                href="/Alexander_Dial_CV.pdf"
                download
                className="inline-flex min-h-[44px] items-center gap-2 font-medium transition-colors hover:text-ink"
              >
                <i className="fas fa-file-arrow-down" aria-hidden="true" />
                CV (PDF)
              </a>
              <span className="inline-flex min-h-[44px] items-center gap-2">
                <i className="fas fa-location-dot" aria-hidden="true" />
                New York, NY
              </span>
            </div>
          </div>

          <div className="reveal flex justify-center md:justify-end" style={{ "--i": 2 }}>
            <div className="aspect-square w-full max-w-[20rem] overflow-hidden rounded-[2rem] border border-line bg-canvas shadow-[0_24px_48px_-24px_rgba(24,24,27,0.25)] md:max-w-[24rem]">
              <Image
                src="/headshot.jpg"
                alt="Alexander Dial"
                width={1024}
                height={1027}
                sizes="(min-width: 768px) 384px, 320px"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section aria-label="At a glance" className="container-page py-10 md:py-14">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, index) => (
            <div key={fact.value} className="reveal flex flex-col bg-surface p-5 md:p-6" style={{ "--i": index }}>
              <dt className="order-2 mt-2 text-sm leading-relaxed text-body">{fact.label}</dt>
              <dd className="order-1 text-2xl font-semibold tracking-tight text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Selected work */}
      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
                Client work and my own apps
              </h2>
            </div>
            <Link href="/projects" className="text-link">
              All projects
              <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <FeaturedCard project={lead} large index={0} />
            {rest.map((project, index) => (
              <FeaturedCard key={project.id} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-line bg-surface py-16 md:py-24">
        <div className="container-page grid items-center gap-12 md:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="order-2 flex justify-center py-4 md:order-1">
            <WallHole src="/dog.jpg" alt="A dog breaking through the wall" />
          </div>
          <div className="order-1 md:order-2">
            <p className="eyebrow">About</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
              Plan first, then build
            </h2>
            <div className="mt-6 max-w-[60ch] space-y-4 text-lg leading-relaxed text-body">
              <p>
                I study at New York Institute of Technology and do most of my work in Java and
                JavaScript. Before I write any code, I map out how it should work. I&apos;d
                rather spend extra time on the design than untangle a mess later.
              </p>
              <p>
                Outside class I build open-source automation tools and apps that make my own
                life easier. I&apos;m looking for an internship or full-time role where I can
                keep improving and work on real production software.
              </p>
            </div>
            <Link href="/career" className="text-link mt-6">
              See my career timeline
              <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a job in mind?"
        subtext="I'm open to internships and full-time roles. Tell me what you're building and where I could help."
        secondaryHref="/projects"
        secondaryLabel="See my projects"
      />
    </>
  );
}
