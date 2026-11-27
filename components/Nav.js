"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/home", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/career", label: "Career" },
  { href: "/projects", label: "Projects" },
];

const RESUME_HREF = "/Alexander_Dial_Resume_FullStack.pdf";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <Link
          href="/home"
          className="flex min-h-[44px] items-center gap-2.5 font-semibold tracking-tight text-ink"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-mono text-[0.7rem] font-bold text-white">
            AD
          </span>
          <span>Alexander Dial</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-zinc-100 text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a href={RESUME_HREF} download className="btn btn-secondary ml-3 text-sm">
            Résumé
          </a>
          <Link href="/contact" className="btn btn-primary text-sm">
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <i className={`fas ${open ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas md:hidden">
          <ul className="container-page flex flex-col py-2">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[48px] items-center justify-between rounded-lg px-3 text-base font-medium ${
                      active ? "bg-zinc-100 text-ink" : "text-body"
                    }`}
                  >
                    {link.label}
                    <i className="fas fa-arrow-right text-xs text-muted" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="container-page grid grid-cols-2 gap-3 pb-4">
            <a href={RESUME_HREF} download className="btn btn-secondary">
              Résumé
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
