import { ExternalLink, FileText, Quote } from "lucide-react";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { PUBLICATION_TYPE_LABELS } from "@/lib/utils";
import type { Publication } from "@/lib/types";

export function PublicationsSection({ items }: { items: Publication[] }) {
  if (!items?.length) return null;

  return (
    <section id="publications" className="section">
      <div className="container-prose">
        <SectionHeading
          eyebrow="05 — Publications"
          title="Peer-reviewed contributions."
          description="Papers, workshops and preprints — the slowest-moving but most rewarding part of the work."
        />

        <StaggerContainer className="mt-14 space-y-3">
          {items.map((p, i) => (
            <StaggerItem key={p.id}>
              <PublicationRow pub={p} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function PublicationRow({ pub, index }: { pub: Publication; index: number }) {
  const link = pub.arxiv_url || pub.pdf_url;
  return (
    <article className="group relative rounded-2xl border border-white/[0.06] bg-ink-900/40 backdrop-blur-md transition-colors hover:border-accent-blue/30 hover:bg-ink-900/60">
      <div className="grid grid-cols-12 gap-6 p-6 sm:p-7">
        <div className="col-span-12 sm:col-span-2">
          <div className="font-mono text-3xl sm:text-4xl font-semibold text-zinc-100 tabular-nums">
            {pub.year}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="col-span-12 sm:col-span-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">
              {PUBLICATION_TYPE_LABELS[pub.publication_type] ?? pub.publication_type}
            </Badge>
            {pub.venue && (
              <span className="text-sm text-zinc-400">{pub.venue}</span>
            )}
            {pub.is_featured && <Badge variant="indigo">Featured</Badge>}
          </div>

          <h3 className="mt-3 text-lg sm:text-xl font-semibold text-white tracking-tight text-balance group-hover:text-gradient-accent transition-all">
            {pub.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            {pub.authors}
          </p>

          {pub.abstract && (
            <p className="mt-3 text-sm text-zinc-500 line-clamp-2 leading-relaxed">
              {pub.abstract}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-blue hover:text-white transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                Read paper
              </a>
            )}
            {pub.doi && (
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                DOI
              </a>
            )}
            {pub.bibtex && (
              <span className="inline-flex items-center gap-1.5 text-zinc-500">
                <Quote className="h-3.5 w-3.5" />
                Cite
              </span>
            )}
            {pub.citation_count > 0 && (
              <span className="font-mono text-xs text-zinc-500">
                {pub.citation_count} citations
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
