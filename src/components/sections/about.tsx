import Image from "next/image";
import { MapPin, Briefcase, Sparkles } from "lucide-react";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { Spotlight } from "@/components/fx/spotlight";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import type { About } from "@/lib/types";

export function AboutSection({ about }: { about: About | null }) {
  if (!about) return null;

  return (
    <section id="about" className="section">
      <div className="container-prose">
        <SectionHeading
          eyebrow="01 — About"
          title="Architect. Developer. Builder."
          description="I build robust AI applications, agents, and custom machine learning pipelines that automate workflows and solve real-world problems."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <Spotlight className="rounded-2xl glass overflow-hidden" size={500}>
              <div className="relative aspect-[4/5] w-full">
                {about.profile_image_url ? (
                  <Image
                    src={about.profile_image_url}
                    alt={about.full_name}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 480px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                    <div className="text-center">
                      <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center shadow-glow-md">
                        <Sparkles className="h-10 w-10 text-white" />
                      </div>
                      <div className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Profile photo
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue">
                    {about.research_focus ?? "Generative AI & Agents"}
                  </div>
                  <div className="mt-1 text-xl font-semibold text-white">
                    {about.full_name === "Your Name" ? "MD. Faysal Islam Fahad" : about.full_name}
                  </div>
                </div>
              </div>
            </Spotlight>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {about.current_role && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <Briefcase className="h-4 w-4 text-accent-blue" />
                  <div className="mt-2 text-xs text-zinc-500 font-mono uppercase tracking-wider">
                    Currently
                  </div>
                  <div className="text-sm text-zinc-100 font-medium">
                    {about.current_role}
                  </div>
                </div>
              )}
              {about.location && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <MapPin className="h-4 w-4 text-accent-indigo" />
                  <div className="mt-2 text-xs text-zinc-500 font-mono uppercase tracking-wider">
                    Based in
                  </div>
                  <div className="text-sm text-zinc-100 font-medium">
                    {about.location}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={1}>
              <p className="text-xl sm:text-2xl text-zinc-200 leading-snug font-light text-balance">
                {about.long_bio ?? about.short_bio ?? ""}
              </p>
            </Reveal>

            {about.highlights?.length > 0 && (
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {about.highlights.map((h, i) => (
                  <StaggerItem
                    key={i}
                    className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-accent-blue/30 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-accent-blue/10 text-accent-blue font-mono text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {h}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
