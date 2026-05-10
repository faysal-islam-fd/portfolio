import { absoluteUrl } from "@/lib/utils";
import type { Post } from "@/lib/types";

/**
 * Outputs a BlogPosting JSON-LD script tag.
 * Use on individual blog post pages.
 */
export function ArticleJsonLd({ post }: { post: Post }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${post.slug}#article`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image_url ?? undefined,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    wordCount: post.content_mdx?.trim().split(/\s+/).length ?? undefined,
    author: {
      "@type": "Person",
      name: "MD. Faysal Islam Fahad",
      url: absoluteUrl(),
    },
    publisher: {
      "@type": "Person",
      name: "MD. Faysal Islam Fahad",
      url: absoluteUrl(),
    },
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
