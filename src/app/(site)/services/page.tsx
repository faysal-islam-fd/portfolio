import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { ClosingCta, PageIntro } from "@/components/brand/section";
import { PROCESS } from "@/content/profile";
import { SERVICES } from "@/content/services";
import { getCaseStudy } from "@/content/work";
import { absoluteUrl } from "@/lib/utils";

const DESCRIPTION =
  "Freelance AI engineering by Faysal Islam Fahad: AI copilots and agents for operations, RAG over your documents, forecasting and churn models, and AI-native MVPs built end to end.";

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: "Services — Faysal Islam Fahad",
    description: DESCRIPTION,
    url: absoluteUrl("/services"),
  },
};

export default function ServicesIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.promise,
        url: absoluteUrl(`/services/${s.slug}`),
        provider: { "@id": `${absoluteUrl()}#person` },
        areaServed: "Worldwide",
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }]} />
      <PageIntro
        label="Services"
        title={
          <>
            Four ways I can help — <em className="text-signal">each one already shipped.</em>
          </>
        }
        intro="I only offer what I've built before and can show you. If your problem doesn't fit neatly, write anyway — I'll tell you honestly whether I'm the right person for it."
      />

      <section className="wrap pb-24">
        <ol className="border-t border-line">
          {SERVICES.map((s, i) => {
            const proof = getCaseStudy(s.proof);
            return (
              <li key={s.slug} className="border-b border-line">
                <article className="grid grid-cols-1 gap-8 py-12 sm:py-16 lg:grid-cols-12">
                  <div className="lg:col-span-6">
                    <p className="kicker">
                      <span className="text-signal">{String.fromCharCode(65 + i)}</span> — Service
                    </p>
                    <h2 className="display mt-4 text-[clamp(2.1rem,4vw,3.5rem)] text-balance">
                      <Link href={`/services/${s.slug}`} className="hover:text-signal transition-colors">
                        {s.name}
                      </Link>
                    </h2>
                    <p className="lede mt-5">{s.promise}</p>
                    <p className="mt-4 text-fg-3 leading-relaxed">
                      <span className="kicker">For</span> {s.forWho}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
                      <Link href={`/services/${s.slug}`} className="font-medium ulink">
                        What&apos;s included <span aria-hidden>→</span>
                      </Link>
                      {proof && (
                        <Link href={`/projects/${proof.slug}`} className="text-fg-3 hover:text-fg transition-colors">
                          Proof: {proof.name}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="kicker">You get</p>
                    <ul className="mt-4 border-t border-line">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-3 border-b border-line py-3 text-[15px] text-fg-2">
                          <span aria-hidden className="text-signal">+</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-t border-line">
        <div className="wrap grid grid-cols-1 gap-6 py-20 sm:py-28 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="kicker">How engagements run</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-balance">
              Small scope, weekly demos, no surprises.
            </h2>
            <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {PROCESS.map((p) => (
                <li key={p.step} className="bg-paper p-6">
                  <span className="font-mono text-xs text-signal">{p.step}</span>
                  <h3 className="mt-3 font-medium text-fg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
