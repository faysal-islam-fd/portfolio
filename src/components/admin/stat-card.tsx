import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  href,
  icon: Icon,
  accent = "blue",
}: {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "blue" | "indigo" | "cyan" | "violet";
}) {
  const accents: Record<string, string> = {
    blue: "from-accent-blue/30 to-accent-blue/5 text-accent-blue",
    indigo: "from-accent-indigo/30 to-accent-indigo/5 text-accent-indigo",
    cyan: "from-accent-cyan/30 to-accent-cyan/5 text-accent-cyan",
    violet: "from-accent-violet/30 to-accent-violet/5 text-accent-violet",
  };

  const Wrapper: any = href ? Link : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="group relative rounded-2xl border border-white/[0.06] bg-ink-900/90  p-6 transition-colors hover:border-white/[0.12] block"
    >
      <div className="flex items-start justify-between">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${
            accents[accent]
          } border border-white/10`}
        >
          <Icon className="h-4 w-4" />
        </span>
        {href && (
          <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
        )}
      </div>
      <div className="mt-5">
        <div className="font-mono text-3xl font-semibold tabular-nums text-white">
          {value}
        </div>
        <div className="mt-1 text-sm text-zinc-400">{label}</div>
        {hint && (
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
            {hint}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
