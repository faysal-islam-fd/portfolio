import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteExperience } from "@/app/actions/admin";
import { formatDateRange } from "@/lib/utils";
import type { Experience } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false });
  const rows = (data ?? []) as Experience[];

  return (
    <>
      <AdminPageHeader
        title="Experience"
        description="Work, research, education and fellowships."
        newHref="/admin/experience/new"
        newLabel="New entry"
      />
      <DataTable<Experience>
        rows={rows}
        editHref={(r) => `/admin/experience/${r.id}`}
        rowAction={(r) => (
          <DeleteButton id={r.id} action={deleteExperience} />
        )}
        columns={[
          {
            key: "role",
            header: "Role",
            cell: (r) => (
              <div>
                <Link
                  href={`/admin/experience/${r.id}`}
                  className="font-medium text-white hover:text-accent-blue transition-colors"
                >
                  {r.role}
                </Link>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">
                  {r.organization}
                </div>
              </div>
            ),
          },
          { key: "experience_type", header: "Type" },
          {
            key: "start_date",
            header: "Period",
            cell: (r) => formatDateRange(r.start_date, r.end_date, r.is_current),
          },
        ]}
      />
    </>
  );
}
