import {
  Briefcase,
  GraduationCap,
  Microscope,
  HeartHandshake,
  Trophy,
} from "lucide-react";

import { StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { formatDateRange } from "@/lib/utils";
import type { Experience, ExperienceType } from "@/lib/types";

const ICONS: Record<ExperienceType, React.ComponentType<{ className?: string }>> = {
  work: Briefcase,
  research: Microscope,
  education: GraduationCap,
  fellowship: Trophy,
  volunteer: HeartHandshake,
};

export function ExperienceSection({ items }: { items: Experience[] }) {
  if (!items?.length) return null;

  return (
    <section id="experience" className="section">
      <div className="container-prose">
        <SectionHeading
          eyebrow="06 — Experience"
          title="A timeline of the work."
          description="Roles, programs, and projects where I built and shipped AI solutions."
        />

        <div className="relative mt-16">
          <div className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-blue/40 via-white/10 to-transparent" />

          <StaggerContainer className="space-y-10">
            {items.map((e) => {
              const Icon = ICONS[e.experience_type] ?? Briefcase;
              return (
                <StaggerItem key={e.id}>
                  <div className="relative flex gap-5">
                    <div className="relative shrink-0">
                      <span className="relative z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-ink-900 shadow-glow-sm">
                        <Icon className="h-4 w-4 text-accent-blue" />
                      </span>
                      {e.is_current && (
                        <span className="absolute inset-0 rounded-full bg-accent-blue/30 blur-md animate-glow-pulse" />
                      )}
                    </div>

                    <div className="flex-1 rounded-2xl border border-white/[0.06] bg-ink-900/90  p-6 transition-colors hover:border-white/[0.12]">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-white tracking-tight">
                            {e.role}
                          </div>
                          <div className="mt-1 text-sm text-accent-blue/90 font-medium">
                            {e.organization}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                            {formatDateRange(e.start_date, e.end_date, e.is_current)}
                          </div>
                          {e.location && (
                            <div className="text-xs text-zinc-500 mt-1">
                              {e.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {e.description && (
                        <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                          {e.description}
                        </p>
                      )}

                      {e.highlights?.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {e.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm text-zinc-300"
                            >
                              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-blue" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {e.technologies?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {e.technologies.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 border border-white/10 rounded-md px-2 py-0.5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
