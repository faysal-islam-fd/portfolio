import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { FormShell } from "@/components/admin/form-shell";
import { PostForm } from "@/components/admin/post-form";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <FormShell title={(data as Post).title} backHref="/admin/posts">
      <PostForm initial={data as Post} />
    </FormShell>
  );
}
