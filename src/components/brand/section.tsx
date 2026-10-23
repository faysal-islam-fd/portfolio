import Link from "next/link";

import { cn } from "@/lib/utils";

/** Numbered section header: "02 — Selected work" + serif title. */
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
    <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-12", className)}>
      <p className="kicker md:col-span-3 md:pt-3">
        {index && <span className="text-signal">{index}</span>}
        {index && " — "}
        {label}
      </p>
      <div className="md:col-span-9">
        <h2 className="display text-[clamp(2.25rem,5vw,4rem)] text-balance">{title}</h2>
        {intro && <div className="lede mt-5 max-w-2xl">{intro}</div>}
        {action && (
          <Link href={action.href} className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-fg ulink">
            {action.label} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

/** Simple page header for inner pages. */
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
    <header className="wrap pt-16 pb-14 sm:pt-24 sm:pb-20">
      <p className="kicker rise">{label}</p>
      <h1 className="display rise rise-1 mt-5 max-w-5xl text-[clamp(2.75rem,7vw,6rem)] text-balance">
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
    <section className="border-t border-line bg-paper-2/60">
      <div className="wrap grid grid-cols-1 gap-10 py-20 sm:py-28 md:grid-cols-12">
        <div className="md:col-span-8">
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)] text-balance">{title}</h2>
          <p className="lede mt-6 max-w-xl">{body}</p>
        </div>
        <div className="flex flex-col items-start justify-end gap-3 md:col-span-4 md:items-end">
          <Link href="/contact" className="btn btn-solid h-12 px-6">
            Start a project <span aria-hidden>→</span>
          </Link>
          <p className="text-sm text-fg-3">Free 30-minute intro call. Replies within 24h.</p>
        </div>
      </div>
    </section>
  );
}
