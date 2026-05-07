import { FormShell } from "@/components/admin/form-shell";
import { PublicationForm } from "@/components/admin/publication-form";

export default function NewPublicationPage() {
  return (
    <FormShell title="New publication" backHref="/admin/publications">
      <PublicationForm />
    </FormShell>
  );
}
