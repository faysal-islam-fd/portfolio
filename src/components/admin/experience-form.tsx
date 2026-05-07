"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/admin/tag-input";
import { ImageUpload } from "@/components/admin/image-upload";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveExperience } from "@/app/actions/admin";
import type { Experience, ExperienceType } from "@/lib/types";

const DEFAULTS: Partial<Experience> = {
  experience_type: "work",
  is_current: false,
  display_order: 0,
  highlights: [],
  technologies: [],
};

export function ExperienceForm({ initial }: { initial?: Partial<Experience> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Experience>>({ ...DEFAULTS, ...initial });
  const set = <K extends keyof Experience>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveExperience({
        id: v.id,
        organization: v.organization ?? "",
        role: v.role ?? "",
        experience_type: (v.experience_type ?? "work") as ExperienceType,
        location: v.location ?? null,
        start_date: v.start_date ?? "",
        end_date: v.end_date ?? null,
        is_current: !!v.is_current,
        description: v.description ?? null,
        highlights: v.highlights ?? [],
        technologies: v.technologies ?? [],
        logo_url: v.logo_url ?? null,
        display_order: v.display_order ?? 0,
      });
      if (res.ok) {
        toast.success("Saved");
        if (!v.id && res.id) router.replace(`/admin/experience/${res.id}`);
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormSection title="Position">
            <FormField label="Role">
              <Input
                value={v.role ?? ""}
                onChange={(e) => set("role", e.target.value)}
                placeholder="Senior AI Researcher"
                required
              />
            </FormField>
            <FormField label="Organization">
              <Input
                value={v.organization ?? ""}
                onChange={(e) => set("organization", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Location">
              <Input
                value={v.location ?? ""}
                onChange={(e) => set("location", e.target.value)}
              />
            </FormField>
            <FormField label="Description">
              <Textarea
                value={v.description ?? ""}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
              />
            </FormField>
            <FormField label="Highlights">
              <TagInput
                value={v.highlights ?? []}
                onChange={(t) => set("highlights", t)}
                placeholder="One bullet per tag"
              />
            </FormField>
            <FormField label="Technologies">
              <TagInput
                value={v.technologies ?? []}
                onChange={(t) => set("technologies", t)}
              />
            </FormField>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Type & dates">
            <FormField label="Type">
              <Select
                value={v.experience_type ?? "work"}
                onValueChange={(val) => set("experience_type", val as ExperienceType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="fellowship">Fellowship</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Start date">
              <Input
                type="date"
                value={v.start_date ?? ""}
                onChange={(e) => set("start_date", e.target.value)}
                required
              />
            </FormField>
            <FormField label="End date">
              <Input
                type="date"
                value={v.end_date ?? ""}
                onChange={(e) => set("end_date", e.target.value || null)}
                disabled={!!v.is_current}
              />
            </FormField>
            <div className="flex items-center justify-between">
              <Label htmlFor="current">Currently here</Label>
              <Switch
                id="current"
                checked={!!v.is_current}
                onCheckedChange={(c) => {
                  set("is_current", c);
                  if (c) set("end_date", null);
                }}
              />
            </div>
            <FormField label="Display order">
              <Input
                type="number"
                value={v.display_order ?? 0}
                onChange={(e) => set("display_order", parseInt(e.target.value || "0", 10))}
              />
            </FormField>
          </FormSection>
          <FormSection title="Logo">
            <ImageUpload
              bucket="site"
              label="Organization logo"
              value={v.logo_url}
              onChange={(url) => set("logo_url", url || null)}
            />
          </FormSection>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 sm:-mx-8 mt-8 px-5 sm:px-8 py-4 border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl flex items-center justify-end gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save experience
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
