import { FormShell } from "@/components/admin/form-shell";
import { AchievementForm } from "@/components/admin/achievement-form";

export default function NewAchievementPage() {
  return (
    <FormShell title="New achievement" backHref="/admin/achievements">
      <AchievementForm />
    </FormShell>
  );
}
