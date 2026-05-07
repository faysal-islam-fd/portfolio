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
import { MdxEditor } from "@/components/admin/mdx-editor";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveResearch } from "@/app/actions/admin";
import { slugify } from "@/lib/utils";
import type { Research, ResearchStatus } from "@/lib/types";

const DEFAULTS: Partial<Research> = {
  status: "in_progress",
  is_featured: false,
  display_order: 0,
  collaborators: [],
  keywords: [],
};

export function ResearchForm({ initial }: { initial?: Partial<Research> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Research>>({ ...DEFAULTS, ...initial });

  const set = <K extends keyof Research>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveResearch({
        id: v.id,
        slug: v.slug ?? "",
        title: v.title ?? "",
        abstract: v.abstract ?? null,
        problem_statement: v.problem_statement ?? null,
        methodology: v.methodology ?? null,
        results: v.results ?? null,
        content_mdx: v.content_mdx ?? null,
        thumbnail_url: v.thumbnail_url ?? null,
        diagram_url: v.diagram_url ?? null,
        collaborators: v.collaborators ?? [],
        keywords: v.keywords ?? [],
        status: (v.status ?? "in_progress") as ResearchStatus,
        start_date: v.start_date ?? null,
        end_date: v.end_date ?? null,
        external_url: v.external_url ?? null,
        is_featured: !!v.is_featured,
        display_order: v.display_order ?? 0,
      });
      if (res.ok) {
        toast.success("Saved");
        if (!v.id && res.id) router.replace(`/admin/research/${res.id}`);
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormSection title="Basics">
            <FormField label="Title">
              <Input
                value={v.title ?? ""}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!v.id && (!v.slug || v.slug === slugify(v.title ?? ""))) {
                    set("slug", slugify(e.target.value));
                  }
                }}
                required
              />
            </FormField>
            <FormField label="Slug">
              <Input
                value={v.slug ?? ""}
                onChange={(e) => set("slug", slugify(e.target.value))}
                required
              />
            </FormField>
            <FormField label="Abstract">
              <Textarea
                value={v.abstract ?? ""}
                onChange={(e) => set("abstract", e.target.value)}
                rows={4}
              />
            </FormField>
          </FormSection>

          <FormSection title="Investigation">
            <FormField label="Problem statement">
              <Textarea
                value={v.problem_statement ?? ""}
                onChange={(e) => set("problem_statement", e.target.value)}
                rows={3}
              />
            </FormField>
            <FormField label="Methodology">
              <Textarea
                value={v.methodology ?? ""}
                onChange={(e) => set("methodology", e.target.value)}
                rows={4}
              />
            </FormField>
            <FormField label="Results">
              <Textarea
                value={v.results ?? ""}
                onChange={(e) => set("results", e.target.value)}
                rows={4}
              />
            </FormField>
            <FormField label="Long-form content (MDX)">
              <MdxEditor
                value={v.content_mdx ?? ""}
                onChange={(val) => set("content_mdx", val)}
              />
            </FormField>
          </FormSection>

          <FormSection title="Media">
            <ImageUpload
              bucket="research"
              label="Thumbnail"
              value={v.thumbnail_url}
              onChange={(url) => set("thumbnail_url", url || null)}
            />
            <ImageUpload
              bucket="research"
              label="Architecture diagram"
              value={v.diagram_url}
              onChange={(url) => set("diagram_url", url || null)}
            />
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Status">
            <FormField label="Status">
              <Select
                value={v.status ?? "in_progress"}
                onValueChange={(val) => set("status", val as ResearchStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="under_review">Under review</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Start">
                <Input
                  type="date"
                  value={v.start_date ?? ""}
                  onChange={(e) => set("start_date", e.target.value || null)}
                />
              </FormField>
              <FormField label="End">
                <Input
                  type="date"
                  value={v.end_date ?? ""}
                  onChange={(e) => set("end_date", e.target.value || null)}
                />
              </FormField>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Featured</Label>
              <Switch
                id="featured"
                checked={!!v.is_featured}
                onCheckedChange={(c) => set("is_featured", c)}
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

          <FormSection title="Metadata">
            <FormField label="Collaborators">
              <TagInput
                value={v.collaborators ?? []}
                onChange={(t) => set("collaborators", t)}
              />
            </FormField>
            <FormField label="Keywords">
              <TagInput
                value={v.keywords ?? []}
                onChange={(t) => set("keywords", t)}
              />
            </FormField>
            <FormField label="External URL">
              <Input
                value={v.external_url ?? ""}
                onChange={(e) => set("external_url", e.target.value)}
                placeholder="https://…"
              />
            </FormField>
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
              <Save className="h-4 w-4" /> Save research
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
