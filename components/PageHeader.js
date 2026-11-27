export default function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-page py-12 md:py-20">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1
          className="reveal mt-3 max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink"
          style={{ "--i": 1 }}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="reveal mt-5 max-w-[60ch] text-lg leading-relaxed text-body"
            style={{ "--i": 2 }}
          >
            {lead}
          </p>
        )}
        {children && (
          <div className="reveal" style={{ "--i": 3 }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export function JumpLinks({ label, links }) {
  return (
    <nav aria-label={label} className="mt-8 flex flex-wrap gap-2">
      {links.map((link) => (
        <a key={link.id} href={`#${link.id}`} className="chip chip-link">
          {link.title}
        </a>
      ))}
    </nav>
  );
}
