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
import { savePost } from "@/app/actions/admin";
import { readingTime, slugify } from "@/lib/utils";
import type { Post, PostStatus } from "@/lib/types";

const DEFAULTS: Partial<Post> = {
  status: "draft",
  is_featured: false,
  reading_minutes: 5,
  tags: [],
  content_mdx: "",
};

export function PostForm({ initial }: { initial?: Partial<Post> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Post>>({ ...DEFAULTS, ...initial });

  const set = <K extends keyof Post>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await savePost({
        id: v.id,
        slug: v.slug ?? "",
        title: v.title ?? "",
        excerpt: v.excerpt ?? null,
        content_mdx: v.content_mdx ?? "",
        cover_image_url: v.cover_image_url ?? null,
        tags: v.tags ?? [],
        reading_minutes: v.reading_minutes ?? readingTime(v.content_mdx ?? ""),
        status: (v.status ?? "draft") as PostStatus,
        is_featured: !!v.is_featured,
        published_at:
          v.status === "published" && !v.published_at
            ? new Date().toISOString()
            : v.published_at ?? null,
      } as any);
      if (res.ok) {
        toast.success("Saved");
        if (!v.id && res.id) router.replace(`/admin/posts/${res.id}`);
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormSection title="Post">
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
            <FormField label="Excerpt">
              <Textarea
                value={v.excerpt ?? ""}
                onChange={(e) => set("excerpt", e.target.value)}
                rows={3}
              />
            </FormField>
            <FormField label="Content (MDX)">
              <MdxEditor
                height={520}
                value={v.content_mdx ?? ""}
                onChange={(val) => {
                  set("content_mdx", val);
                  set("reading_minutes", readingTime(val));
                }}
              />
            </FormField>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Publishing">
            <FormField label="Status">
              <Select
                value={v.status ?? "draft"}
                onValueChange={(val) => set("status", val as PostStatus)}
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
            <FormField label="Reading time (minutes)">
              <Input
                type="number"
                value={v.reading_minutes ?? 5}
                onChange={(e) =>
                  set("reading_minutes", parseInt(e.target.value || "0", 10))
                }
              />
            </FormField>
          </FormSection>
          <FormSection title="Cover & tags">
            <ImageUpload
              bucket="posts"
              label="Cover image"
              value={v.cover_image_url}
              onChange={(url) => set("cover_image_url", url || null)}
            />
            <FormField label="Tags">
              <TagInput
                value={v.tags ?? []}
                onChange={(t) => set("tags", t)}
              />
            </FormField>
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
              <Save className="h-4 w-4" /> Save post
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
