import homelab from "@/data/homelab.json";
import TechChips from "./TechChips";

export default function HomelabSection() {
  return (
    <article
      id={homelab.id}
      data-highlight
      className="card anchor-target reveal grid overflow-hidden md:grid-cols-[1fr_1.5fr]"
    >
      <div className="flex flex-col bg-night p-6 text-white md:p-8">
        <h3 className="text-2xl font-semibold tracking-tight">{homelab.title}</h3>
        <p className="mt-3 leading-relaxed text-zinc-400">{homelab.tagline}</p>
        <TechChips tech={homelab.tech} dark className="mt-5" />
        <div className="mt-8 md:mt-auto md:pt-8">
          <a
            href={homelab.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full sm:w-auto"
          >
            Visit leafyserver.tech
            <i className="fas fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
          </a>
        </div>
      </div>

      <ul className="grid gap-px bg-line sm:grid-cols-2">
        {homelab.highlights.map((item) => (
          <li key={item.title} className="flex gap-4 bg-surface p-5 sm:last:odd:col-span-2 md:p-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <i className={`fas ${item.icon}`} aria-hidden="true" />
            </span>
            <div>
              <h4 className="font-semibold text-ink">{item.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-body">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
