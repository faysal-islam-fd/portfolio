import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { ClosingCta, PageIntro } from "@/components/brand/section";
import { CHANNELS, EXPERIENCE, PROFILE, STACK } from "@/content/profile";
import { getAbout, getCertifications } from "@/lib/queries";
import { absoluteUrl, formatDate } from "@/lib/utils";

export const revalidate = 60;

const DESCRIPTION =
  "About Faysal Islam Fahad — a full-stack AI engineer in Dhaka, Bangladesh, building LLM features, RAG systems and ML models together with the product around them.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: `About — ${PROFILE.name}`,
    description: DESCRIPTION,
    url: absoluteUrl("/about"),
    type: "profile",
  },
};

export default async function AboutPage() {
  const [about, certifications] = await Promise.all([getAbout(), getCertifications()]);

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/about")}#profilepage`,
    url: absoluteUrl("/about"),
    mainEntity: { "@id": `${absoluteUrl()}#person` },
  };

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Based in", value: `${PROFILE.location} · ${PROFILE.timezone}` },
    { label: "Works with", value: "Clients worldwide, remote, async-first" },
    { label: "Focus", value: "LLM features, agents, RAG, applied ML — and the product around them" },
    { label: "Status", value: PROFILE.availability },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <BreadcrumbJsonLd items={[{ name: "About", href: "/about" }]} />

      <PageIntro
        label="About"
        title={
          <>
            I&apos;m Faysal. <em className="text-signal">I build the whole thing.</em>
          </>
        }
      />

      <section className="wrap pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            {about?.profile_image_url && (
              <figure className="ticks w-full max-w-[380px] p-3">
                <div className="relative aspect-[4/5] overflow-hidden border border-fg/30 bg-[#1d5a9a]">
                  <Image
                    src={about.profile_image_url}
                    alt={`Portrait of ${PROFILE.name}`}
                    fill
                    className="object-cover object-top opacity-90 mix-blend-luminosity grayscale contrast-125"
                    sizes="(max-width:1024px) 380px, 380px"
                    priority
                  />
                </div>
              </figure>
            )}
            <dl className="mt-8 max-w-[380px] border-t border-line">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-3 gap-3 border-b border-line py-3 text-sm">
                  <dt className="kicker pt-0.5">{f.label}</dt>
                  <dd className="col-span-2 text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {about?.resume_url && (
                <a href="/api/resume" target="_blank" rel="noopener noreferrer" className="btn btn-line">
                  Résumé (PDF) ↗
                </a>
              )}
              <Link href="/contact" className="btn btn-solid">
                Get in touch
              </Link>
            </div>
          </aside>

          <article className="lg:col-span-8 lg:pl-6">
            <div className="space-y-6 text-[19px] leading-[1.7] text-fg-2">
              <p className="display text-[clamp(1.7rem,3vw,2.4rem)] !leading-[1.2] text-fg">
                I&apos;m a full-stack AI engineer in Dhaka, Bangladesh. I write the retrieval
                pipeline, the API, the database schema and the interface — so a feature
                works end to end, not just in a notebook.
              </p>
              <p>
                I studied Computer Science and Engineering at Bangladesh University of
                Business &amp; Technology, then spent 2025–26 as a backend developer at
                Rangpur IT, building e-commerce APIs that real customers depended on.
              </p>
              <p>
                In parallel I&apos;ve been building AI products of my own.{" "}
                <Link href="/projects/axo-ai-product-planning-blueprint-generator" className="ulink text-fg">Axo</Link>{" "}
                turns product ideas into blueprints and prompts for AI coding tools.{" "}
                <Link href="/projects/sellwise-business-intelligence" className="ulink text-fg">SellWise</Link>{" "}
                brings forecasting and churn prediction to small online shops. Both are live.
                Along the way I&apos;ve built a cited-answer RAG assistant, a guarded LLM copilot
                for finance support, and a long tail of experiments — all public on GitHub.
              </p>
              <p>
                What I&apos;ve learned is that the model is rarely the hard part. The hard parts
                are the seams: messy input, unchecked output, a provider timing out at the
                worst moment, an interface nobody tried on a phone. Owning the whole stack
                makes those seams my responsibility — which is exactly how I want it.
              </p>
              <p>
                I&apos;m early in my independent career. That means I&apos;m selective about scope so
                I can do each project properly, and the work you hire me for is done by me —
                it never gets passed down to someone else.
              </p>
            </div>
          </article>
        </div>
      </section>

      <Section label="Experience">
        <ol className="border-t border-line">
          {EXPERIENCE.map((e) => (
            <li key={e.title} className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
              <span className="font-mono text-xs text-fg-3 sm:col-span-3 sm:pt-1">{e.period}</span>
              <div className="sm:col-span-9">
                <h3 className="text-lg font-medium text-fg">
                  {e.title} <span className="font-normal text-fg-3">— {e.org}</span>
                </h3>
                <p className="mt-1.5 leading-relaxed text-fg-2">{e.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Stack">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {STACK.map((g) => (
            <div key={g.group} className="border-t border-fg pt-4">
              <dt className="kicker">{g.group}</dt>
              <dd className="mt-2.5 text-fg-2 leading-relaxed">{g.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {certifications.length > 0 && (
        <Section label="Credentials">
          <ul className="border-t border-line">
            {certifications.map((c) => (
              <li key={c.id} className="grid grid-cols-1 gap-1 border-b border-line py-5 sm:grid-cols-12 sm:gap-6">
                <span className="font-mono text-xs text-fg-3 sm:col-span-3 sm:pt-1">
                  {c.issue_date ? formatDate(c.issue_date) : ""}
                </span>
                <div className="sm:col-span-9">
                  <p className="font-medium text-fg">
                    {c.credential_url ? (
                      <a href={c.credential_url} target="_blank" rel="noopener noreferrer" className="ulink">
                        {c.title} ↗
                      </a>
                    ) : (
                      c.title
                    )}
                  </p>
                  <p className="text-sm text-fg-3">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section label="Elsewhere">
        <ul className="border-t border-line">
          {CHANNELS.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-12 sm:gap-6"
              >
                <span className="kicker sm:col-span-3 sm:pt-1">{c.label}</span>
                <span className="text-fg group-hover:text-signal transition-colors sm:col-span-9">
                  {c.handle}
                  {c.href.startsWith("http") && <span aria-hidden className="text-fg-3"> ↗</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line">
      <div className="wrap grid grid-cols-1 gap-6 py-16 md:grid-cols-12">
        <h2 className="kicker md:col-span-3 md:pt-1.5">{label}</h2>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
