import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function FormShell({
  title,
  backHref,
  description,
  children,
  actions,
}: {
  title: string;
  backHref: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-8 pb-6 border-b border-white/[0.06]">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {title}
            </h1>
            {description && (
              <p className="mt-1.5 text-sm text-zinc-400">{description}</p>
            )}
          </div>
          {actions}
        </div>
      </div>
      {children}
    </>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-ink-900/90  p-6 mb-6">
      <header className="mb-5">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {description && (
          <p className="mt-1 text-xs text-zinc-500">{description}</p>
        )}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-200">{label}</label>
      {children}
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
