import {
  FolderKanban,
  Bot,
  BookText,
  Inbox,
  Trophy,
  Briefcase,
  Wrench,
  ShieldCheck,
} from "lucide-react";

import { createServiceClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { formatDate } from "@/lib/utils";

async function countAll() {
  const supabase = createServiceClient();
  const tables = [
    "projects",
    "research",
    "posts",
    "experience",
    "achievements",
    "certifications",
    "skills",
    "contact_messages",
  ] as const;

  const results = await Promise.all(
    tables.map(async (t) => {
      const { count } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true });
      return [t, count ?? 0] as const;
    })
  );
  return Object.fromEntries(results) as Record<(typeof tables)[number], number>;
}

async function recentMessages() {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("id,name,email,subject,is_read,created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

async function recentlyEdited() {
  const supabase = createServiceClient();
  const [projects, research, posts] = await Promise.all([
    supabase
      .from("projects")
      .select("id,title,slug,updated_at")
      .order("updated_at", { ascending: false })
      .limit(3),
    supabase
      .from("research")
      .select("id,title,slug,updated_at")
      .order("updated_at", { ascending: false })
      .limit(3),
    supabase
      .from("posts")
      .select("id,title,slug,updated_at")
      .order("updated_at", { ascending: false })
      .limit(3),
  ]);
  return [
    ...(projects.data ?? []).map((x) => ({ ...x, kind: "Project", href: `/admin/projects/${x.id}` })),
    ...(research.data ?? []).map((x) => ({ ...x, kind: "Service", href: `/admin/research/${x.id}` })),
    ...(posts.data ?? []).map((x) => ({ ...x, kind: "Post", href: `/admin/posts/${x.id}` })),
  ]
    .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
    .slice(0, 6);
}

export default async function AdminDashboard() {
  const [counts, msgs, recent] = await Promise.all([
    countAll(),
    recentMessages(),
    recentlyEdited(),
  ]);

  const unread = msgs.filter((m) => !m.is_read).length;

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Quick overview of your portfolio content."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={FolderKanban}
          label="Projects"
          value={counts.projects}
          href="/admin/projects"
          accent="blue"
        />
        <StatCard
          icon={Bot}
          label="Services"
          value={counts.research}
          href="/admin/research"
          accent="indigo"
        />
        <StatCard
          icon={BookText}
          label="Blog posts"
          value={counts.posts}
          href="/admin/posts"
          accent="violet"
        />
        <StatCard
          icon={Briefcase}
          label="Experience"
          value={counts.experience}
          href="/admin/experience"
          accent="blue"
        />
        <StatCard
          icon={Trophy}
          label="Achievements"
          value={counts.achievements}
          href="/admin/achievements"
          accent="indigo"
        />
        <StatCard
          icon={ShieldCheck}
          label="Certifications"
          value={counts.certifications}
          href="/admin/certifications"
          accent="cyan"
        />
        <StatCard
          icon={Wrench}
          label="Skills"
          value={counts.skills}
          href="/admin/skills"
          accent="cyan"
        />
        <StatCard
          icon={Inbox}
          label="Messages"
          value={counts.contact_messages}
          hint={unread > 0 ? `${unread} unread` : "All read"}
          href="/admin/messages"
          accent="violet"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-ink-900/90  p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recent messages</h2>
            <a
              href="/admin/messages"
              className="text-xs font-mono text-accent-blue hover:text-white transition-colors uppercase tracking-wider"
            >
              View all
            </a>
          </div>
          {msgs.length === 0 ? (
            <p className="text-sm text-zinc-500">No messages yet.</p>
          ) : (
            <ul className="space-y-1">
              {msgs.map((m) => (
                <li
                  key={m.id}
                  className="flex items-start justify-between gap-3 rounded-lg p-3 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">
                        {m.name}
                      </span>
                      {!m.is_read && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 truncate">
                      {m.subject ?? m.email}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 whitespace-nowrap">
                    {formatDate(m.created_at, { month: "short", day: "numeric" })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-ink-900/90  p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recently edited</h2>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-zinc-500">Nothing edited yet.</p>
          ) : (
            <ul className="space-y-1">
              {recent.map((r: any) => (
                <li key={r.id}>
                  <a
                    href={r.href}
                    className="flex items-center justify-between gap-3 rounded-lg p-3 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-sm text-white truncate">{r.title}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                        {r.kind} · {r.slug}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 whitespace-nowrap">
                      {formatDate(r.updated_at, { month: "short", day: "numeric" })}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
