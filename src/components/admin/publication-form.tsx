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
import { FormSection, FormField } from "@/components/admin/form-shell";
import { savePublication } from "@/app/actions/admin";
import type { Publication, PublicationType } from "@/lib/types";

const DEFAULTS: Partial<Publication> = {
  publication_type: "conference",
  year: new Date().getFullYear(),
  citation_count: 0,
  is_featured: false,
  display_order: 0,
};

export function PublicationForm({ initial }: { initial?: Partial<Publication> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Publication>>({ ...DEFAULTS, ...initial });
  const set = <K extends keyof Publication>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await savePublication({
        id: v.id,
        title: v.title ?? "",
        authors: v.authors ?? "",
        venue: v.venue ?? null,
        publication_type: (v.publication_type ?? "conference") as PublicationType,
        year: v.year ?? new Date().getFullYear(),
        abstract: v.abstract ?? null,
        pdf_url: v.pdf_url ?? null,
        arxiv_url: v.arxiv_url ?? null,
        doi: v.doi ?? null,
        bibtex: v.bibtex ?? null,
        citation_count: v.citation_count ?? 0,
        is_featured: !!v.is_featured,
        display_order: v.display_order ?? 0,
      });
      if (res.ok) {
        toast.success("Saved");
        if (!v.id && res.id) router.replace(`/admin/publications/${res.id}`);
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormSection title="Paper">
            <FormField label="Title">
              <Input
                value={v.title ?? ""}
                onChange={(e) => set("title", e.target.value)}
                required
              />
            </FormField>
            <FormField label="Authors">
              <Input
                value={v.authors ?? ""}
                onChange={(e) => set("authors", e.target.value)}
                placeholder="A. Researcher, B. Collaborator"
                required
              />
            </FormField>
            <FormField label="Venue">
              <Input
                value={v.venue ?? ""}
                onChange={(e) => set("venue", e.target.value)}
                placeholder="CVPR 2025"
              />
            </FormField>
            <FormField label="Abstract">
              <Textarea
                value={v.abstract ?? ""}
                onChange={(e) => set("abstract", e.target.value)}
                rows={5}
              />
            </FormField>
            <FormField label="BibTeX">
              <Textarea
                className="font-mono text-xs"
                value={v.bibtex ?? ""}
                onChange={(e) => set("bibtex", e.target.value)}
                rows={6}
              />
            </FormField>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Type & dates">
            <FormField label="Type">
              <Select
                value={v.publication_type ?? "conference"}
                onValueChange={(val) => set("publication_type", val as PublicationType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="journal">Journal</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="preprint">Preprint</SelectItem>
                  <SelectItem value="thesis">Thesis</SelectItem>
                  <SelectItem value="book_chapter">Book chapter</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Year">
              <Input
                type="number"
                value={v.year ?? new Date().getFullYear()}
                onChange={(e) => set("year", parseInt(e.target.value || "0", 10))}
              />
            </FormField>
            <FormField label="Citations">
              <Input
                type="number"
                value={v.citation_count ?? 0}
                onChange={(e) =>
                  set("citation_count", parseInt(e.target.value || "0", 10))
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
          </FormSection>
          <FormSection title="Links">
            <FormField label="PDF URL">
              <Input
                value={v.pdf_url ?? ""}
                onChange={(e) => set("pdf_url", e.target.value)}
              />
            </FormField>
            <FormField label="arXiv URL">
              <Input
                value={v.arxiv_url ?? ""}
                onChange={(e) => set("arxiv_url", e.target.value)}
              />
            </FormField>
            <FormField label="DOI">
              <Input
                value={v.doi ?? ""}
                onChange={(e) => set("doi", e.target.value)}
                placeholder="10.1109/…"
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
              <Save className="h-4 w-4" /> Save publication
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
