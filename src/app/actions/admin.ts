"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import {
  aboutSchema,
  achievementSchema,
  contactLinkSchema,
  experienceSchema,
  heroSchema,
  postSchema,
  projectSchema,
  publicationSchema,
  researchSchema,
  skillSchema,
} from "@/lib/schemas";

type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

/* =====================================================================
   Generic CRUD primitives
   --------------------------------------------------------------------
   `"use server"` files require *every* export to be an async function,
   so we expose generic upsertRow / deleteRow / reorderRows below and
   then re-export thin async wrappers per entity at the bottom.
   ===================================================================== */

async function upsertRow<T extends z.ZodTypeAny>(
  table: string,
  schema: T,
  tag: string,
  paths: string[],
  data: z.infer<T> & { id?: string }
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return { ok: false, error: first?.message ?? "Validation failed" };
    }

    const supabase = createServiceClient();
    const payload: any = parsed.data;
    for (const k of Object.keys(payload)) {
      if (payload[k] === "") payload[k] = null;
    }

    let id = data.id;
    if (id) {
      const { error } = await supabase.from(table).update(payload).eq("id", id);
      if (error) throw error;
    } else {
      const { data: row, error } = await supabase
        .from(table)
        .insert(payload)
        .select("id")
        .single();
      if (error) throw error;
      id = row?.id;
    }

    revalidateTag(tag);
    paths.forEach((p) => revalidatePath(p));
    return { ok: true, id };
  } catch (err: any) {
    console.error(`[admin:${table}] upsert failed`, err);
    return { ok: false, error: err?.message ?? "Unknown error" };
  }
}

async function deleteRow(
  table: string,
  tag: string,
  paths: string[],
  id: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const supabase = createServiceClient();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
    revalidateTag(tag);
    paths.forEach((p) => revalidatePath(p));
    return { ok: true };
  } catch (err: any) {
    console.error(`[admin:${table}] delete failed`, err);
    return { ok: false, error: err?.message ?? "Unknown error" };
  }
}

async function reorderRows(
  table: string,
  tag: string,
  paths: string[],
  orderedIds: string[]
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const supabase = createServiceClient();
    await Promise.all(
      orderedIds.map((id, idx) =>
        supabase.from(table).update({ display_order: idx }).eq("id", id)
      )
    );
    revalidateTag(tag);
    paths.forEach((p) => revalidatePath(p));
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? "Unknown error" };
  }
}

/* =====================================================================
   PROJECTS
   ===================================================================== */

export async function saveProject(
  data: z.infer<typeof projectSchema> & { id?: string }
) {
  return upsertRow(
    "projects",
    projectSchema,
    "projects",
    ["/", "/projects"],
    data
  );
}
export async function deleteProject(id: string) {
  return deleteRow("projects", "projects", ["/", "/projects"], id);
}
export async function reorderProjects(ids: string[]) {
  return reorderRows("projects", "projects", ["/", "/projects"], ids);
}

/* =====================================================================
   RESEARCH
   ===================================================================== */

export async function saveResearch(
  data: z.infer<typeof researchSchema> & { id?: string }
) {
  return upsertRow(
    "research",
    researchSchema,
    "research",
    ["/", "/research"],
    data
  );
}
export async function deleteResearch(id: string) {
  return deleteRow("research", "research", ["/", "/research"], id);
}
export async function reorderResearch(ids: string[]) {
  return reorderRows("research", "research", ["/", "/research"], ids);
}

/* =====================================================================
   PUBLICATIONS
   ===================================================================== */

export async function savePublication(
  data: z.infer<typeof publicationSchema> & { id?: string }
) {
  return upsertRow(
    "publications",
    publicationSchema,
    "publications",
    ["/", "/publications"],
    data
  );
}
export async function deletePublication(id: string) {
  return deleteRow(
    "publications",
    "publications",
    ["/", "/publications"],
    id
  );
}
export async function reorderPublications(ids: string[]) {
  return reorderRows(
    "publications",
    "publications",
    ["/", "/publications"],
    ids
  );
}

/* =====================================================================
   EXPERIENCE
   ===================================================================== */

