import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCertification } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { Certification } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .order("display_order", { ascending: true });
  const rows = (data ?? []) as Certification[];

  return (
    <>
      <AdminPageHeader
        title="Certifications"
        description="Professional certifications and credentials."
        newHref="/admin/certifications/new"
        newLabel="New certification"
      />
      <DataTable<Certification>
        rows={rows}
        editHref={(r) => `/admin/certifications/${r.id}`}
        rowAction={(r) => (
          <DeleteButton id={r.id} action={deleteCertification} />
        )}
        columns={[
          {
            key: "title",
            header: "Title",
            cell: (r) => (
              <Link
                href={`/admin/certifications/${r.id}`}
                className="font-medium text-white hover:text-accent-blue transition-colors"
              >
                {r.title}
              </Link>
            ),
          },
          { key: "issuer", header: "Issuer", cell: (r) => r.issuer },
          {
            key: "issue_date",
            header: "Issued",
            cell: (r) => (r.issue_date ? formatDate(r.issue_date) : "—"),
          },
        ]}
      />
    </>
  );
}
