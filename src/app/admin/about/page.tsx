import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AboutForm } from "@/components/admin/about-form";
import type { About } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about")
    .select("*")
    .limit(1)
    .maybeSingle();
  return (
    <>
      <AdminPageHeader
        title="About"
        description="Your identity, bio, profile photo, and CV."
      />
      <AboutForm initial={(data as About) ?? undefined} />
    </>
  );
}