export async function saveExperience(
  data: z.infer<typeof experienceSchema> & { id?: string }
) {
  return upsertRow(
    "experience",
    experienceSchema,
    "experience",
    ["/", "/about"],
    data
  );
}
export async function deleteExperience(id: string) {
  return deleteRow("experience", "experience", ["/", "/about"], id);
}
export async function reorderExperience(ids: string[]) {
  return reorderRows("experience", "experience", ["/", "/about"], ids);
}

/* =====================================================================
   SKILLS
   ===================================================================== */

export async function saveSkill(
  data: z.infer<typeof skillSchema> & { id?: string }
) {
  return upsertRow("skills", skillSchema, "skills", ["/", "/about"], data);
}
export async function deleteSkill(id: string) {
  return deleteRow("skills", "skills", ["/", "/about"], id);
}
export async function reorderSkills(ids: string[]) {
  return reorderRows("skills", "skills", ["/", "/about"], ids);
}

/* =====================================================================
   ACHIEVEMENTS
   ===================================================================== */

export async function saveAchievement(
  data: z.infer<typeof achievementSchema> & { id?: string }
) {
  return upsertRow(
    "achievements",
    achievementSchema,
    "achievements",
    ["/"],
    data
  );
}
export async function deleteAchievement(id: string) {
  return deleteRow("achievements", "achievements", ["/"], id);
}
export async function reorderAchievements(ids: string[]) {
  return reorderRows("achievements", "achievements", ["/"], ids);
}

/* =====================================================================
   POSTS (blog)
   ===================================================================== */

export async function savePost(
  data: z.infer<typeof postSchema> & {
    id?: string;
    published_at?: string | null;
  }
) {
  return upsertRow("posts", postSchema, "posts", ["/", "/blog"], data);
}
export async function deletePost(id: string) {
  return deleteRow("posts", "posts", ["/", "/blog"], id);
}

/* =====================================================================
   CONTACT LINKS
   ===================================================================== */

export async function saveContactLink(
  data: z.infer<typeof contactLinkSchema> & { id?: string }
) {
  return upsertRow(
    "contact_links",
    contactLinkSchema,
    "contact-links",
    ["/", "/contact"],
    data
  );
}
export async function deleteContactLink(id: string) {
  return deleteRow(
    "contact_links",
    "contact-links",
    ["/", "/contact"],
    id
  );
}
export async function reorderContactLinks(ids: string[]) {
  return reorderRows(
    "contact_links",
    "contact-links",
    ["/", "/contact"],
    ids
  );
}

/* =====================================================================
   HERO (single-row)
   ===================================================================== */

export async function saveHero(
  data: z.infer<typeof heroSchema> & { id?: string }
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = heroSchema.safeParse(data);
    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid" };
    }
    const supabase = createServiceClient();
    const payload: any = parsed.data;
    for (const k of Object.keys(payload)) {
      if (payload[k] === "") payload[k] = null;
    }
    if (data.id) {
      const { error } = await supabase
        .from("hero")
        .update(payload)
        .eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("hero").insert(payload);
      if (error) throw error;
    }
    revalidateTag("hero");
    revalidatePath("/");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? "Unknown error" };
  }
}

/* =====================================================================
   ABOUT (single-row)
   ===================================================================== */

export async function saveAbout(
  data: z.infer<typeof aboutSchema> & { id?: string }
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = aboutSchema.safeParse(data);
    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid" };
    }
    const supabase = createServiceClient();
    const payload: any = parsed.data;
    for (const k of Object.keys(payload)) {
      if (payload[k] === "") payload[k] = null;
    }
    if (data.id) {
      const { error } = await supabase
        .from("about")
        .update(payload)
        .eq("id", data.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("about").insert(payload);
      if (error) throw error;
    }
    revalidateTag("about");
    revalidatePath("/");
    revalidatePath("/about");
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? "Unknown error" };
  }
}

/* =====================================================================
   CONTACT MESSAGES
   ===================================================================== */

export async function markMessageRead(id: string, isRead = true) {
  try {
    await requireAdmin();
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: isRead })
      .eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/messages");
    return { ok: true as const };
  } catch (err: any) {
    return { ok: false as const, error: err?.message ?? "Unknown" };
  }
}

export async function deleteMessage(id: string) {
  try {
    await requireAdmin();
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);
    if (error) throw error;
    revalidatePath("/admin/messages");
    return { ok: true as const };
  } catch (err: any) {
    return { ok: false as const, error: err?.message ?? "Unknown" };
  }
}
