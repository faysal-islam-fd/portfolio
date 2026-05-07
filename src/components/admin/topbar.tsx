"use client";

import { useRouter } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

export function AdminTopbar({ email }: { email: string }) {
  const router = useRouter();

  const onSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl px-5 sm:px-8">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Admin Console
        </span>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition-colors"
        >
          View site <ExternalLink className="h-3 w-3" />
        </a>

        <div className="flex items-center gap-2.5 px-2 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-blue/30 to-accent-indigo/20 border border-accent-blue/30 text-xs font-semibold text-white">
            {getInitials(email || "A")}
          </span>
          <span className="hidden md:inline text-xs text-zinc-300 font-mono">
            {email}
          </span>
        </div>

        <Button variant="outline" size="sm" onClick={onSignOut}>
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    </header>
  );
}
