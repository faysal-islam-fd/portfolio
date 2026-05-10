import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FlaskConical } from "lucide-react";

import { PageHeader } from "@/components/site/page-header";
import { Spotlight } from "@/components/fx/spotlight";
import { StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { getResearch } from "@/lib/queries";
import { absoluteUrl, RESEARCH_STATUS_LABELS } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Publications & Research",
  description:
    "Technical reports, publications, and deep learning experiments by MD. Faysal Islam Fahad.",
  alternates: {
    canonical: absoluteUrl("/research"),
  },
  openGraph: {
    title: "Publications & Research — MD. Faysal Islam Fahad",
    description:
      "Technical reports, publications, and deep learning experiments.",
    url: absoluteUrl("/research"),
  },
};

export default async function ResearchIndex() {
  const items = await getResearch();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Research", href: "/research" }]} />
      <PageHeader
        eyebrow="Research"
        title="Technical reports & papers."
        description="Applied deep learning research and technical publications."
      />

      <section className="section">
        <div className="container-prose">
          {items.length === 0 ? (
            <Empty />
          ) : (
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {items.map((r) => (
                <StaggerItem key={r.id}>
                  <Spotlight
                    size={500}
                    className="group h-full rounded-2xl border border-white/[0.06] bg-ink-900/50  overflow-hidden lift"
                  >
                    <Link href={`/research/${r.slug}`} className="block h-full">
                      {r.thumbnail_url ? (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={r.thumbnail_url}
                            alt={r.title}
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
                            <FlaskConical className="h-14 w-14 text-accent-blue/40" />
                          </div>
                        </div>
                      )}
                      <div className="p-7">
                        <Badge variant="accent">
                          {RESEARCH_STATUS_LABELS[r.status] ?? r.status}
                        </Badge>
                        <h3 className="mt-4 text-2xl font-semibold text-white tracking-tight text-balance group-hover:text-gradient-accent transition-all">
                          {r.title}
                        </h3>
                        {r.abstract && (
                          <p className="mt-3 text-zinc-400 leading-relaxed line-clamp-3">
                            {r.abstract}
                          </p>
                        )}
                        {r.keywords?.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {r.keywords.slice(0, 6).map((k) => (
                              <span
                                key={k}
                                className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 border border-white/10 rounded-md px-2 py-0.5"
                              >
                                {k}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="mt-5 flex items-center gap-1.5 text-sm text-accent-blue font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Read details <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </Link>
                  </Spotlight>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}

function Empty() {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center">
      <p className="text-zinc-400">No research entries yet. Add some from the admin panel.</p>
    </div>
  );
}
