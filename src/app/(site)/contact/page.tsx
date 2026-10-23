import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { ProjectForm } from "@/components/brand/project-form";
import { PageIntro } from "@/components/brand/section";
import { CHANNELS, PROCESS, PROFILE } from "@/content/profile";
import { SERVICES } from "@/content/services";
import { absoluteUrl } from "@/lib/utils";

const DESCRIPTION =
  "Start a project with Faysal Islam Fahad — AI copilots and agents, RAG over your documents, forecasting models or a full AI-native MVP. Replies within 24 hours.";

export const metadata: Metadata = {
  title: "Start a project",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: `Start a project — ${PROFILE.name}`,
    description: DESCRIPTION,
    url: absoluteUrl("/contact"),
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const preselect = SERVICES.some((s) => s.slug === service) ? service : undefined;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />
      <PageIntro
        label="Start a project"
        title={
          <>
            Tell me what should <em className="text-signal">run itself.</em>
          </>
        }
        intro="A few sentences is plenty. I'll reply within 24 hours — with questions, an honest view on whether AI is the right tool, or a time for a 30-minute call."
      />

      <section className="wrap pb-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProjectForm
              services={SERVICES.map((s) => ({ slug: s.slug, name: s.name }))}
              defaultService={preselect}
            />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <p className="kicker">Prefer email?</p>
            <a href={`mailto:${PROFILE.email}`} className="display mt-3 block break-all text-[1.7rem] leading-tight hover:text-signal transition-colors">
              {PROFILE.email}
            </a>

            <p className="kicker mt-12">What happens next</p>
            <ol className="mt-4 border-t border-line">
              {PROCESS.slice(0, 3).map((p) => (
                <li key={p.step} className="grid grid-cols-[2.25rem_1fr] border-b border-line py-4 text-sm">
                  <span className="font-mono text-xs text-signal">{p.step}</span>
                  <span>
                    <span className="font-medium text-fg">{p.title}.</span>{" "}
                    <span className="text-fg-2">{p.body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="kicker mt-12">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {CHANNELS.filter((c) => c.icon !== "mail").map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-fg-2 hover:text-fg transition-colors">
                    {c.label} <span className="text-fg-3">— {c.handle} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-fg-3">
              {PROFILE.location} · {PROFILE.timezone}. Working hours overlap with Europe; async for the Americas.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
