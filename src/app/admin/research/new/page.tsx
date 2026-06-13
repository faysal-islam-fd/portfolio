import { FormShell } from "@/components/admin/form-shell";
import { ResearchForm } from "@/components/admin/research-form";

export default function NewServicePage() {
  return (
    <FormShell title="New service" backHref="/admin/research">
      <ResearchForm />
    </FormShell>
  );
}
