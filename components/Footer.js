import Link from "next/link";
import LogoMark from "@/components/Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/career", label: "Career" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/in/1AlexanderDial", label: "LinkedIn", icon: "fa-brands fa-linkedin-in" },
  { href: "https://github.com/ProbAlex", label: "GitHub", icon: "fa-brands fa-github" },
  { href: "mailto:alex.dial@outlook.com", label: "Email", icon: "fa-solid fa-envelope" },
];

export default function Footer() {
  return (
    <footer className="bg-night text-zinc-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-semibold tracking-tight text-white">
            <LogoMark inverted className="h-8 w-8" />
            <span>Alexander Dial</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            Student developer at New York Tech, open to internships and full-time roles.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map((social) => {
              const external = social.href.startsWith("http");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  <i className={social.icon} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-zinc-500">Navigate</h2>
          <ul className="mt-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[36px] items-center transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-zinc-500">Get in touch</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a
                href="mailto:alex.dial@outlook.com"
                className="inline-flex min-h-[36px] items-center break-all transition-colors hover:text-white"
              >
                alex.dial@outlook.com
              </a>
            </li>
            <li>
              <a
                href="tel:+13478596566"
                className="inline-flex min-h-[36px] items-center transition-colors hover:text-white"
              >
                +1 (347) 859-6566
              </a>
            </li>
            <li className="inline-flex min-h-[36px] items-center text-zinc-500">New York, NY, USA</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-zinc-500 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Alexander Dial</p>
          <p>Built with Next.js and deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
