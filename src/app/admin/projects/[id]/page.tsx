import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FormShell } from "@/components/admin/form-shell";
import { ProjectForm } from "@/components/admin/project-form";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  return (
    <FormShell
      title={(data as Project).title}
      backHref="/admin/projects"
      description="Edit this project."
    >
      <ProjectForm initial={data as Project} />
    </FormShell>
  );
}
