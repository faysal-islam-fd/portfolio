import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/fx/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  cta,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  cta?: { label: string; href: string };
}) {
  return (
    <div
      className={
        "flex flex-col gap-3 " +
        (align === "center" ? "items-center text-center mx-auto max-w-3xl" : "")
      }
    >
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={2}>
          <p className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
      {cta && (
        <Reveal delay={3}>
          <Link
            href={cta.href}
            className="mt-2 group inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-accent-blue/80 transition-colors"
          >
            {cta.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
