import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FormShell } from "@/components/admin/form-shell";
import { PublicationForm } from "@/components/admin/publication-form";
import type { Publication } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <FormShell title={(data as Publication).title} backHref="/admin/publications">
      <PublicationForm initial={data as Publication} />
    </FormShell>
  );
}
