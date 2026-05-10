export function GridBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + className
      }
    >
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-noise opacity-5" />
    </div>
  );
}
