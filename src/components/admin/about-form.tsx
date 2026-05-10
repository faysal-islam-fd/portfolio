"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/image-upload";
import { TagInput } from "@/components/admin/tag-input";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveAbout } from "@/app/actions/admin";
import type { About } from "@/lib/types";

export function AboutForm({ initial }: { initial?: Partial<About> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<About>>(initial ?? { highlights: [] });
  const set = <K extends keyof About>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveAbout({
        id: v.id,
        full_name: v.full_name ?? "",
        short_bio: v.short_bio ?? null,
        long_bio: v.long_bio ?? null,
        research_focus: v.research_focus ?? null,
        current_role: v.current_role ?? null,
        location: v.location ?? null,
        profile_image_url: v.profile_image_url ?? null,
        resume_url: v.resume_url ?? null,
        highlights: v.highlights ?? [],
      });
      if (res.ok) {
        toast.success("Saved");
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormSection title="Identity">
            <FormField label="Full name">
              <Input
                value={v.full_name ?? ""}
                onChange={(e) => set("full_name", e.target.value)}
                required
              />
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label="Current role">
                <Input
                  value={v.current_role ?? ""}
                  onChange={(e) => set("current_role", e.target.value)}
                />
              </FormField>
              <FormField label="Location">
                <Input
                  value={v.location ?? ""}
                  onChange={(e) => set("location", e.target.value)}
                />
              </FormField>
            </div>
            <FormField label="Research focus">
              <Input
                value={v.research_focus ?? ""}
                onChange={(e) => set("research_focus", e.target.value)}
                placeholder="Vision Transformers · Self-Supervised Learning"
              />
            </FormField>
          </FormSection>
          <FormSection title="Bio">
            <FormField label="Short bio (1 line)">
              <Textarea
                value={v.short_bio ?? ""}
                onChange={(e) => set("short_bio", e.target.value)}
                rows={2}
              />
            </FormField>
            <FormField label="Long bio">
              <Textarea
                value={v.long_bio ?? ""}
                onChange={(e) => set("long_bio", e.target.value)}
                rows={6}
              />
            </FormField>
            <FormField label="Highlights">
              <TagInput
                value={v.highlights ?? []}
                onChange={(t) => set("highlights", t)}
                placeholder="One bullet per tag"
              />
            </FormField>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Profile photo">
            <ImageUpload
              bucket="avatars"
              label="Photo"
              value={v.profile_image_url}
              onChange={(url) => set("profile_image_url", url || null)}
            />
          </FormSection>
          <FormSection title="Resume">
            <ImageUpload
              bucket="resumes"
              label="Resume PDF"
              value={v.resume_url}
              onChange={(url) => set("resume_url", url || null)}
            />
          </FormSection>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 sm:-mx-8 mt-8 px-5 sm:px-8 py-4 border-t border-white/[0.06] bg-ink-950/95  flex items-center justify-end gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save about
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
