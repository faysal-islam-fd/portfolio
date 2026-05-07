import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] grid place-items-center overflow-hidden">
      <GridBackdrop />
      <div className="relative text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-blue">
          Error 404
        </p>
        <h1 className="mt-4 text-6xl sm:text-8xl font-semibold tracking-tight text-gradient">
          Page not found
        </h1>
        <p className="mt-5 mx-auto max-w-md text-zinc-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </Button>
      </div>
    </div>
  );
}
