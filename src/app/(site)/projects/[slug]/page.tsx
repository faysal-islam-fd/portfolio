import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MDX } from "@/components/site/mdx";
import { ProjectJsonLd } from "@/components/site/project-json-ld";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { Anatomy, AnatomyLegend } from "@/components/brand/anatomy";
import { ClosingCta } from "@/components/brand/section";
import { CASE_STUDIES, getCaseStudy, type CaseStudy } from "@/content/work";
import { getService } from "@/content/services";
import { PROFILE } from "@/content/profile";
import { getProjectBySlug, getProjects } from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";
import type { Metric, Project } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const db = await getProjects();
  const slugs = new Set([...CASE_STUDIES.map((c) => c.slug), ...db.map((p) => p.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  const p = cs ? null : await getProjectBySlug(slug);
  if (!cs && !p) return { title: "Not found" };

  const title = cs ? `${cs.name} — case study` : p!.title;
  const description = cs ? cs.summary : (p!.tagline ?? p!.description ?? undefined);
  const url = absoluteUrl(`/projects/${slug}`);
  return {
    title,
    description,
    keywords: cs ? cs.stack : p!.tags,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (cs) return <CaseStudyView cs={cs} />;

  const p = await getProjectBySlug(slug);
  if (!p) notFound();
  return <DbProjectView p={p} />;
}

/* ------------------------------------------------------------------ */

function CaseStudyView({ cs }: { cs: CaseStudy }) {
  const service = getService(cs.service);
  const index = CASE_STUDIES.findIndex((c) => c.slug === cs.slug);
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  const url = absoluteUrl(`/projects/${cs.slug}`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: cs.name,
    headline: cs.title,
    description: cs.summary,
    url,
    dateCreated: cs.year,
    keywords: cs.stack.join(", "),
    author: { "@id": `${absoluteUrl()}#person`, name: PROFILE.name },
    ...(cs.image ? { image: cs.image.src } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Work", href: "/projects" },
          { name: cs.name, href: `/projects/${cs.slug}` },
        ]}
      />

      <header className="wrap pt-12 pb-14 sm:pt-16">
        <Link href="/projects" className="kicker hover:text-fg transition-colors">
          ← All work
        </Link>
        <p className="kicker rise mt-10">
          <span className="text-signal">Case study {String(index + 1).padStart(2, "0")}</span> — {cs.name}
        </p>
        <h1 className="display rise rise-1 mt-5 max-w-5xl text-[clamp(2.5rem,6vw,5.25rem)] text-balance">
          {cs.title}
        </h1>
        <p className="lede rise rise-2 mt-7 max-w-3xl">{cs.summary}</p>

        <dl className="rise rise-3 mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line text-sm md:grid-cols-4">
          <Fact label="Status" value={cs.status} />
          <Fact label="Year" value={cs.year} />
          <Fact label="Context" value={cs.context ?? "Independent product"} />
          <div className="bg-paper p-4">
            <dt className="kicker">Links</dt>
            <dd className="mt-1.5 space-y-1">
              {cs.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="block text-fg ulink w-fit">
                  {l.label} ↗
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </header>

      {cs.image && (
        <div className="wrap">
          <figure className="overflow-hidden border border-line bg-paper-2">
            <Image
              src={cs.image.src}
              alt={cs.image.alt}
              width={cs.image.width}
              height={cs.image.height}
              priority
              className="h-auto w-full"
              sizes="(max-width:1240px) 100vw, 1240px"
            />
          </figure>
        </div>
      )}

      <section className="wrap py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="side-label">Anatomy</p>
            <AnatomyLegend className="mt-4 flex-col !items-start" />
          </div>
          <div className="md:col-span-9">
            <Anatomy stages={cs.anatomy} />
          </div>
        </div>
      </section>

      <div className="wrap pb-8">
        <Block label="The problem">
          <p className="text-xl leading-relaxed text-fg">{cs.problem}</p>
        </Block>

        <Block label="What was built">
          <ul className="space-y-4">
            {cs.built.map((b, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr] text-[17px] leading-relaxed text-fg-2">
                <span className="font-mono text-xs leading-[1.9rem] text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Key decisions">
          <ol className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {cs.decisions.map((d) => (
              <li key={d.title} className="border-t border-fg pt-5">
                <h3 className="display text-[1.6rem]">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-2">{d.body}</p>
              </li>
            ))}
          </ol>
        </Block>

        {cs.limits && cs.limits.length > 0 && (
          <Block label="Honest limits">
            <ul className="space-y-3">
              {cs.limits.map((l, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-fg-2">
                  <span aria-hidden className="text-fg-3">—</span>
                  {l}
                </li>
              ))}
            </ul>
          </Block>
        )}

        <Block label="Stack">
          <ul className="flex flex-wrap gap-2">
            {cs.stack.map((s) => (
              <li key={s} className="tag text-xs">{s}</li>
            ))}
          </ul>
        </Block>
      </div>

      <section className="border-t border-line">
        <div className="wrap grid grid-cols-1 gap-px md:grid-cols-2">
          {service && (
            <Link href={`/services/${service.slug}`} className="group py-12 md:pr-10">
              <p className="kicker">Need something like this?</p>
              <p className="display mt-3 text-3xl group-hover:text-signal transition-colors">{service.name} →</p>
              <p className="mt-2 text-fg-2">{service.promise}</p>
            </Link>
          )}
          {next && next.slug !== cs.slug && (
            <Link href={`/projects/${next.slug}`} className="group border-t border-line py-12 md:border-t-0 md:border-l md:pl-10">
              <p className="kicker">Next case study</p>
              <p className="display mt-3 text-3xl group-hover:text-signal transition-colors">{next.name} →</p>
              <p className="mt-2 text-fg-2">{next.title}</p>
            </Link>
          )}
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-4">
      <dt className="kicker">{label}</dt>
      <dd className="mt-1.5 text-fg">{value}</dd>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-6 border-t border-line py-12 md:grid-cols-12">
      <h2 className="side-label self-start md:col-span-3 md:pt-1.5">{label}</h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects created in the admin panel without a hand-written case study */

function DbProjectView({ p }: { p: Project }) {
  const metrics: Metric[] = (p.metrics ?? []) as Metric[];
  const links = [
    p.demo_url && { label: "Live", href: p.demo_url },
    p.github_url && { label: "Source", href: p.github_url },
    p.paper_url && { label: "Write-up", href: p.paper_url },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <ProjectJsonLd project={p} />
      <BreadcrumbJsonLd
        items={[
          { name: "Work", href: "/projects" },
          { name: p.title, href: `/projects/${p.slug}` },
        ]}
      />
      <header className="wrap pt-12 pb-14 sm:pt-16">
        <Link href="/projects" className="kicker hover:text-fg transition-colors">
          ← All work
        </Link>
        <h1 className="display rise mt-10 max-w-5xl text-[clamp(2.5rem,6vw,5.25rem)] text-balance">
          {p.title}
        </h1>
        {(p.tagline || p.description) && (
          <p className="lede rise rise-1 mt-7 max-w-3xl">{p.tagline ?? p.description}</p>
        )}
        {links.length > 0 && (
          <div className="rise rise-2 mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      {p.cover_image_url && (
        <div className="wrap">
          <div className="relative aspect-[16/9] overflow-hidden border border-line bg-paper-2">
            <Image src={p.cover_image_url} alt={p.title} fill priority className="object-cover" sizes="(max-width:1240px) 100vw, 1240px" />
          </div>
        </div>
      )}

      <div className="wrap py-16">
        {metrics.length > 0 && (
          <dl className="mb-6 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={i} className="bg-paper p-5">
                <dt className="kicker">{m.label}</dt>
                <dd className="display mt-2 text-3xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {p.problem && (
          <Block label="The problem">
            <p className="whitespace-pre-line text-lg leading-relaxed text-fg-2">{p.problem}</p>
          </Block>
        )}
        {p.approach && (
          <Block label="Approach">
            <p className="whitespace-pre-line text-lg leading-relaxed text-fg-2">{p.approach}</p>
          </Block>
        )}
        {p.results && (
          <Block label="Results">
            <p className="whitespace-pre-line text-lg leading-relaxed text-fg-2">{p.results}</p>
          </Block>
        )}
        {p.content_mdx && (
          <Block label="Notes">
            <MDX source={p.content_mdx} />
          </Block>
        )}
        {p.tags?.length > 0 && (
          <Block label="Stack">
            <ul className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t} className="tag text-xs">{t}</li>
              ))}
            </ul>
          </Block>
        )}
      </div>
      <ClosingCta />
    </>
  );
}
