import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePublication } from "@/app/actions/admin";
import { PUBLICATION_TYPE_LABELS } from "@/lib/utils";
import type { Publication } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPublicationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("publications")
    .select("*")
    .order("year", { ascending: false })
    .order("display_order", { ascending: true });
  const rows = (data ?? []) as Publication[];

  return (
    <>
      <AdminPageHeader
        title="Publications"
        description="Conference papers, workshops, journals, and preprints."
        newHref="/admin/publications/new"
        newLabel="New publication"
      />
      <DataTable<Publication>
        rows={rows}
        editHref={(r) => `/admin/publications/${r.id}`}
        rowAction={(r) => (
          <DeleteButton id={r.id} action={async (id) => deletePublication(id)} />
        )}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (r) => (
              <div>
                <Link
                  href={`/admin/publications/${r.id}`}
                  className="font-medium text-white hover:text-accent-blue transition-colors"
                >
                  {r.title}
                </Link>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">
                  {r.authors}
                </div>
              </div>
            ),
          },
          { key: "venue", header: "Venue", cell: (r) => r.venue ?? "—" },
          {
            key: "publication_type",
            header: "Type",
            cell: (r) => PUBLICATION_TYPE_LABELS[r.publication_type] ?? r.publication_type,
          },
          { key: "year", header: "Year", className: "text-center" },
        ]}
      />
    </>
  );
}
