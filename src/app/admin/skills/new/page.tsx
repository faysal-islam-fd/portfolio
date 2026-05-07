import { FormShell } from "@/components/admin/form-shell";
import { SkillForm } from "@/components/admin/skill-form";

export default function NewSkillPage() {
  return (
    <FormShell title="New skill" backHref="/admin/skills">
      <SkillForm />
    </FormShell>
  );
}
