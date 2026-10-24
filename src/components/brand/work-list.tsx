import Link from "next/link";

import { Anatomy } from "@/components/brand/anatomy";
import type { CaseStudy } from "@/content/work";

/** Case studies as drawing sheets: a header strip, the brief, and the schematic. */
export function WorkList({ items }: { items: CaseStudy[] }) {
  return (
    <ol className="space-y-10">
      {items.map((c, i) => (
        <li key={c.slug}>
          <article className="border border-fg/40 bg-paper/70">
            <header className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-fg/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3 sm:px-7">
              <span className="text-signal">Sheet {String(i + 1).padStart(2, "0")}</span>
              <span className="text-fg">{c.name}</span>
              <span className="ml-auto flex gap-4">
                <span>{c.year}</span>
                <span>{c.status}</span>
              </span>
            </header>
            <div className="grid grid-cols-1 gap-10 p-5 sm:p-7 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col lg:col-span-5">
                <h3 className="display text-[clamp(1.9rem,3.2vw,2.6rem)] text-balance">
                  <Link href={`/projects/${c.slug}`} className="transition-colors hover:text-signal">
                    {c.title}
                  </Link>
                </h3>
                <p className="mt-4 leading-relaxed text-fg-2">{c.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                  {c.stack.slice(0, 6).map((s) => (
                    <li key={s} className="tag">{s}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
                  <Link href={`/projects/${c.slug}`} className="btn btn-line">
                    Read the case study <span aria-hidden>→</span>
                  </Link>
                  {c.links.slice(0, 1).map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-3 transition-colors hover:text-signal"
                    >
                      {l.label} <span aria-hidden>↗</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7">
                <Anatomy stages={c.anatomy} />
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
