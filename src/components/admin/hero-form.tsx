"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/admin/tag-input";
import { MetricsInput } from "@/components/admin/metrics-input";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveHero } from "@/app/actions/admin";
import type { Hero, Metric } from "@/lib/types";

export function HeroForm({ initial }: { initial?: Partial<Hero> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Hero>>(initial ?? {});
  const set = <K extends keyof Hero>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveHero({
        id: v.id,
        eyebrow: v.eyebrow ?? null,
        headline: v.headline ?? "",
        subheadline: v.subheadline ?? null,
        rotating_titles: v.rotating_titles ?? [],
        cta_primary_label: v.cta_primary_label ?? null,
        cta_primary_href: v.cta_primary_href ?? null,
        cta_secondary_label: v.cta_secondary_label ?? null,
        cta_secondary_href: v.cta_secondary_href ?? null,
        metrics: (v.metrics ?? []) as Metric[],
      });
      if (res.ok) {
        toast.success("Saved");
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSection title="Hero copy">
          <FormField label="Eyebrow">
            <Input
              value={v.eyebrow ?? ""}
              onChange={(e) => set("eyebrow", e.target.value)}
              placeholder="Open for collaborations · 2026"
            />
          </FormField>
          <FormField label="Headline">
            <Textarea
              value={v.headline ?? ""}
              onChange={(e) => set("headline", e.target.value)}
              rows={3}
              required
              placeholder="Building intelligent systems that see, reason, and learn."
            />
          </FormField>
          <FormField label="Subheadline">
            <Textarea
              value={v.subheadline ?? ""}
              onChange={(e) => set("subheadline", e.target.value)}
              rows={3}
            />
          </FormField>
          <FormField
            label="Rotating titles"
            hint="Used by the typewriter animation"
          >
            <TagInput
              value={v.rotating_titles ?? []}
              onChange={(t) => set("rotating_titles", t)}
            />
          </FormField>
        </FormSection>

        <FormSection title="Calls to action">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Primary label">
              <Input
                value={v.cta_primary_label ?? ""}
                onChange={(e) => set("cta_primary_label", e.target.value)}
                placeholder="View Research"
              />
            </FormField>
            <FormField label="Primary href">
              <Input
                value={v.cta_primary_href ?? ""}
                onChange={(e) => set("cta_primary_href", e.target.value)}
                placeholder="/research"
              />
            </FormField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Secondary label">
              <Input
                value={v.cta_secondary_label ?? ""}
                onChange={(e) => set("cta_secondary_label", e.target.value)}
              />
            </FormField>
            <FormField label="Secondary href">
              <Input
                value={v.cta_secondary_href ?? ""}
                onChange={(e) => set("cta_secondary_href", e.target.value)}
              />
            </FormField>
          </div>
          <MetricsInput
            value={(v.metrics ?? []) as Metric[]}
            onChange={(m) => set("metrics", m as any)}
          />
        </FormSection>
      </div>

      <div className="sticky bottom-0 -mx-5 sm:-mx-8 mt-8 px-5 sm:px-8 py-4 border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl flex items-center justify-end gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save hero
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
