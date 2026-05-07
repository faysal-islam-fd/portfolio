import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  draft: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  archived: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  in_progress: "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
  under_review: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  accepted: "border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo",
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        STYLES[status] ?? "border-white/10 bg-white/[0.04] text-zinc-300"
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
