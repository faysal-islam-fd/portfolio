import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FormShell } from "@/components/admin/form-shell";
import { ResearchForm } from "@/components/admin/research-form";
import type { Research } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditResearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("research")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <FormShell title={(data as Research).title} backHref="/admin/research">
      <ResearchForm initial={data as Research} />
    </FormShell>
  );
}
