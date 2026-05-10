import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Users, Tag } from "lucide-react";

import { MDX } from "@/components/site/mdx";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/fx/reveal";
import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { getResearchBySlug, getResearch } from "@/lib/queries";
import { RESEARCH_STATUS_LABELS, formatDateRange, absoluteUrl } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const items = await getResearch();
  return items.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResearchBySlug(slug);
  if (!r) return { title: "Not found" };
  return {
    title: r.title,
    description: r.abstract ?? undefined,
    keywords: r.keywords?.length ? r.keywords : undefined,
    alternates: {
      canonical: absoluteUrl(`/research/${r.slug}`),
    },
    openGraph: {
      title: r.title,
      description: r.abstract ?? undefined,
      images: r.thumbnail_url ? [{ url: r.thumbnail_url }] : undefined,
      url: absoluteUrl(`/research/${r.slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title: r.title,
      description: r.abstract ?? undefined,
      images: r.thumbnail_url ? [r.thumbnail_url] : undefined,
    },
  };
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await getResearchBySlug(slug);
  if (!r) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Research", href: "/research" },
          { name: r.title, href: `/research/${r.slug}` },
        ]}
      />
      <header className="relative overflow-hidden border-b border-white/[0.06]">
        <GridBackdrop />
        <div className="container-prose relative pt-12 pb-16">
          <Reveal>
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All research
            </Link>
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge variant="accent">
              {RESEARCH_STATUS_LABELS[r.status] ?? r.status}
            </Badge>
            {r.is_featured && <Badge variant="indigo">Featured</Badge>}
            {(r.start_date || r.end_date) && (
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                <time dateTime={r.start_date ?? undefined}>
                  {formatDateRange(r.start_date, r.end_date)}
                </time>
              </span>
            )}
          </div>
          <Reveal delay={1}>
            <h1 className="mt-5 text-balance text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
              {r.title}
            </h1>
          </Reveal>
          {r.abstract && (
            <Reveal delay={2}>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
                {r.abstract}
              </p>
            </Reveal>
          )}
        </div>
      </header>

      {r.thumbnail_url && (
        <div className="container-prose mt-10">
          <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-white/[0.06]">
            <Image
              src={r.thumbnail_url}
              alt={r.title}
              fill
              className="object-cover"
              sizes="(max-width:1280px) 100vw, 1280px"
              priority
            />
          </div>
        </div>
      )}

      <div className="container-prose mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8">
          {r.problem_statement && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Problem
              </h2>
              <p className="mt-3 text-zinc-300 leading-relaxed">
                {r.problem_statement}
              </p>
            </section>
          )}
          {r.methodology && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Methodology
              </h2>
              <p className="mt-3 text-zinc-300 leading-relaxed whitespace-pre-line">
                {r.methodology}
              </p>
            </section>
          )}
          {r.results && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Results
              </h2>
              <p className="mt-3 text-zinc-300 leading-relaxed whitespace-pre-line">
                {r.results}
              </p>
            </section>
          )}
          {r.diagram_url && (
            <figure className="my-10 rounded-2xl overflow-hidden border border-white/[0.06]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={r.diagram_url}
                  alt={`${r.title} – architecture diagram`}
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500 border-t border-white/[0.06]">
                Architecture diagram
              </figcaption>
            </figure>
          )}
          {r.content_mdx && <MDX source={r.content_mdx} />}
        </article>

        <aside className="lg:col-span-4 space-y-6">
          {r.keywords?.length > 0 && (
            <SidebarBox label="Keywords" icon={Tag}>
              <div className="flex flex-wrap gap-1.5">
                {r.keywords.map((k) => (
                  <span
                    key={k}
                    className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 border border-white/10 rounded-md px-2 py-0.5"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </SidebarBox>
          )}
          {r.collaborators?.length > 0 && (
            <SidebarBox label="Collaborators" icon={Users}>
              <ul className="text-sm space-y-1.5">
                {r.collaborators.map((c, i) => (
                  <li key={i} className="text-zinc-300">{c}</li>
                ))}
              </ul>
            </SidebarBox>
          )}
          {r.external_url && (
            <a
              href={r.external_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-ink-900/90  p-4 group hover:border-accent-blue/30 transition-colors"
            >
              <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                External resource
              </span>
              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-accent-blue transition-colors" />
            </a>
          )}
        </aside>
      </div>
      <div className="h-32" />
    </>
  );
}

function SidebarBox({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-ink-900/90  p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-3.5 w-3.5 text-accent-blue" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
