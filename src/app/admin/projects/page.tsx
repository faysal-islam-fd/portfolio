import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { StatusPill } from "@/components/admin/status-pill";
import { deleteProject } from "@/app/actions/admin";
import { PROJECT_TYPE_LABELS, formatDate } from "@/lib/utils";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false });
  const rows = (data ?? []) as Project[];

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description="Deep learning case studies and engineering work."
        newHref="/admin/projects/new"
        newLabel="New project"
      />
      <DataTable<Project>
        rows={rows}
        editHref={(r) => `/admin/projects/${r.id}`}
        rowAction={(r) => (
          <DeleteButton id={r.id} action={deleteProject} />
        )}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (r) => (
              <div>
                <Link
                  href={`/admin/projects/${r.id}`}
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
            key: "project_type",
            header: "Type",
            cell: (r) => (
              <span className="text-xs text-zinc-300">
                {PROJECT_TYPE_LABELS[r.project_type] ?? r.project_type}
              </span>
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
            key: "updated_at",
            header: "Updated",
            cell: (r) =>
              formatDate(r.updated_at, { month: "short", day: "numeric", year: "numeric" }),
          },
        ]}
      />
    </>
  );
}
