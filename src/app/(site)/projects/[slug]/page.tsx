import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Globe,
  FileText,
  Database,
  Brain,
  Tag,
} from "lucide-react";

import { MDX } from "@/components/site/mdx";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/fx/reveal";
import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/queries";
import {
  PROJECT_TYPE_LABELS,
  absoluteUrl,
  formatDate,
} from "@/lib/utils";
import type { Metric } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const items = await getProjects();
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.title,
    description: p.tagline ?? p.description ?? undefined,
    openGraph: {
      title: p.title,
      description: p.tagline ?? p.description ?? undefined,
      images: p.cover_image_url ? [{ url: p.cover_image_url }] : undefined,
      url: absoluteUrl(`/projects/${p.slug}`),
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();
  const metrics: Metric[] = (p.metrics ?? []) as Metric[];

  return (
    <>
      <header className="relative overflow-hidden border-b border-white/[0.06]">
        <GridBackdrop />
        <div className="container-prose relative pt-12 pb-16">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All projects
            </Link>
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge variant="accent">
              {PROJECT_TYPE_LABELS[p.project_type] ?? p.project_type}
            </Badge>
            {p.is_featured && <Badge variant="indigo">Featured</Badge>}
            {p.published_at && (
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                {formatDate(p.published_at, { year: "numeric", month: "short" })}
              </span>
            )}
          </div>
          <Reveal delay={1}>
            <h1 className="mt-5 text-balance text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
              {p.title}
            </h1>
          </Reveal>
          {p.tagline && (
            <Reveal delay={2}>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
                {p.tagline}
              </p>
            </Reveal>
          )}

          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {p.github_url && (
                <Button asChild variant="outline">
                  <a href={p.github_url} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" /> Source
                  </a>
                </Button>
              )}
              {p.demo_url && (
                <Button asChild variant="outline">
                  <a href={p.demo_url} target="_blank" rel="noreferrer">
                    <Globe className="h-4 w-4" /> Live demo
                  </a>
                </Button>
              )}
              {p.paper_url && (
                <Button asChild variant="outline">
                  <a href={p.paper_url} target="_blank" rel="noreferrer">
                    <FileText className="h-4 w-4" /> Paper
                  </a>
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {p.cover_image_url && (
        <div className="container-prose mt-10">
          <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-white/[0.06]">
            <Image
              src={p.cover_image_url}
              alt={p.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}

      {metrics.length > 0 && (
        <div className="container-prose mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md overflow-hidden">
            {metrics.map((m, i) => (
              <div key={i} className="bg-ink-950/40 p-6">
                <div className="font-mono text-2xl sm:text-3xl font-semibold text-white">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container-prose mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8">
          {p.problem && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                The problem
              </h2>
              <p className="mt-3 text-zinc-300 leading-relaxed whitespace-pre-line">
                {p.problem}
              </p>
            </section>
          )}
          {p.approach && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                The approach
              </h2>
              <p className="mt-3 text-zinc-300 leading-relaxed whitespace-pre-line">
                {p.approach}
              </p>
            </section>
          )}
          {p.results && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Results
              </h2>
              <p className="mt-3 text-zinc-300 leading-relaxed whitespace-pre-line">
                {p.results}
              </p>
            </section>
          )}
          {p.architecture_image_url && (
            <figure className="my-10 rounded-2xl overflow-hidden border border-white/[0.06]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={p.architecture_image_url}
                  alt={`${p.title} – architecture`}
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500 border-t border-white/[0.06]">
                System architecture
              </figcaption>
            </figure>
          )}
          {p.gallery_urls?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white tracking-tight mb-5">
                Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {p.gallery_urls.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06]"
                  >
                    <Image
                      src={url}
                      alt={`${p.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 600px"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
          {p.content_mdx && <MDX source={p.content_mdx} />}
        </article>

        <aside className="lg:col-span-4 space-y-6">
          {p.tags?.length > 0 && (
            <SidebarBox label="Tags" icon={Tag}>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 border border-white/10 rounded-md px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </SidebarBox>
          )}
          {p.datasets?.length > 0 && (
            <SidebarBox label="Datasets" icon={Database}>
              <ul className="text-sm space-y-1.5">
                {p.datasets.map((d) => (
                  <li key={d} className="text-zinc-300">{d}</li>
                ))}
              </ul>
            </SidebarBox>
          )}
          {p.models?.length > 0 && (
            <SidebarBox label="Models" icon={Brain}>
              <ul className="text-sm space-y-1.5 font-mono">
                {p.models.map((m) => (
                  <li key={m} className="text-zinc-300">{m}</li>
                ))}
              </ul>
            </SidebarBox>
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
    <div className="rounded-xl border border-white/[0.06] bg-ink-900/40 backdrop-blur-md p-5">
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
