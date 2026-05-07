import { FormShell } from "@/components/admin/form-shell";
import { ResearchForm } from "@/components/admin/research-form";

export default function NewResearchPage() {
  return (
    <FormShell title="New research" backHref="/admin/research">
      <ResearchForm />
    </FormShell>
  );
}
