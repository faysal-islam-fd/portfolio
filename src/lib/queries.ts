import "server-only";

import { unstable_cache as cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/server";
import type {
  About,
  Achievement,
  ContactLink,
  Experience,
  Hero,
  Post,
  Project,
  Publication,
  Research,
  SiteConfig,
  Skill,
} from "@/lib/types";

/* ---------- shared helpers ---------- */

async function fetchOne<T>(table: string): Promise<T | null> {
  const supabase = createPublicClient();
  const { data } = await supabase.from(table).select("*").limit(1).maybeSingle();
  return (data as T | null) ?? null;
}

/* ---------- public reads ---------- */

export const getHero = cache(
  async (): Promise<Hero | null> => fetchOne<Hero>("hero"),
  ["hero"],
  { revalidate: 60, tags: ["hero"] }
);

export const getAbout = cache(
  async (): Promise<About | null> => fetchOne<About>("about"),
  ["about"],
  { revalidate: 60, tags: ["about"] }
);

export const getSkills = cache(
  async (): Promise<Skill[]> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true });
    return (data ?? []) as Skill[];
  },
  ["skills"],
  { revalidate: 60, tags: ["skills"] }
);

export const getProjects = cache(
  async (
    opts: { featured?: boolean; limit?: number } = {}
  ): Promise<Project[]> => {
    const supabase = createPublicClient();
    let query = supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("display_order", { ascending: true })
      .order("published_at", { ascending: false });
    if (opts.featured) query = query.eq("is_featured", true);
    if (opts.limit) query = query.limit(opts.limit);
    const { data } = await query;
    return (data ?? []) as Project[];
  },
  ["projects"],
  { revalidate: 60, tags: ["projects"] }
);

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return (data as Project | null) ?? null;
  },
  ["project"],
  { revalidate: 60, tags: ["projects"] }
);

export const getResearch = cache(
  async (
    opts: { featured?: boolean; limit?: number } = {}
  ): Promise<Research[]> => {
    const supabase = createPublicClient();
    let query = supabase
      .from("research")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (opts.featured) query = query.eq("is_featured", true);
    if (opts.limit) query = query.limit(opts.limit);
    const { data } = await query;
    return (data ?? []) as Research[];
  },
  ["research"],
  { revalidate: 60, tags: ["research"] }
);

export const getResearchBySlug = cache(
  async (slug: string): Promise<Research | null> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("research")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return (data as Research | null) ?? null;
  },
  ["research-slug"],
  { revalidate: 60, tags: ["research"] }
);

export const getPublications = cache(
  async (): Promise<Publication[]> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("publications")
      .select("*")
      .order("year", { ascending: false })
      .order("display_order", { ascending: true });
    return (data ?? []) as Publication[];
  },
  ["publications"],
  { revalidate: 60, tags: ["publications"] }
);

export const getExperience = cache(
  async (): Promise<Experience[]> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("experience")
      .select("*")
      .order("start_date", { ascending: false });
    return (data ?? []) as Experience[];
  },
  ["experience"],
  { revalidate: 60, tags: ["experience"] }
);

export const getAchievements = cache(
  async (): Promise<Achievement[]> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("achievements")
      .select("*")
      .order("date", { ascending: false })
      .order("display_order", { ascending: true });
    return (data ?? []) as Achievement[];
  },
  ["achievements"],
  { revalidate: 60, tags: ["achievements"] }
);

export const getPosts = cache(
  async (
    opts: { featured?: boolean; limit?: number } = {}
  ): Promise<Post[]> => {
    const supabase = createPublicClient();
    let query = supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (opts.featured) query = query.eq("is_featured", true);
    if (opts.limit) query = query.limit(opts.limit);
    const { data } = await query;
    return (data ?? []) as Post[];
  },
  ["posts"],
  { revalidate: 60, tags: ["posts"] }
);

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return (data as Post | null) ?? null;
  },
  ["post-slug"],
  { revalidate: 60, tags: ["posts"] }
);

export const getContactLinks = cache(
  async (): Promise<ContactLink[]> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("contact_links")
      .select("*")
      .order("display_order", { ascending: true });
    return (data ?? []) as ContactLink[];
  },
  ["contact-links"],
  { revalidate: 60, tags: ["contact-links"] }
);

export const getSiteConfig = cache(
  async (key: string): Promise<SiteConfig | null> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_config")
      .select("*")
      .eq("key", key)
      .maybeSingle();
    return (data as SiteConfig | null) ?? null;
  },
  ["site-config"],
  { revalidate: 300, tags: ["site-config"] }
);
