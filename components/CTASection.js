import Link from "next/link";

export default function CTASection({
  heading = "Have a job in mind?",
  subtext = "I'm open to internships and full-time roles. Tell me what you're working on.",
  ctaLabel = "Get in touch",
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <section className="bg-night text-white">
      <div className="container-page grid gap-8 py-16 md:grid-cols-[1.3fr_1fr] md:items-center md:py-20">
        <div>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            {heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-zinc-400">{subtext}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <Link href="/contact" className="btn btn-primary">
            {ctaLabel}
            <i className="fas fa-arrow-right text-sm" aria-hidden="true" />
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link href={secondaryHref} className="btn btn-ghost-dark">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
