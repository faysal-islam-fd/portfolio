import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { Reveal } from "@/components/fx/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/[0.06]">
      <GridBackdrop />
      <div className="container-prose relative pt-16 pb-20 sm:pt-20 sm:pb-28">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-5 text-balance text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={2}>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
