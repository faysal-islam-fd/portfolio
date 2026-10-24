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
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm supports-[backdrop-filter]:bg-paper/80">
      <nav className="wrap flex h-16 items-center justify-between gap-6" aria-label="Main">
        <Link href="/" className="group flex items-center gap-3" aria-label="Faysal Islam Fahad — home">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center border border-fg font-cond text-[15px] font-bold tracking-wide text-fg transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-paper"
          >
            FIF
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-cond text-[19px] font-semibold uppercase tracking-[0.04em] text-fg">
              Faysal Islam Fahad
            </span>
            <span className="mt-1 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-fg-3 sm:block">
              Full-stack AI engineer
            </span>
          </span>
        </Link>

        <div className="hidden items-center md:flex">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors",
                  active ? "text-signal" : "text-fg-2 hover:text-fg"
                )}
              >
                <span aria-hidden className={active ? "" : "opacity-0"}>[</span>
                {l.label}
                <span aria-hidden className={active ? "" : "opacity-0"}>]</span>
              </Link>
            );
          })}
          <Link href="/contact" className="btn btn-solid ml-4 h-10 px-4">
            Start a project
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="border border-fg/40 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
          <ul className="wrap py-3">
            {[...LINKS, { label: "Contact", href: "/contact" }].map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex items-baseline gap-4 border-b border-line py-4 font-cond text-4xl font-semibold uppercase text-fg"
                >
                  <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
