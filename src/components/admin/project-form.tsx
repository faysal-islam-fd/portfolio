"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Eye, Loader2 } from "lucide-react";
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
import { MetricsInput } from "@/components/admin/metrics-input";
import { MdxEditor } from "@/components/admin/mdx-editor";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveProject } from "@/app/actions/admin";
import { slugify } from "@/lib/utils";
import type { Project, ProjectStatus, ProjectType, Metric } from "@/lib/types";

const DEFAULTS: Partial<Project> = {
  status: "draft",
  project_type: "research",
  is_featured: false,
  display_order: 0,
  tags: [],
  datasets: [],
  models: [],
  gallery_urls: [],
  metrics: [],
};

export function ProjectForm({ initial }: { initial?: Partial<Project> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Project>>({ ...DEFAULTS, ...initial });

  const set = <K extends keyof Project>(k: K, val: Project[K] | any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveProject({
        id: v.id,
        slug: v.slug ?? "",
        title: v.title ?? "",
        tagline: v.tagline ?? null,
        description: v.description ?? null,
        problem: v.problem ?? null,
        approach: v.approach ?? null,
        results: v.results ?? null,
        content_mdx: v.content_mdx ?? null,
        cover_image_url: v.cover_image_url ?? null,
        architecture_image_url: v.architecture_image_url ?? null,
        gallery_urls: v.gallery_urls ?? [],
        tags: v.tags ?? [],
        datasets: v.datasets ?? [],
        models: v.models ?? [],
        metrics: (v.metrics ?? []) as Metric[],
        github_url: v.github_url ?? null,
        demo_url: v.demo_url ?? null,
        paper_url: v.paper_url ?? null,
        project_type: (v.project_type ?? "research") as ProjectType,
        status: (v.status ?? "draft") as ProjectStatus,
        is_featured: !!v.is_featured,
        display_order: v.display_order ?? 0,
      });
      if (res.ok) {
        toast.success("Saved");
        if (!v.id && res.id) router.replace(`/admin/projects/${res.id}`);
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
                placeholder="ViT for medical imaging"
                required
              />
            </FormField>
            <FormField label="Slug" hint="URL identifier (lowercase, dashes only)">
              <Input
                value={v.slug ?? ""}
                onChange={(e) => set("slug", slugify(e.target.value))}
                placeholder="vit-medical-imaging"
                required
              />
            </FormField>
            <FormField label="Tagline">
              <Input
                value={v.tagline ?? ""}
                onChange={(e) => set("tagline", e.target.value)}
                placeholder="One-line pitch shown on the card"
              />
            </FormField>
            <FormField label="Short description">
              <Textarea
                value={v.description ?? ""}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
              />
            </FormField>
          </FormSection>

          <FormSection title="Case study">
            <FormField label="Problem">
              <Textarea
                value={v.problem ?? ""}
                onChange={(e) => set("problem", e.target.value)}
                rows={4}
              />
            </FormField>
            <FormField label="Approach">
              <Textarea
                value={v.approach ?? ""}
                onChange={(e) => set("approach", e.target.value)}
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
              bucket="projects"
              label="Cover image"
              value={v.cover_image_url}
              onChange={(url) => set("cover_image_url", url || null)}
            />
            <ImageUpload
              bucket="projects"
              label="Architecture diagram"
              value={v.architecture_image_url}
              onChange={(url) => set("architecture_image_url", url || null)}
            />
            <FormField label="Gallery URLs (one per tag)">
              <TagInput
                value={v.gallery_urls ?? []}
                onChange={(urls) => set("gallery_urls", urls)}
                placeholder="Paste image URL and Enter"
              />
            </FormField>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Status">
            <FormField label="Project type">
              <Select
                value={v.project_type ?? "research"}
                onValueChange={(val) => set("project_type", val as ProjectType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="computer_vision">Computer Vision</SelectItem>
                  <SelectItem value="nlp">NLP</SelectItem>
                  <SelectItem value="multimodal">Multimodal</SelectItem>
                  <SelectItem value="reinforcement_learning">RL</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Status">
              <Select
                value={v.status ?? "draft"}
                onValueChange={(val) => set("status", val as ProjectStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
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
                onChange={(e) =>
                  set("display_order", parseInt(e.target.value || "0", 10))
                }
              />
            </FormField>
          </FormSection>

          <FormSection title="Links">
            <FormField label="GitHub URL">
              <Input
                value={v.github_url ?? ""}
                onChange={(e) => set("github_url", e.target.value)}
                placeholder="https://github.com/…"
              />
            </FormField>
            <FormField label="Demo URL">
              <Input
                value={v.demo_url ?? ""}
                onChange={(e) => set("demo_url", e.target.value)}
                placeholder="https://…"
              />
            </FormField>
            <FormField label="Paper URL">
              <Input
                value={v.paper_url ?? ""}
                onChange={(e) => set("paper_url", e.target.value)}
                placeholder="https://arxiv.org/…"
              />
            </FormField>
          </FormSection>

          <FormSection title="Metadata">
            <FormField label="Tags">
              <TagInput
                value={v.tags ?? []}
                onChange={(t) => set("tags", t)}
              />
            </FormField>
            <FormField label="Datasets">
              <TagInput
                value={v.datasets ?? []}
                onChange={(t) => set("datasets", t)}
              />
            </FormField>
            <FormField label="Models">
              <TagInput
                value={v.models ?? []}
                onChange={(t) => set("models", t)}
              />
            </FormField>
            <MetricsInput
              value={(v.metrics ?? []) as Metric[]}
              onChange={(m) => set("metrics", m as any)}
            />
          </FormSection>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 sm:-mx-8 mt-8 px-5 sm:px-8 py-4 border-t border-white/[0.06] bg-ink-950/95  flex items-center justify-end gap-2">
        {v.slug && v.status === "published" && (
          <Button asChild variant="outline">
            <a href={`/projects/${v.slug}`} target="_blank" rel="noreferrer">
              <Eye className="h-4 w-4" /> Preview
            </a>
          </Button>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save project
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
