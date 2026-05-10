import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FlaskConical } from "lucide-react";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { Spotlight } from "@/components/fx/spotlight";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESEARCH_STATUS_LABELS } from "@/lib/utils";
import type { Research } from "@/lib/types";

export function ResearchSection({ items }: { items: Research[] }) {
  if (!items?.length) return null;

  return (
    <section id="research" className="section">
      <div className="container-prose">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeading
            eyebrow="02 — Research"
            title="Where I'm pushing the frontier."
            description="Active investigations across vision transformers, self-supervised learning, and efficient inference."
          />
          <Reveal>
            <Link
              href="/research"
              className="hidden md:inline-flex group items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-white transition-colors"
            >
              Explore all research
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <StaggerContainer className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((r, i) => (
            <StaggerItem key={r.id}>
              <ResearchCard research={r} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function ResearchCard({ research, index }: { research: Research; index: number }) {
  return (
    <Spotlight
      className="group relative h-full rounded-2xl border border-white/[0.06] bg-ink-900/50  overflow-hidden transition-colors hover:border-white/[0.12]"
      size={500}
    >
      <Link href={`/research/${research.slug}`} className="block">
        {research.thumbnail_url ? (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={research.thumbnail_url}
              alt={research.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          </div>
        ) : (
          <div className="relative aspect-[16/9] bg-gradient-to-br from-ink-800 via-ink-900 to-black overflow-hidden">
            <div className="absolute inset-0 neural-grid opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FlaskConical className="h-16 w-16 text-accent-blue/40" strokeWidth={1.2} />
            </div>
          </div>
        )}

        <div className="p-7">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="accent">
              {RESEARCH_STATUS_LABELS[research.status] ?? research.status}
            </Badge>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {String(index + 1).padStart(2, "0")} / Investigation
            </span>
          </div>

          <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-white tracking-tight text-balance group-hover:text-gradient-accent transition-all">
            {research.title}
          </h3>

          {research.abstract && (
            <p className="mt-3 text-zinc-400 leading-relaxed line-clamp-3">
              {research.abstract}
            </p>
          )}

          {research.keywords?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {research.keywords.slice(0, 5).map((k) => (
                <span
                  key={k}
                  className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 border border-white/10 rounded-md px-2 py-0.5"
                >
                  {k}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-1.5 text-sm text-accent-blue font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read full investigation
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </Link>
    </Spotlight>
  );
}
