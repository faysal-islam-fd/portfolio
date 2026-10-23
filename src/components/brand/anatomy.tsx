import { cn } from "@/lib/utils";
import type { Stage, StageKind } from "@/content/work";

/**
 * "Anatomy" strip — the brand's signature diagram. Shows how a system is
 * put together, with a consistent visual grammar for what is
 * deterministic code, what is a model, and where the guardrails sit.
 */

const KIND_LABEL: Record<StageKind, string> = {
  io: "In / out",
  code: "Code",
  model: "Model",
  guard: "Guard",
  data: "Data",
};

const KIND_STYLE: Record<StageKind, string> = {
  io: "border-fg/20 bg-transparent",
  code: "border-fg bg-paper",
  model: "border-signal border-dashed bg-paper",
  guard: "border-fg bg-fg text-paper",
  data: "border-line bg-paper-2",
};

export function Anatomy({
  stages,
  className,
  compact = false,
}: {
  stages: Stage[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <ol
      className={cn(
        "relative grid gap-2",
        compact
          ? "grid-cols-1"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {stages.map((s, i) => (
        <li key={i} className="relative flex">
          <div
            className={cn(
              "flex w-full flex-col rounded-md border px-3.5 py-3",
              KIND_STYLE[s.kind]
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.14em]",
                  s.kind === "guard"
                    ? "text-paper/70"
                    : s.kind === "model"
                      ? "text-signal"
                      : "text-fg-3"
                )}
              >
                {String(i + 1).padStart(2, "0")} · {KIND_LABEL[s.kind]}
              </span>
            </div>
            <span
              className={cn(
                "mt-1.5 text-[15px] font-medium leading-snug",
                s.kind === "guard" ? "text-paper" : "text-fg"
              )}
            >
              {s.label}
            </span>
            {s.detail && (
              <span
                className={cn(
                  "mt-0.5 text-[13px] leading-snug",
                  s.kind === "guard" ? "text-paper/75" : "text-fg-3"
                )}
              >
                {s.detail}
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function AnatomyLegend({ className }: { className?: string }) {
  const items: { kind: StageKind; text: string }[] = [
    { kind: "code", text: "Deterministic code" },
    { kind: "model", text: "Model output" },
    { kind: "guard", text: "Guardrail" },
    { kind: "data", text: "Data" },
  ];
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-fg-3",
        className
      )}
      aria-label="Diagram legend"
    >
      {items.map((it) => (
        <li key={it.kind} className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className={cn("inline-block h-3 w-5 rounded-[3px] border", KIND_STYLE[it.kind])}
          />
          {it.text}
        </li>
      ))}
    </ul>
  );
}
