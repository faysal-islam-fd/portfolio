"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveAchievement } from "@/app/actions/admin";
import type { Achievement } from "@/lib/types";

const DEFAULTS: Partial<Achievement> = { display_order: 0 };

export function AchievementForm({ initial }: { initial?: Partial<Achievement> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Achievement>>({ ...DEFAULTS, ...initial });
  const set = <K extends keyof Achievement>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveAchievement({
        id: v.id,
        title: v.title ?? "",
        organization: v.organization ?? null,
        date: v.date ?? null,
        description: v.description ?? null,
        url: v.url ?? null,
        icon: v.icon ?? null,
        display_order: v.display_order ?? 0,
      });
      if (res.ok) {
        toast.success("Saved");
        if (!v.id && res.id) router.replace(`/admin/achievements/${res.id}`);
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FormSection title="Achievement">
        <FormField label="Title">
          <Input
            value={v.title ?? ""}
            onChange={(e) => set("title", e.target.value)}
            required
          />
        </FormField>
        <FormField label="Organization">
          <Input
            value={v.organization ?? ""}
            onChange={(e) => set("organization", e.target.value)}
          />
        </FormField>
        <FormField label="Date">
          <Input
            type="date"
            value={v.date ?? ""}
            onChange={(e) => set("date", e.target.value || null)}
          />
        </FormField>
        <FormField label="Description">
          <Textarea
            value={v.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
          />
        </FormField>
      </FormSection>

      <FormSection title="Meta">
        <FormField label="URL">
          <Input
            value={v.url ?? ""}
            onChange={(e) => set("url", e.target.value)}
            placeholder="https://…"
          />
        </FormField>
        <FormField label="Icon">
          <Input
            value={v.icon ?? ""}
            onChange={(e) => set("icon", e.target.value)}
            placeholder="trophy"
          />
        </FormField>
        <FormField label="Display order">
          <Input
            type="number"
            value={v.display_order ?? 0}
            onChange={(e) =>
              set("display_order", parseInt(e.target.value || "0", 10))
            }
          />
        </FormField>
        <div className="pt-2">
          <Button type="submit" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save achievement
              </>
            )}
          </Button>
        </div>
      </FormSection>
    </form>
  );
}
