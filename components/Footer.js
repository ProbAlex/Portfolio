import Link from "next/link";

const NAV_LINKS = [
  { href: "/home", label: "Home" },
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
    <footer className="bg-dark text-white">
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <span className="text-2xl">😎</span>
              <span>Alexander Dial</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-gray-400">
              Student developer building in Java and JavaScript, open to internship and
              full-time opportunities.
            </p>
            <div className="mt-5 flex space-x-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Get In Touch
            </h3>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>
                <a href="mailto:alex.dial@outlook.com" className="transition-colors hover:text-primary">
                  alex.dial@outlook.com
                </a>
              </li>
              <li>
                <a href="tel:+13478596566" className="transition-colors hover:text-primary">
                  +1 (347) 859-6566
                </a>
              </li>
              <li className="text-gray-400">New York, NY, USA</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-gray-400 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Alexander Dial. All rights reserved.</p>
          <p>Built with Next.js, deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
