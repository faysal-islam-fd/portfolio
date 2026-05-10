import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FormShell } from "@/components/admin/form-shell";
import { CertificationForm } from "@/components/admin/certification-form";
import type { Certification } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <FormShell title={(data as Certification).title} backHref="/admin/certifications">
      <CertificationForm initial={data as Certification} />
    </FormShell>
  );
}
