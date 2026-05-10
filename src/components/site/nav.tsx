"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="container-prose">
        <nav
          className={cn(
            "relative flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "border-white/10 bg-ink-950/70  shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
              : "border-white/[0.04] bg-ink-950/30 "
          )}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5"
            aria-label="Home"
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-accent-blue to-accent-indigo shadow-glow-sm">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2.4} />
              <span className="absolute inset-0 rounded-lg bg-accent-blue/30 blur-md opacity-50 group-hover:opacity-90 transition-opacity" />
            </span>
            <span className="hidden sm:inline-block font-semibold tracking-tight text-zinc-100">
              AI<span className="text-accent-blue">/</span>Researcher
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === l.href
                  : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative inline-flex items-center rounded-lg px-3.5 py-1.5 text-sm transition-colors",
                      active
                        ? "text-white"
                        : "text-zinc-400 hover:text-zinc-100"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                    {active && (
                      <span className="relative z-10 ml-1.5 inline-block h-1 w-1 rounded-full bg-accent-blue shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <Button asChild size="sm" variant="glow">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-200"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl border border-white/10 bg-ink-950/90  p-2"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => {
                  const active = pathname.startsWith(l.href);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={cn(
                          "block rounded-lg px-3.5 py-2.5 text-sm transition-colors",
                          active
                            ? "bg-white/[0.06] text-white"
                            : "text-zinc-300 hover:bg-white/[0.04]"
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="px-2 pt-2">
                  <Button asChild className="w-full" variant="default">
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
