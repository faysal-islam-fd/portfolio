import { absoluteUrl } from "@/lib/utils";
import type { Project } from "@/lib/types";

/**
 * Outputs a SoftwareSourceCode / CreativeWork JSON-LD script tag.
 * Use on individual project detail pages.
 */
export function ProjectJsonLd({ project }: { project: Project }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": project.github_url ? "SoftwareSourceCode" : "CreativeWork",
    "@id": absoluteUrl(`/projects/${project.slug}#project`),
    name: project.title,
    description: project.tagline ?? project.description ?? undefined,
    image: project.cover_image_url ?? undefined,
    url: absoluteUrl(`/projects/${project.slug}`),
    datePublished: project.published_at ?? project.created_at,
    dateModified: project.updated_at,
    author: {
      "@type": "Person",
      name: "MD. Faysal Islam Fahad",
      url: absoluteUrl(),
    },
    ...(project.github_url
      ? { codeRepository: project.github_url }
      : {}),
    ...(project.demo_url
      ? { installUrl: project.demo_url }
      : {}),
    ...(project.tags?.length
      ? { keywords: project.tags.join(", ") }
      : {}),
    ...(project.models?.length
      ? {
          runtimePlatform: project.models.join(", "),
        }
      : {}),
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
