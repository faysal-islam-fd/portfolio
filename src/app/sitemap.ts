import type { MetadataRoute } from "next";

import { getPosts, getProjects, getResearch } from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, research, posts] = await Promise.all([
    getProjects(),
    getResearch(),
    getPosts(),
  ]);

  const now = new Date();

  /* ── Static pages with tuned priorities ── */
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/research"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/publications"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  /* ── Dynamic content ── */
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: p.is_featured ? 0.9 : 0.7,
  }));

  const researchEntries: MetadataRoute.Sitemap = research.map((r) => ({
    url: absoluteUrl(`/research/${r.slug}`),
    lastModified: new Date(r.updated_at),
    changeFrequency: "monthly",
    priority: r.is_featured ? 0.9 : 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly",
    priority: p.is_featured ? 0.8 : 0.6,
  }));

  return [
    ...staticEntries,
    ...projectEntries,
    ...researchEntries,
    ...postEntries,
  ];
}
