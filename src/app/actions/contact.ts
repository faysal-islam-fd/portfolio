"use server";

import { Resend } from "resend";

import { createServiceClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/schemas";

export async function submitContactMessage(formData: FormData) {
  try {
    const raw = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: (formData.get("subject") ?? "") as string,
      message: String(formData.get("message") ?? ""),
      website: (formData.get("website") ?? "") as string,
    };

    // Honeypot trip → silently succeed without storing
    if (raw.website && raw.website.trim().length > 0) {
      return { success: true as const };
    }

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return {
        success: false as const,
        error: first?.message ?? "Invalid input",
      };
    }

    const { name, email, subject, message } = parsed.data;

    // Persist regardless of email config — service role bypasses RLS.
    const supabase = createServiceClient();
    const { error: dbErr } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject: subject ?? null,
      message,
    });
    if (dbErr) {
      console.error("[contact] db insert failed:", dbErr);
      return { success: false as const, error: "Could not save message." };
    }

    // Best-effort email notification via Resend
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_TO) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL_FROM ?? "Portfolio <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL_TO,
          replyTo: email,
          subject: subject?.trim() || `New portfolio message from ${name}`,
          text:
            `From: ${name} <${email}>\n` +
            `Subject: ${subject ?? "(none)"}\n\n` +
            `${message}\n`,
        });
      } catch (err) {
        console.error("[contact] resend failed:", err);
        // Don't fail the request just because email failed.
      }
    }

    return { success: true as const };
  } catch (err) {
    console.error("[contact] unexpected:", err);
    return { success: false as const, error: "Unexpected error." };
  }
}
