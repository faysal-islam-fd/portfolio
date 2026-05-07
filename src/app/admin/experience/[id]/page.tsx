import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FormShell } from "@/components/admin/form-shell";
import { ExperienceForm } from "@/components/admin/experience-form";
import type { Experience } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <FormShell
      title={`${(data as Experience).role}`}
      backHref="/admin/experience"
    >
      <ExperienceForm initial={data as Experience} />
    </FormShell>
  );
}
