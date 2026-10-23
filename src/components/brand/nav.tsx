"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export function BrandNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur-sm supports-[backdrop-filter]:bg-paper/75">
      <nav className="wrap flex h-16 items-center justify-between gap-6" aria-label="Main">
        <Link href="/" className="group flex items-baseline gap-2.5" aria-label="Faysal Islam Fahad — home">
          <span className="font-serif text-[22px] leading-none text-fg">Faysal Islam Fahad</span>
          <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3 group-hover:text-signal transition-colors">
            AI engineer
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3 py-2 text-[15px] transition-colors",
                  active ? "text-fg" : "text-fg-3 hover:text-fg"
                )}
              >
                {l.label}
                {active && <span aria-hidden className="ml-1 text-signal">•</span>}
              </Link>
            );
          })}
          <Link href="/contact" className="btn btn-solid ml-3 h-10 px-4 text-sm">
            Start a project
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden font-mono text-xs uppercase tracking-[0.14em] text-fg px-2 py-2"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-line bg-paper">
          <ul className="wrap py-3">
            {[...LINKS, { label: "Contact", href: "/contact" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex items-center justify-between border-b border-line/60 py-4 font-serif text-3xl text-fg"
                >
                  {l.label}
                  <span aria-hidden className="text-fg-3 text-xl">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
