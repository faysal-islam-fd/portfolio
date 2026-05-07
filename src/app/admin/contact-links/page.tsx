import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ContactLinksList } from "@/components/admin/contact-links-list";
import type { ContactLink } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminContactLinksPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_links")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <>
      <AdminPageHeader
        title="Contact links"
        description="Drag to reorder · click edit to update."
        newHref="/admin/contact-links/new"
        newLabel="New link"
      />
      <ContactLinksList initial={(data ?? []) as ContactLink[]} />
    </>
  );
}
