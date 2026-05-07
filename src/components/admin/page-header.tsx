import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AdminPageHeader({
  title,
  description,
  actions,
  newHref,
  newLabel = "New",
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8 pb-6 border-b border-white/[0.06]">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-zinc-400">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        {newHref && (
          <Button asChild>
            <Link href={newHref}>
              <Plus className="h-4 w-4" /> {newLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
