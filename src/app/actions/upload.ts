"use server";

import { requireAdmin } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

const ALLOWED_BUCKETS = [
  "avatars",
  "projects",
  "research",
  "posts",
  "resumes",
  "site",
] as const;

type Bucket = (typeof ALLOWED_BUCKETS)[number];

export async function uploadFile(
  bucket: Bucket,
  formData: FormData
): Promise<{ ok: true; url: string; path: string } | { ok: false; error: string }> {
  try {
    await requireAdmin();
    if (!ALLOWED_BUCKETS.includes(bucket)) {
      return { ok: false, error: "Invalid bucket" };
    }

    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) {
      return { ok: false, error: "No file provided" };
    }

    const max = 10 * 1024 * 1024; // 10 MB
    if (file.size > max) {
      return { ok: false, error: "File too large (max 10 MB)" };
    }

    const ext = (file.name.split(".").pop() ?? "bin").toLowerCase();
    const safeName = slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 60) || "file";
    const path = `${Date.now()}-${safeName}.${ext}`;

    const supabase = createServiceClient();
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });
    if (error) return { ok: false, error: error.message };

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return { ok: true, url: data.publicUrl, path };
  } catch (err: any) {
    console.error("[upload] failed", err);
    return { ok: false, error: err?.message ?? "Unknown error" };
  }
}
