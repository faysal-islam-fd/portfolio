import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getContactLinks } from "@/lib/queries";
import { ContactIcon } from "@/components/site/contact-icon";

const COLUMNS = [
  {
    label: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Resume", href: "/api/resume" },
    ],
  },
];

export async function SiteFooter() {
  const links = await getContactLinks();

  return (
    <footer className="relative border-t border-white/[0.06] mt-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
      <div className="container-prose py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-accent-blue to-accent-indigo shadow-glow-sm">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.4} />
              </span>
              <span className="font-semibold tracking-tight text-zinc-100">
                AI<span className="text-accent-blue">/</span>Architect
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-zinc-400">
              Building autonomous AI agents, multi-agent systems, advanced RAG pipelines,
              and custom computer vision models that automate workflows and drive business value.
            </p>
            {links.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {links.map((l) => (
                  <a
                    key={l.id}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={l.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 transition-all hover:bg-white/[0.06] hover:text-white hover:border-accent-blue/30 hover:shadow-glow-sm"
                  >
                    <ContactIcon name={l.icon} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {COLUMNS.map((col) => (
            <div key={col.label} className="md:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {col.label}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1" />
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-zinc-500 font-mono">
            © {new Date().getFullYear()} — All rights reserved.
          </p>
          <p className="text-xs text-zinc-500 font-mono">
            Crafted with Next.js · Supabase · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
