import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteAchievement } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { Achievement } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .order("date", { ascending: false });
  const rows = (data ?? []) as Achievement[];

  return (
    <>
      <AdminPageHeader
        title="Achievements"
        description="Awards, recognitions, and competition wins."
        newHref="/admin/achievements/new"
        newLabel="New achievement"
      />
      <DataTable<Achievement>
        rows={rows}
        editHref={(r) => `/admin/achievements/${r.id}`}
        rowAction={(r) => (
          <DeleteButton id={r.id} action={deleteAchievement} />
        )}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (r) => (
              <Link
                href={`/admin/achievements/${r.id}`}
                className="font-medium text-white hover:text-accent-blue transition-colors"
              >
                {r.title}
              </Link>
            ),
          },
          { key: "organization", header: "Organization", cell: (r) => r.organization ?? "—" },
          { key: "date", header: "Date", cell: (r) => (r.date ? formatDate(r.date) : "—") },
        ]}
      />
    </>
  );
}
