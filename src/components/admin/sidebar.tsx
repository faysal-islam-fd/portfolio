"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FlaskConical,
  FolderKanban,
  BookText,
  Award,
  Briefcase,
  Sparkles,
  Wrench,
  User,
  Mail,
  FileText,
  Settings,
  Trophy,
  Inbox,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV: { label: string; group: string; items: { href: string; label: string; icon: any }[] }[] = [
  {
    group: "Overview",
    label: "overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    group: "Content",
    label: "content",
    items: [
      { href: "/admin/projects", label: "Projects", icon: FolderKanban },
      { href: "/admin/research", label: "Research", icon: FlaskConical },
      { href: "/admin/publications", label: "Publications", icon: FileText },
      { href: "/admin/posts", label: "Blog Posts", icon: BookText },
      { href: "/admin/experience", label: "Experience", icon: Briefcase },
      { href: "/admin/skills", label: "Skills", icon: Wrench },
      { href: "/admin/achievements", label: "Achievements", icon: Trophy },
      { href: "/admin/certifications", label: "Certifications", icon: ShieldCheck },
    ],
  },
  {
    group: "Site",
    label: "site",
    items: [
      { href: "/admin/hero", label: "Hero", icon: Sparkles },
      { href: "/admin/about", label: "About", icon: User },
      { href: "/admin/contact-links", label: "Contact Links", icon: Mail },
      { href: "/admin/messages", label: "Messages", icon: Inbox },
    ],
  },
  {
    group: "System",
    label: "system",
    items: [{ href: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-white/[0.06] bg-ink-950">
      <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-accent-blue to-accent-indigo shadow-glow-sm">
            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.4} />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white">
              Admin Panel
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              v1.0
            </span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-accent-blue/10 text-white border border-accent-blue/20 shadow-glow-sm"
                          : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-white transition-colors font-mono"
        >
          ← View public site
        </Link>
      </div>
    </aside>
  );
}
