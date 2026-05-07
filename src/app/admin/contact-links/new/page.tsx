import { FormShell } from "@/components/admin/form-shell";
import { ContactLinkForm } from "@/components/admin/contact-link-form";

export default function NewContactLinkPage() {
  return (
    <FormShell title="New contact link" backHref="/admin/contact-links">
      <ContactLinkForm />
    </FormShell>
  );
}
