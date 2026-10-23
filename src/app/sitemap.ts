import type { MetadataRoute } from "next";

import { getPosts, getProjects } from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";
import { CASE_STUDIES } from "@/content/work";
import { SERVICES } from "@/content/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const now = new Date();

  /* ── Static pages with tuned priorities ── */
  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/projects"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.5 },
  ];

  /* ── Case studies (code) + admin-managed projects without one ── */
  const known = new Set(CASE_STUDIES.map((c) => c.slug));
  const projectEntries: MetadataRoute.Sitemap = [
    ...CASE_STUDIES.map((c) => ({
      url: absoluteUrl(`/projects/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects
      .filter((p) => !known.has(p.slug))
      .map((p) => ({
        url: absoluteUrl(`/projects/${p.slug}`),
        lastModified: new Date(p.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...projectEntries, ...serviceEntries, ...postEntries];
}
