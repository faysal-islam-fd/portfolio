import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/page-header";
import { HeroForm } from "@/components/admin/hero-form";
import type { Hero } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero")
    .select("*")
    .limit(1)
    .maybeSingle();
  return (
    <>
      <AdminPageHeader
        title="Hero"
        description="The first thing visitors see. Make it count."
      />
      <HeroForm initial={(data as Hero) ?? undefined} />
    </>
  );
}
