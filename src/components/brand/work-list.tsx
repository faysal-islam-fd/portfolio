import Link from "next/link";

import { Anatomy } from "@/components/brand/anatomy";
import type { CaseStudy } from "@/content/work";

/** Editorial list of case studies: one full-width row per project. */
export function WorkList({ items }: { items: CaseStudy[] }) {
  return (
    <ol className="border-t border-line">
      {items.map((c, i) => (
        <li key={c.slug} className="border-b border-line">
          <article className="grid grid-cols-1 gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 kicker">
                <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span>{c.name}</span>
                <span aria-hidden>·</span>
                <span>{c.year}</span>
                <span aria-hidden>·</span>
                <span>{c.status}</span>
              </div>
              <h3 className="display mt-4 text-[clamp(1.85rem,3.4vw,2.75rem)] text-balance">
                <Link href={`/projects/${c.slug}`} className="hover:text-signal transition-colors">
                  {c.title}
                </Link>
              </h3>
              <p className="mt-4 text-fg-2 leading-relaxed">{c.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                {c.stack.slice(0, 6).map((s) => (
                  <li key={s} className="tag">{s}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
                <Link href={`/projects/${c.slug}`} className="font-medium text-fg ulink">
                  Read the case study <span aria-hidden>→</span>
                </Link>
                {c.links.slice(0, 1).map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-fg-3 hover:text-fg transition-colors">
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <Anatomy stages={c.anatomy} />
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
