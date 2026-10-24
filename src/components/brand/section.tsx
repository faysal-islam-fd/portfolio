import Link from "next/link";

import { Callout } from "@/components/brand/blueprint";
import { cn } from "@/lib/utils";

/**
 * Section header styled as a drawing callout: numbered bubble, label and a
 * rule running to the edge, then the condensed title underneath.
 */
export function SectionHead({
  index,
  label,
  title,
  intro,
  action,
  className,
}: {
  index?: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        {index && <Callout>{index}</Callout>}
        <p className="kicker shrink-0 text-fg">{label}</p>
        <span aria-hidden className="h-px flex-1 bg-fg/25" />
        {action && (
          <Link
            href={action.href}
            className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-2 transition-colors hover:text-signal sm:inline"
          >
            {action.label} →
          </Link>
        )}
      </div>
      <div className={cn("mt-8 grid grid-cols-1 gap-6 md:grid-cols-12", index && "md:pl-[3.75rem]")}>
        <h2 className="display text-[clamp(2.5rem,5.5vw,4.5rem)] text-balance md:col-span-8">{title}</h2>
        {intro && <div className="text-fg-2 leading-relaxed md:col-span-4 md:self-end">{intro}</div>}
        {action && (
          <Link
            href={action.href}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-2 transition-colors hover:text-signal sm:hidden"
          >
            {action.label} →
          </Link>
        )}
      </div>
    </div>
  );
}

/** Page header for inner pages. */
export function PageIntro({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="wrap pt-14 pb-14 sm:pt-20 sm:pb-20">
      <div className="rise flex items-center gap-4">
        <p className="kicker shrink-0 text-signal">{label}</p>
        <span aria-hidden className="h-px flex-1 bg-fg/25" />
      </div>
      <h1 className="display rise rise-1 mt-8 max-w-5xl text-[clamp(3rem,8vw,6.75rem)] text-balance [&_em]:text-signal">
        {title}
      </h1>
      {intro && <div className="lede rise rise-2 mt-7 max-w-2xl">{intro}</div>}
      {children}
    </header>
  );
}

/** Closing call to action used at the bottom of most pages. */
export function ClosingCta({
  title = "Have a workflow that should run itself?",
  body = "Tell me what it is, what data it touches and what “done” looks like. You'll get a straight answer on whether AI is the right tool — and what it would take.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="wrap py-20 sm:py-28">
        <div className="ticks ticks-signal grid grid-cols-1 gap-10 p-8 sm:p-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="kicker text-signal">Next step</p>
            <h2 className="display mt-4 text-[clamp(2.5rem,6vw,5rem)] text-balance">{title}</h2>
            <p className="lede mt-6 max-w-xl">{body}</p>
          </div>
          <div className="flex flex-col items-start justify-end gap-3 md:col-span-4 md:items-end">
            <Link href="/contact" className="btn btn-solid h-12 px-6">
              Start a project <span aria-hidden>→</span>
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3 md:text-right">
              <span className="block">Free 30-min intro call</span>
              <span className="block">Replies within 24h</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
