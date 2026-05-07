import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

export async function isAdmin(email?: string | null) {
  if (!email) return false;
  const lower = email.toLowerCase();

  // Env allow-list short-circuits a DB hit.
  if (ADMIN_EMAILS.includes(lower)) return true;

  const supabase = await createClient();
  const { data } = await supabase
    .from("admins")
    .select("email")
    .eq("email", lower)
    .maybeSingle();
  return Boolean(data);
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const ok = await isAdmin(user.email);
  if (!ok) redirect("/login?error=forbidden");
  return user;
}
