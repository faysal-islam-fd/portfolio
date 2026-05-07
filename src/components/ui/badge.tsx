import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-white/10 bg-white/[0.04] text-zinc-300",
        accent:
          "border-accent-blue/30 bg-accent-blue/10 text-accent-blue",
        indigo:
          "border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo",
        cyan:
          "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        warn:
          "border-amber-500/30 bg-amber-500/10 text-amber-300",
        outline:
          "border-white/15 text-zinc-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
