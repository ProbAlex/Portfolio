import Link from "next/link";

export default function CTASection({
  heading = "Have a job in mind?",
  subtext = "I'm open to internships and full-time roles, and would love to hear about what you're working on.",
  ctaLabel = "Get In Touch",
}) {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-accent to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-white/90">{subtext}</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          {ctaLabel}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
