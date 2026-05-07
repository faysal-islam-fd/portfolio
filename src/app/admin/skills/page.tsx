import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteSkill } from "@/app/actions/admin";
import { SKILL_CATEGORY_LABELS } from "@/lib/utils";
import type { Skill } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });
  const rows = (data ?? []) as Skill[];

  return (
    <>
      <AdminPageHeader
        title="Skills"
        description="The deep learning toolbox."
        newHref="/admin/skills/new"
        newLabel="New skill"
      />
      <DataTable<Skill>
        rows={rows}
        editHref={(r) => `/admin/skills/${r.id}`}
        rowAction={(r) => (
          <DeleteButton id={r.id} action={deleteSkill} />
        )}
        columns={[
          {
            key: "name",
            header: "Name",
            cell: (r) => (
              <Link
                href={`/admin/skills/${r.id}`}
                className="font-medium text-white hover:text-accent-blue transition-colors"
              >
                {r.name}
              </Link>
            ),
          },
          {
            key: "category",
            header: "Category",
            cell: (r) => SKILL_CATEGORY_LABELS[r.category] ?? r.category,
          },
          {
            key: "proficiency",
            header: "Proficiency",
            cell: (r) => (
              <div className="flex items-center gap-2 max-w-[200px]">
                <div className="h-1 flex-1 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-blue to-accent-indigo"
                    style={{ width: `${r.proficiency}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-zinc-400 tabular-nums">
                  {r.proficiency}%
                </span>
              </div>
            ),
          },
          {
            key: "is_featured",
            header: "Featured",
            cell: (r) => (r.is_featured ? "★" : "—"),
            className: "text-center",
          },
        ]}
      />
    </>
  );
}
