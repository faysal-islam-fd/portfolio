import Link from "next/link";

import { CHANNELS, PROFILE } from "@/content/profile";

const SITE_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Résumé (PDF)", href: "/api/resume" },
];

export function BrandFooter() {
  return (
    <footer className="border-t border-line">
      <div className="wrap grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="display text-3xl sm:text-4xl max-w-md">
            {PROFILE.principle}
          </p>
          <p className="mt-5 text-sm text-fg-3">
            {PROFILE.name} · {PROFILE.role} · {PROFILE.location} ({PROFILE.timezone})
          </p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="kicker">Site</p>
          <ul className="mt-4 space-y-2.5">
            {SITE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[15px] text-fg-2 hover:text-fg transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="kicker">Elsewhere</p>
          <ul className="mt-4 space-y-2.5">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-[15px] text-fg-2 hover:text-fg transition-colors"
                >
                  {c.label}
                  {c.href.startsWith("http") && <span aria-hidden className="text-fg-3"> ↗</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {PROFILE.name}</p>
        <p className="font-mono">Built by hand with Next.js, Supabase and Tailwind.</p>
      </div>
    </footer>
  );
}
