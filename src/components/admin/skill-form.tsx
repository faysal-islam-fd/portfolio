"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveSkill } from "@/app/actions/admin";
import { SKILL_CATEGORY_LABELS } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/lib/types";

const DEFAULTS: Partial<Skill> = {
  category: "deep_learning",
  proficiency: 80,
  is_featured: false,
  display_order: 0,
};

export function SkillForm({ initial }: { initial?: Partial<Skill> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Skill>>({ ...DEFAULTS, ...initial });
  const set = <K extends keyof Skill>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveSkill({
        id: v.id,
        name: v.name ?? "",
        category: (v.category ?? "deep_learning") as SkillCategory,
        proficiency: v.proficiency ?? 80,
        icon: v.icon ?? null,
        display_order: v.display_order ?? 0,
        is_featured: !!v.is_featured,
      });
      if (res.ok) {
        toast.success("Saved");
        if (!v.id && res.id) router.replace(`/admin/skills/${res.id}`);
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FormSection title="Skill">
        <FormField label="Name">
          <Input
            value={v.name ?? ""}
            onChange={(e) => set("name", e.target.value)}
            required
          />
        </FormField>
        <FormField label="Category">
          <Select
            value={v.category ?? "deep_learning"}
            onValueChange={(val) => set("category", val as SkillCategory)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SKILL_CATEGORY_LABELS).map(([k, label]) => (
                <SelectItem key={k} value={k}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Icon (optional)">
          <Input
            value={v.icon ?? ""}
            onChange={(e) => set("icon", e.target.value)}
            placeholder="lucide icon name"
          />
        </FormField>
      </FormSection>
      <FormSection title="Settings">
        <FormField label={`Proficiency: ${v.proficiency ?? 80}%`}>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={v.proficiency ?? 80}
            onChange={(e) =>
              set("proficiency", parseInt(e.target.value || "0", 10))
            }
            className="w-full accent-accent-blue"
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
        <div className="flex items-center justify-between">
          <Label htmlFor="featured">Featured</Label>
          <Switch
            id="featured"
            checked={!!v.is_featured}
            onCheckedChange={(c) => set("is_featured", c)}
          />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save skill
              </>
            )}
          </Button>
        </div>
      </FormSection>
    </form>
  );
}
