import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { AnatomyLegend } from "@/components/brand/anatomy";
import { ClosingCta, PageIntro } from "@/components/brand/section";
import { WorkList } from "@/components/brand/work-list";
import { ALSO_BUILT, CASE_STUDIES } from "@/content/work";
import { getProjects } from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 60;

const DESCRIPTION =
  "Case studies by Faysal Islam Fahad: an LLM support copilot with deterministic guardrails, a RAG assistant with cited answers, ML forecasting for small shops, and a live AI product-planning SaaS.";

export const metadata: Metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    title: "Work — Faysal Islam Fahad",
    description: DESCRIPTION,
    url: absoluteUrl("/projects"),
  },
};

export default async function WorkIndex() {
  // Projects added through the admin panel that don't have a hand-written
  // case study yet still get listed.
  const dbProjects = await getProjects();
  const known = new Set(CASE_STUDIES.map((c) => c.slug));
  const extra = dbProjects.filter((p) => !known.has(p.slug));

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Work", href: "/projects" }]} />
      <PageIntro
        label="Work"
        title={
          <>
            The evidence, <em className="text-signal">not the adjectives.</em>
          </>
        }
        intro="Every project here is public — live, or with its source open. Each diagram shows how the system is put together: what's plain code, what's a model, and where the guardrails sit."
      >
        <AnatomyLegend className="rise rise-3 mt-8" />
      </PageIntro>

      <section className="wrap pb-24">
        <WorkList items={CASE_STUDIES} />
      </section>

      <section className="border-t border-line">
        <div className="wrap py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <p className="kicker md:col-span-3 md:pt-2">Also built</p>
            <div className="md:col-span-9">
              <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">Smaller builds and experiments.</h2>
              <ul className="mt-10 border-t border-line">
                {extra.map((p) => (
                  <IndexRow
                    key={p.id}
                    name={p.title}
                    description={p.tagline ?? p.description ?? ""}
                    meta={p.tags?.slice(0, 3).join(" · ") ?? ""}
                    year={p.published_at ? new Date(p.published_at).getFullYear().toString() : ""}
                    href={`/projects/${p.slug}`}
                    internal
                  />
                ))}
                {ALSO_BUILT.map((p) => (
                  <IndexRow
                    key={p.name}
                    name={p.name}
                    description={p.description}
                    meta={p.stack}
                    year={p.year}
                    href={p.href}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

function IndexRow({
  name,
  description,
  meta,
  year,
  href,
  internal = false,
}: {
  name: string;
  description: string;
  meta: string;
  year: string;
  href: string;
  internal?: boolean;
}) {
  const inner = (
    <>
      <span className="font-medium text-fg group-hover:text-signal transition-colors sm:col-span-3">
        {name}
        {!internal && <span aria-hidden className="text-fg-3"> ↗</span>}
      </span>
      <span className="text-fg-2 sm:col-span-6">{description}</span>
      <span className="font-mono text-xs text-fg-3 sm:col-span-3 sm:text-right">
        {meta}
        {year && <span className="block">{year}</span>}
      </span>
    </>
  );
  const cls =
    "group grid grid-cols-1 gap-1.5 border-b border-line py-5 text-[15px] sm:grid-cols-12 sm:gap-6";
  return (
    <li>
      {internal ? (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      )}
    </li>
  );
}
