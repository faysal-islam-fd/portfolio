import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FormShell } from "@/components/admin/form-shell";
import { ContactLinkForm } from "@/components/admin/contact-link-form";
import type { ContactLink } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditContactLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_links")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <FormShell title={(data as ContactLink).label} backHref="/admin/contact-links">
      <ContactLinkForm initial={data as ContactLink} />
    </FormShell>
  );
}
