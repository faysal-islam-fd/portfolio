import type { MetadataRoute } from "next";

import { getPosts, getProjects, getResearch } from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, research, posts] = await Promise.all([
    getProjects(),
    getResearch(),
    getPosts(),
  ]);

  const STATIC_PATHS = [
    "/",
    "/about",
    "/research",
    "/projects",
    "/publications",
    "/blog",
    "/contact",
  ];

  const now = new Date();

  return [
    ...STATIC_PATHS.map((p) => ({
      url: absoluteUrl(p),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.7,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...research.map((r) => ({
      url: absoluteUrl(`/research/${r.slug}`),
      lastModified: new Date(r.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
