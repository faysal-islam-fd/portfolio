import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { NeuralNetwork } from "@/components/fx/neural-network";
import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { Typewriter } from "@/components/fx/typewriter";
import { Reveal } from "@/components/fx/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Hero as HeroType, Metric } from "@/lib/types";

export function HeroSection({ hero }: { hero: HeroType | null }) {
  const titles = hero?.rotating_titles?.length
    ? hero.rotating_titles
    : [
        "Computer Vision Researcher",
        "Vision Transformer Engineer",
        "Multimodal AI Architect",
      ];
  const metrics: Metric[] = (hero?.metrics ?? []) as Metric[];

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Cinematic background stack */}
      <div className="absolute inset-0">
        <GridBackdrop />
        <div className="absolute inset-0 mask-fade-y">
          <NeuralNetwork />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="container-prose relative z-10 flex min-h-[92vh] flex-col justify-center pt-12 pb-24">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300">
              {hero?.eyebrow ?? "MD. Faysal Islam Fahad · Deep Learning Engineer"}
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h1 className="mt-7 max-w-5xl text-balance text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-tight">
            <span className="text-gradient">
              {hero?.headline ??
                "Building intelligent systems that see, reason, and learn."}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-6 flex items-center gap-2 font-mono text-sm sm:text-base text-zinc-400">
            <span className="hidden sm:inline text-zinc-600">{`>`}</span>
            <Typewriter words={titles} className="text-zinc-200" />
          </div>
        </Reveal>

        <Reveal delay={3}>
          <p className="mt-8 max-w-2xl text-pretty text-base sm:text-lg leading-relaxed text-zinc-400">
            {hero?.subheadline ??
              "I research vision transformers, multimodal learning and large-scale model training — turning recent papers into production systems."}
          </p>
        </Reveal>

        <Reveal delay={4}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group">
              <Link href={hero?.cta_primary_href ?? "/research"}>
                {hero?.cta_primary_label ?? "View Research"}
                <ArrowRight className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={hero?.cta_secondary_href ?? "/about"}>
                <FileText className="mr-1" />
                {hero?.cta_secondary_label ?? "Read CV"}
              </Link>
            </Button>
            <div className="ml-2 hidden md:flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <kbd className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5">
                ⌘
              </kbd>
              <kbd className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5">
                K
              </kbd>
              <span>Quick search</span>
            </div>
          </div>
        </Reveal>

        {metrics.length > 0 && (
          <Reveal delay={5}>
            <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 max-w-3xl gap-px rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md overflow-hidden">
              {metrics.slice(0, 4).map((m, i) => (
                <div
                  key={i}
                  className="relative bg-ink-950/40 p-6 group"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-accent-blue/5 to-transparent" />
                  <div className="relative">
                    <div className="font-mono text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                      {m.value}
                      {m.unit && (
                        <span className="text-accent-blue text-2xl ml-0.5">
                          {m.unit}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {m.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 text-zinc-600">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Scroll
            </span>
            <span className="h-10 w-px bg-gradient-to-b from-zinc-500/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
