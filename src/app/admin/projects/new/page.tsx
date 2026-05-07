import { FormShell } from "@/components/admin/form-shell";
import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <FormShell
      title="New project"
      backHref="/admin/projects"
      description="Create a new AI / deep learning case study."
    >
      <ProjectForm />
    </FormShell>
  );
}
