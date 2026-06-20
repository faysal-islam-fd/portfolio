import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, Sparkles } from "lucide-react";

import { NeuralNetwork } from "@/components/fx/neural-network";
import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { Typewriter } from "@/components/fx/typewriter";
import { Reveal } from "@/components/fx/reveal";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/fx/spotlight";
import type { Hero as HeroType, About as AboutType } from "@/lib/types";

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

  // Clean eyebrow: strip duplicate name if present and change to AI Engineer
  let cleanedEyebrow = hero?.eyebrow
    ? (hero.eyebrow.includes("·") ? hero.eyebrow.split("·")[1].trim() : hero.eyebrow)
    : "AI Engineer";
  cleanedEyebrow = cleanedEyebrow.replace("AI Solutions Architect", "AI Engineer");

  // Clean headline: replace seeded cluttery headline with a sleek alternative
  const rawHeadline = hero?.headline ?? "Building autonomous AI agents and intelligent systems.";
  const displayHeadline = rawHeadline === "Building autonomous AI agents and intelligent systems."
    ? "Engineering next-generation AI agents & multi-agent systems."
    : rawHeadline;

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
                  {cleanedEyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="mt-6 text-balance text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
                <span className="text-gradient">
                  {displayHeadline}
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
                {about?.short_bio ?? hero?.subheadline ??
                  "AI Engineer specializing in autonomous agentic workflows and custom machine learning models."}
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
          </div>

          {/* Right Column: Photo Card */}
          {about && (
            <div className="lg:col-span-5 flex flex-col justify-center mt-6 lg:mt-0">
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
                        {about.research_focus?.replace("AI Solutions Architect", "AI Engineer") ?? "AI Engineer"}
                      </div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        {about.full_name ?? "MD. Faysal Islam Fahad"}
                      </div>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}


