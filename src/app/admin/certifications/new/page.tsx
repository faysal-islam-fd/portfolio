import { FormShell } from "@/components/admin/form-shell";
import { CertificationForm } from "@/components/admin/certification-form";

export default function NewCertificationPage() {
  return (
    <FormShell title="New certification" backHref="/admin/certifications">
      <CertificationForm />
    </FormShell>
  );
}
