import { Award, Star, Trophy, Medal } from "lucide-react";

import { StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { Spotlight } from "@/components/fx/spotlight";
import { SectionHeading } from "@/components/sections/section-heading";
import { formatDate } from "@/lib/utils";
import type { Achievement } from "@/lib/types";

const ICON_POOL = [Trophy, Award, Star, Medal];

export function AchievementsSection({ items }: { items: Achievement[] }) {
  if (!items?.length) return null;

  return (
    <section id="achievements" className="section">
      <div className="container-prose">
        <SectionHeading
          eyebrow="07 — Achievements"
          title="Awards & recognition."
          description="Selected highlights — the moments that pushed the work forward."
        />

        <StaggerContainer className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((a, i) => {
            const Icon = ICON_POOL[i % ICON_POOL.length] ?? Trophy;
            return (
              <StaggerItem key={a.id}>
                <Spotlight
                  size={350}
                  className="group h-full rounded-2xl border border-white/[0.06] bg-ink-900/40 backdrop-blur-md p-6 transition-colors hover:border-accent-blue/30"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-indigo/10 border border-accent-blue/20 text-accent-blue shadow-glow-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-white tracking-tight text-balance">
                        {a.title}
                      </h3>
                      {a.organization && (
                        <p className="mt-1 text-sm text-zinc-400">
                          {a.organization}
                        </p>
                      )}
                    </div>
                  </div>

                  {a.description && (
                    <p className="mt-4 text-sm text-zinc-500 leading-relaxed line-clamp-3">
                      {a.description}
                    </p>
                  )}

                  {a.date && (
                    <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {formatDate(a.date, { year: "numeric", month: "short" })}
                    </div>
                  )}
                </Spotlight>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
