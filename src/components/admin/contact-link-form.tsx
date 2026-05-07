"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveContactLink } from "@/app/actions/admin";
import type { ContactLink } from "@/lib/types";

const ICON_OPTIONS = [
  "github", "linkedin", "twitter", "x", "mail", "scholar", "huggingface", "website",
];

export function ContactLinkForm({ initial }: { initial?: Partial<ContactLink> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<ContactLink>>({
    display_order: 0,
    ...initial,
  });
  const set = <K extends keyof ContactLink>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveContactLink({
        id: v.id,
        label: v.label ?? "",
        href: v.href ?? "",
        icon: v.icon ?? null,
        display_order: v.display_order ?? 0,
      });
      if (res.ok) {
        toast.success("Saved");
        router.replace("/admin/contact-links");
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FormSection title="Link">
        <FormField label="Label">
          <Input
            value={v.label ?? ""}
            onChange={(e) => set("label", e.target.value)}
            required
            placeholder="GitHub"
          />
        </FormField>
        <FormField label="URL">
          <Input
            value={v.href ?? ""}
            onChange={(e) => set("href", e.target.value)}
            required
            placeholder="https://github.com/yourname or mailto:…"
          />
        </FormField>
        <FormField label="Icon">
          <select
            value={v.icon ?? ""}
            onChange={(e) => set("icon", e.target.value || null)}
            className="flex h-10 w-full rounded-lg border border-white/10 bg-ink-900/60 px-3 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-accent-blue/40"
          >
            <option value="">— Auto —</option>
            {ICON_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </FormField>
      </FormSection>
      <FormSection title="Display">
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
                <Save className="h-4 w-4" /> Save link
              </>
            )}
          </Button>
        </div>
      </FormSection>
    </form>
  );
}
