import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, MapPin, Briefcase, Sparkles } from "lucide-react";

import { NeuralNetwork } from "@/components/fx/neural-network";
import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { Typewriter } from "@/components/fx/typewriter";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/fx/spotlight";
import type { Hero as HeroType, About as AboutType, Metric } from "@/lib/types";

export function HeroSection({
  hero,
  about,
}: {
  hero: HeroType | null;
  about: AboutType | null;
}) {
  const titles = hero?.rotating_titles?.length
    ? hero.rotating_titles
    : [
        "AI Agent Architect",
        "Gen AI Developer",
        "Computer Vision Specialist",
        "Deep Learning Engineer",
      ];
  const metrics: Metric[] = (hero?.metrics ?? []) as Metric[];

  return (
    <section className="relative min-h-[92vh] overflow-hidden flex items-center">
      {/* Cinematic background stack */}
      <div className="absolute inset-0">
        <GridBackdrop />
        <div className="absolute inset-0 mask-fade-y">
          <NeuralNetwork />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-prose relative z-10 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Bio */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 ">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300">
                  {hero?.eyebrow ?? "MD. Faysal Islam Fahad · AI Solutions Architect"}
                </span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
                <span className="text-gradient">
                  {hero?.headline ?? "Building autonomous AI agents and intelligent systems."}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <div className="mt-5 flex items-center gap-2 font-mono text-sm sm:text-base text-zinc-400">
                <span className="hidden sm:inline text-zinc-600">{`>`}</span>
                <Typewriter words={titles} className="text-zinc-200" />
              </div>
            </Reveal>

            <Reveal delay={3}>
              <p className="mt-6 max-w-xl text-pretty text-base sm:text-lg leading-relaxed text-zinc-400">
                {about?.long_bio ?? hero?.subheadline ??
                  "I build production-grade AI agents (LangGraph, CrewAI), multi-agent systems, advanced RAG pipelines, and custom vision models that automate workflows and solve complex business problems."}
              </p>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="group">
                  <Link href={hero?.cta_primary_href ?? "/services"}>
                    {hero?.cta_primary_label ?? "View Services"}
                    <ArrowRight className="ml-1 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={hero?.cta_secondary_href ?? "/contact"}>
                    <FileText className="mr-1" />
                    {hero?.cta_secondary_label ?? "Get in touch"}
                  </Link>
                </Button>
              </div>
            </Reveal>

            {metrics.length > 0 && (
              <Reveal delay={5}>
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl border border-white/[0.06] bg-white/[0.04] overflow-hidden max-w-xl">
                  {metrics.slice(0, 4).map((m, i) => (
                    <div key={i} className="relative bg-ink-950/40 p-4 group">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-accent-blue/5 to-transparent" />
                      <div className="relative">
                        <div className="font-mono text-2xl font-semibold text-white tracking-tight">
                          {m.value}
                          {m.unit && (
                            <span className="text-accent-blue text-lg ml-0.5">
                              {m.unit}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500">
                          {m.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Right Column: Photo Card and Info Badges */}
          {about && (
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Reveal delay={2}>
                <Spotlight className="rounded-2xl glass overflow-hidden max-w-sm mx-auto w-full" size={500}>
                  <div className="relative aspect-[4/5] w-full">
                    {about.profile_image_url ? (
                      <Image
                        src={about.profile_image_url}
                        alt={about.full_name}
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 100vw, 400px"
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                        <div className="text-center">
                          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center shadow-glow-md">
                            <Sparkles className="h-8 w-8 text-white" />
                          </div>
                          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                            Profile photo
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-blue font-medium">
                        {about.research_focus ?? "AI Solutions Architect"}
                      </div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        {about.full_name ?? "MD. Faysal Islam Fahad"}
                      </div>
                    </div>
                  </div>
                </Spotlight>

                <div className="mt-4 grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
                  {about.current_role && (
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-accent-blue shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Currently</div>
                        <div className="text-xs text-zinc-200 font-medium truncate">{about.current_role}</div>
                      </div>
                    </div>
                  )}
                  {about.location && (
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent-indigo shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Based in</div>
                        <div className="text-xs text-zinc-200 font-medium truncate">{about.location}</div>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          )}

        </div>

        {about?.highlights && about.highlights.length > 0 && (
          <Reveal delay={6} className="mt-16 pt-12 border-t border-white/[0.06]">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-6">
              Core Capabilities & Highlights
            </div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </Reveal>
        )}
      </div>
    </section>
  );
}
