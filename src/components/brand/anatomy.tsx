import { cn } from "@/lib/utils";
import type { Stage, StageKind } from "@/content/work";

/**
 * "Anatomy" schematic — the brand's signature diagram. Draws a system as a
 * wired flow: numbered nodes on a spine, each leading out to a part. The
 * part's line style says what it is: deterministic code, a model, a
 * guardrail, data, or the input/output at the edges.
 */

const KIND_LABEL: Record<StageKind, string> = {
  io: "In / out",
  code: "Code",
  model: "Model",
  guard: "Guard",
  data: "Data",
};

const KIND_STYLE: Record<StageKind, string> = {
  io: "border-fg/35 bg-transparent",
  code: "border-fg bg-paper",
  model: "border-signal border-dashed bg-paper",
  guard: "border-fg bg-fg text-paper",
  data: "border-fg/50 bg-paper hatch",
};

export function Anatomy({
  stages,
  className,
}: {
  stages: Stage[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {stages.map((s, i) => {
        const last = i === stages.length - 1;
        const model = s.kind === "model";
        const guard = s.kind === "guard";
        return (
          <li key={i} className={cn("relative grid grid-cols-[2.75rem_1fr]", !last && "pb-4")}>
            {/* Spine: node marker, then a connector with an arrowhead down to the next node */}
            <div aria-hidden className="relative flex justify-center">
              <span
                className={cn(
                  "relative z-10 mt-3 grid h-7 w-7 place-items-center rounded-full border bg-paper font-mono text-[10px]",
                  model ? "border-dashed border-signal text-signal" : "border-fg/70 text-fg"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {!last && (
                <span className="absolute -bottom-3 left-1/2 top-10 w-px -translate-x-1/2 bg-fg/40">
                  <span className="absolute -bottom-px left-1/2 h-0 w-0 -translate-x-1/2 border-x-[3.5px] border-t-[6px] border-x-transparent border-t-fg/60" />
                </span>
              )}
              {/* Leader from node to part */}
              <span className="absolute left-[calc(50%+14px)] right-0 top-[1.625rem] h-px bg-fg/40" />
            </div>

            <div className={cn("flex min-w-0 flex-col border px-3.5 py-2.5", KIND_STYLE[s.kind])}>
              <div className="flex items-baseline justify-between gap-3">
                <span className={cn("text-[15px] font-semibold leading-snug", guard ? "text-paper" : "text-fg")}>
                  {s.label}
                </span>
                <span
                  className={cn(
                    "shrink-0 font-mono text-[10px] uppercase tracking-[0.14em]",
                    guard ? "text-paper/70" : model ? "text-signal" : "text-fg-3"
                  )}
                >
                  {KIND_LABEL[s.kind]}
                </span>
              </div>
              {s.detail && (
                <span className={cn("mt-0.5 text-[13px] leading-snug", guard ? "text-paper/75" : "text-fg-3")}>
                  {s.detail}
                </span>
              )}
            </div>
          </li>
        );
      })}
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
        "flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-3",
        className
      )}
      aria-label="Diagram legend"
    >
      {items.map((it) => (
        <li key={it.kind} className="inline-flex items-center gap-2">
          <span aria-hidden className={cn("inline-block h-3 w-6 border", KIND_STYLE[it.kind])} />
          {it.text}
        </li>
      ))}
    </ul>
  );
}
