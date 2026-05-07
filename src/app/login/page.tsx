import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";

import { GridBackdrop } from "@/components/fx/grid-backdrop";
import { LoginForm } from "@/components/admin/login-form";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();
  if (user && (await isAdmin(user.email))) redirect(params.next ?? "/admin");

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <GridBackdrop />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 mb-8"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-b from-accent-blue to-accent-indigo shadow-glow-sm">
            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-semibold tracking-tight text-zinc-100">
            AI<span className="text-accent-blue">/</span>Researcher
          </span>
        </Link>

        <div className="rounded-2xl border border-white/[0.08] bg-ink-900/60 backdrop-blur-xl p-8 glow-border">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Admin sign in
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Authorized admin access only. Unauthorized attempts are logged.
          </p>

          <div className="mt-7">
            <LoginForm next={params.next} initialError={params.error} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500 font-mono">
          ← <Link href="/" className="hover:text-white transition-colors">Back to portfolio</Link>
        </p>
      </div>
    </div>
  );
}
