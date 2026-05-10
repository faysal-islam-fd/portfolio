import Image from "next/image";
import { BadgeCheck, ExternalLink, ShieldCheck } from "lucide-react";

import { StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { Spotlight } from "@/components/fx/spotlight";
import { SectionHeading } from "@/components/sections/section-heading";
import { formatDate } from "@/lib/utils";
import type { Certification } from "@/lib/types";

export function CertificationsSection({ items }: { items: Certification[] }) {
  if (!items?.length) {
    return (
      <section id="certifications" className="section">
        <div className="container-prose">
          <SectionHeading
            eyebrow="08 — Certifications"
            title="Professional credentials."
            description="Industry certifications and credentials that validate my expertise."
          />
          <div className="mt-14 rounded-2xl border border-white/[0.06] bg-ink-900/40 p-12 text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-zinc-600" />
            <h3 className="mt-4 text-sm font-semibold text-white tracking-tight">No certifications yet</h3>
            <p className="mt-2 text-sm text-zinc-500">Add your first certification from the admin dashboard.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="section">
      <div className="container-prose">
        <SectionHeading
          eyebrow="08 — Certifications"
          title="Professional credentials."
          description="Industry certifications and credentials that validate my expertise."
        />

        <StaggerContainer className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c) => (
            <StaggerItem key={c.id}>
              <Spotlight
                size={350}
                className="group h-full rounded-2xl border border-white/[0.06] bg-ink-900/90  p-6 transition-colors hover:border-accent-blue/30"
              >
                <div className="flex items-start gap-4">
                  {c.image_url ? (
                    <div className="relative h-12 w-12 shrink-0 rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src={c.image_url}
                        alt={c.title}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-indigo/10 border border-accent-blue/20 text-accent-blue shadow-glow-sm">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white tracking-tight text-balance">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">{c.issuer}</p>
                  </div>
                </div>

                {c.description && (
                  <p className="mt-4 text-sm text-zinc-500 leading-relaxed line-clamp-3">
                    {c.description}
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                    {c.issue_date && (
                      <time dateTime={c.issue_date}>
                        {formatDate(c.issue_date, {
                          year: "numeric",
                          month: "short",
                        })}
                      </time>
                    )}
                    {c.credential_id && (
                      <span className="flex items-center gap-1">
                        <BadgeCheck className="h-3 w-3 text-accent-blue" />
                        {c.credential_id}
                      </span>
                    )}
                  </div>
                  {c.credential_url && (
                    <a
                      href={c.credential_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-white transition-colors"
                      aria-label={`Verify ${c.title}`}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </Spotlight>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
