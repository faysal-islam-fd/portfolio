import { FormShell } from "@/components/admin/form-shell";
import { ExperienceForm } from "@/components/admin/experience-form";

export default function NewExperiencePage() {
  return (
    <FormShell title="New experience" backHref="/admin/experience">
      <ExperienceForm />
    </FormShell>
  );
}
