import { cn } from "@/lib/utils";

/**
 * Drafting primitives for the blueprint look. Kept deliberately small:
 * a detail-callout bubble and a dimension line.
 */

/** Circular detail callout, as used to reference a view on a drawing. */
export function Callout({
  children,
  className,
  tone = "fg",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "fg" | "signal";
}) {
  return (
    <span
      className={cn(
        "inline-grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-[12px] font-medium",
        tone === "signal" ? "border-signal text-signal" : "border-fg/70 text-fg",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Dimension line: |<—— label ——>| . Stretches to its container's width,
 * so wrap the thing being "measured" in an inline-block and put this
 * under it.
 */
export function Dim({
  label,
  className,
}: {
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-signal",
        className
      )}
    >
      <span className="h-3 w-px bg-current" />
      <span className="draw-x relative h-px flex-1 bg-current">
        <span className="absolute -left-px -top-[3px] h-0 w-0 border-y-[3.5px] border-r-[7px] border-y-transparent border-r-current" />
      </span>
      <span className="shrink-0">{label}</span>
      <span className="draw-x relative h-px flex-1 bg-current">
        <span className="absolute -right-px -top-[3px] h-0 w-0 border-y-[3.5px] border-l-[7px] border-y-transparent border-l-current" />
      </span>
      <span className="h-3 w-px bg-current" />
    </span>
  );
}
