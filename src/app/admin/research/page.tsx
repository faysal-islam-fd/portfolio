import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { StatusPill } from "@/components/admin/status-pill";
import { deleteResearch } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { Research } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminResearchPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("research")
    .select("*")
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false });
  const rows = (data ?? []) as Research[];

  return (
    <>
      <AdminPageHeader
        title="Research"
        description="Active investigations, thesis work, and accepted contributions."
        newHref="/admin/research/new"
        newLabel="New research"
      />
      <DataTable<Research>
        rows={rows}
        editHref={(r) => `/admin/research/${r.id}`}
        rowAction={(r) => (
          <DeleteButton id={r.id} action={async (id) => deleteResearch(id)} />
        )}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (r) => (
              <div>
                <Link
                  href={`/admin/research/${r.id}`}
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
