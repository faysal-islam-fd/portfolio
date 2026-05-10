"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSection, FormField } from "@/components/admin/form-shell";
import { saveCertification } from "@/app/actions/admin";
import type { Certification } from "@/lib/types";

const DEFAULTS: Partial<Certification> = { display_order: 0 };

export function CertificationForm({ initial }: { initial?: Partial<Certification> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [v, setV] = useState<Partial<Certification>>({ ...DEFAULTS, ...initial });
  const set = <K extends keyof Certification>(k: K, val: any) =>
    setV((prev) => ({ ...prev, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveCertification({
        id: v.id,
        title: v.title ?? "",
        issuer: v.issuer ?? "",
        issue_date: v.issue_date ?? null,
        expiry_date: v.expiry_date ?? null,
        credential_id: v.credential_id ?? null,
        credential_url: v.credential_url ?? null,
        image_url: v.image_url ?? null,
        description: v.description ?? null,
        display_order: v.display_order ?? 0,
      });
      if (res.ok) {
        toast.success("Saved");
        if (!v.id && res.id) router.replace(`/admin/certifications/${res.id}`);
        router.refresh();
      } else toast.error(res.error);
    });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FormSection title="Certification">
        <FormField label="Title">
          <Input
            value={v.title ?? ""}
            onChange={(e) => set("title", e.target.value)}
            required
            placeholder="e.g. AWS Certified Machine Learning"
          />
        </FormField>
        <FormField label="Issuer">
          <Input
            value={v.issuer ?? ""}
            onChange={(e) => set("issuer", e.target.value)}
            required
            placeholder="e.g. Amazon Web Services"
          />
        </FormField>
        <FormField label="Issue date">
          <Input
            type="date"
            value={v.issue_date ?? ""}
            onChange={(e) => set("issue_date", e.target.value || null)}
          />
        </FormField>
        <FormField label="Expiry date">
          <Input
            type="date"
            value={v.expiry_date ?? ""}
            onChange={(e) => set("expiry_date", e.target.value || null)}
          />
        </FormField>
        <FormField label="Description">
          <Textarea
            value={v.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
          />
        </FormField>
      </FormSection>

      <FormSection title="Credential">
        <FormField label="Credential ID">
          <Input
            value={v.credential_id ?? ""}
            onChange={(e) => set("credential_id", e.target.value)}
            placeholder="e.g. ABC123XYZ"
          />
        </FormField>
        <FormField label="Credential URL">
          <Input
            value={v.credential_url ?? ""}
            onChange={(e) => set("credential_url", e.target.value)}
            placeholder="https://…"
          />
        </FormField>
        <FormField label="Badge / image URL">
          <Input
            value={v.image_url ?? ""}
            onChange={(e) => set("image_url", e.target.value)}
            placeholder="https://…"
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
                <Save className="h-4 w-4" /> Save certification
              </>
            )}
          </Button>
        </div>
      </FormSection>
    </form>
  );
}
