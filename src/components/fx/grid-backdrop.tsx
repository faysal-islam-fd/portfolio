export function GridBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 overflow-hidden " + className
      }
    >
      <div className="absolute inset-0 neural-grid opacity-60" />
      <div className="absolute inset-x-0 top-0 h-[40rem] bg-radial-glow" />
      <div className="absolute inset-0 bg-noise opacity-[0.025] mix-blend-overlay" />
    </div>
  );
}
