import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { StatusPill } from "@/components/admin/status-pill";
import { deletePost } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  const rows = (data ?? []) as Post[];

  return (
    <>
      <AdminPageHeader
        title="Blog posts"
        description="Long-form essays on deep learning and AI engineering."
        newHref="/admin/posts/new"
        newLabel="New post"
      />
      <DataTable<Post>
        rows={rows}
        editHref={(r) => `/admin/posts/${r.id}`}
        rowAction={(r) => (
          <DeleteButton id={r.id} action={async (id) => deletePost(id)} />
        )}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (r) => (
              <div>
                <Link
                  href={`/admin/posts/${r.id}`}
                  className="font-medium text-white hover:text-accent-blue transition-colors"
                >
                  {r.title}
                </Link>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">
                  {r.slug}
                </div>
              </div>
            ),
          },
          {
            key: "status",
            header: "Status",
            cell: (r) => <StatusPill status={r.status} />,
          },
          {
            key: "is_featured",
            header: "Featured",
            cell: (r) => (r.is_featured ? "★" : "—"),
            className: "text-center",
          },
          {
            key: "reading_minutes",
            header: "Read",
            cell: (r) => `${r.reading_minutes} min`,
          },
          {
            key: "updated_at",
            header: "Updated",
            cell: (r) =>
              formatDate(r.updated_at, { month: "short", day: "numeric" }),
          },
        ]}
      />
    </>
  );
}
