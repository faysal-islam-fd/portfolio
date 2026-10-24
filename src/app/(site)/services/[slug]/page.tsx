import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { Anatomy } from "@/components/brand/anatomy";
import { ClosingCta } from "@/components/brand/section";
import { PRINCIPLES, PROCESS } from "@/content/profile";
import { SERVICES, getService } from "@/content/services";
import { getCaseStudy } from "@/content/work";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Not found" };
  const url = absoluteUrl(`/services/${s.slug}`);
  return {
    title: s.name,
    description: s.promise,
    alternates: { canonical: url },
    openGraph: { title: `${s.name} — Faysal Islam Fahad`, description: s.promise, url },
    twitter: { card: "summary_large_image", title: s.name, description: s.promise },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const proof = getCaseStudy(s.proof);
  const others = SERVICES.filter((o) => o.slug !== s.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.promise,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@id": `${absoluteUrl()}#person` },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Services", href: "/services" },
          { name: s.name, href: `/services/${s.slug}` },
        ]}
      />

      <header className="wrap pt-12 pb-16 sm:pt-16">
        <Link href="/services" className="kicker hover:text-fg transition-colors">
          ← All services
        </Link>
        <h1 className="display rise mt-10 max-w-5xl text-[clamp(2.75rem,7vw,6rem)] text-balance">
          {s.name}
        </h1>
        <p className="lede rise rise-1 mt-7 max-w-3xl">{s.promise}</p>
        <div className="rise rise-2 mt-9 flex flex-wrap gap-3">
          <Link href={`/contact?service=${s.slug}`} className="btn btn-solid h-12 px-6">
            Discuss your project <span aria-hidden>→</span>
          </Link>
          {proof && (
            <Link href={`/projects/${proof.slug}`} className="btn btn-line h-12 px-6">
              See the proof: {proof.name}
            </Link>
          )}
        </div>
      </header>

      <div className="wrap">
        <Row label="Who it's for">
          <p className="text-xl leading-relaxed text-fg">{s.forWho}</p>
        </Row>
        <Row label="The real problem">
          <p className="text-lg leading-relaxed text-fg-2">{s.problem}</p>
        </Row>
        <Row label="What you get">
          <ul className="border-t border-line">
            {s.deliverables.map((d) => (
              <li key={d} className="flex gap-3 border-b border-line py-3.5 text-[16px] text-fg-2">
                <span aria-hidden className="text-signal">+</span>
                {d}
              </li>
            ))}
          </ul>
        </Row>
        <Row label="Typical stack">
          <ul className="flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <li key={t} className="tag text-xs">{t}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-fg-3">
            I&apos;ll work with your existing stack where it makes sense — these are defaults, not requirements.
          </p>
        </Row>
        {proof && (
          <Row label="Proof">
            <p className="kicker">{proof.name} · {proof.status} · {proof.year}</p>
            <h2 className="display mt-3 text-[clamp(1.75rem,3vw,2.5rem)] text-balance">{proof.title}</h2>
            <Anatomy stages={proof.anatomy} className="mt-8" />
            <Link href={`/projects/${proof.slug}`} className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium ulink">
              Read the case study <span aria-hidden>→</span>
            </Link>
          </Row>
        )}
        <Row label="How we'd work">
          <ol className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {PROCESS.map((p) => (
              <li key={p.step} className="bg-paper p-5">
                <span className="font-mono text-xs text-signal">{p.step}</span>
                <h3 className="mt-2 font-medium text-fg">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{p.body}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-8 space-y-3 text-[15px] text-fg-2">
            {PRINCIPLES.slice(0, 3).map((p) => (
              <li key={p.title} className="flex gap-3">
                <span aria-hidden className="text-signal">→</span>
                <span><strong className="font-medium text-fg">{p.title}</strong> {p.body}</span>
              </li>
            ))}
          </ul>
        </Row>
      </div>

      <section className="border-t border-line">
        <div className="wrap py-14">
          <p className="kicker">Other services</p>
          <ul className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group block">
                  <span className="display text-2xl group-hover:text-signal transition-colors">{o.name} →</span>
                  <span className="mt-1.5 block text-sm text-fg-3">{o.promise}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-6 border-t border-line py-12 md:grid-cols-12">
      <h2 className="side-label self-start md:col-span-3 md:pt-1.5">{label}</h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}
