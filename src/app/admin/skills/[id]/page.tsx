import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FormShell } from "@/components/admin/form-shell";
import { SkillForm } from "@/components/admin/skill-form";
import type { Skill } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <FormShell title={(data as Skill).name} backHref="/admin/skills">
      <SkillForm initial={data as Skill} />
    </FormShell>
  );
}
