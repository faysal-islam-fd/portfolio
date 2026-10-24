import Link from "next/link";

import { CHANNELS, PROFILE } from "@/content/profile";

const SITE_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Résumé (PDF)", href: "/api/resume" },
];

/** Footer laid out as a drawing's title block. */
export function BrandFooter() {
  const year = new Date().getFullYear();
  const meta: { label: string; value: string }[] = [
    { label: "Drawn by", value: PROFILE.name },
    { label: "Location", value: PROFILE.location },
    { label: "Timezone", value: PROFILE.timezone },
    { label: "Rev.", value: String(year) },
  ];

  return (
    <footer className="border-t border-line">
      <div className="wrap py-14">
        <div className="grid grid-cols-1 gap-px border border-fg/50 bg-fg/50 md:grid-cols-12">
          <div className="bg-paper p-6 sm:p-8 md:col-span-6">
            <p className="kicker">Principle</p>
            <p className="display mt-3 max-w-md text-4xl sm:text-5xl">
              {PROFILE.principle}
            </p>
          </div>

          <nav className="bg-paper p-6 sm:p-8 md:col-span-3" aria-label="Footer">
            <p className="kicker">Index</p>
            <ul className="mt-4 space-y-2">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-fg-2 transition-colors hover:text-signal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bg-paper p-6 sm:p-8 md:col-span-3">
            <p className="kicker">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[15px] text-fg-2 transition-colors hover:text-signal"
                  >
                    {c.label}
                    {c.href.startsWith("http") && <span aria-hidden className="text-fg-3"> ↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {meta.map((m) => (
            <div key={m.label} className="bg-paper px-6 py-4 sm:px-8 md:col-span-2">
              <p className="kicker">{m.label}</p>
              <p className="mt-1 font-cond text-lg font-semibold uppercase tracking-wide text-fg">{m.value}</p>
            </div>
          ))}
          <div className="flex flex-col justify-center bg-paper px-6 py-4 sm:px-8 md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
              © {year} {PROFILE.name}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
              Built by hand · Next.js · Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
