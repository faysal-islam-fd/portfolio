import { createServiceClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { MessageActions } from "@/components/admin/message-actions";
import { formatDate } from "@/lib/utils";
import type { ContactMessage } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as ContactMessage[];

  const unread = rows.filter((r) => !r.is_read).length;

  return (
    <>
      <AdminPageHeader
        title="Messages"
        description={
          rows.length === 0
            ? "No messages yet."
            : `${rows.length} total · ${unread} unread`
        }
      />

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center">
          <p className="text-sm text-zinc-500">
            Submissions from the public contact form will land here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((m) => (
            <article
              key={m.id}
              className={
                "rounded-2xl border bg-ink-900/90  p-5 transition-colors " +
                (m.is_read
                  ? "border-white/[0.06]"
                  : "border-accent-blue/30 shadow-glow-sm")
              }
            >
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    {!m.is_read && (
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    )}
                    <span className="font-semibold text-white">{m.name}</span>
                    <a
                      href={`mailto:${m.email}`}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      &lt;{m.email}&gt;
                    </a>
                  </div>
                  {m.subject && (
                    <p className="mt-1 text-sm text-zinc-300">{m.subject}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {formatDate(m.created_at, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="mt-2">
                    <MessageActions id={m.id} isRead={m.is_read} />
                  </div>
                </div>
              </header>
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {m.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
