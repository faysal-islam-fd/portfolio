import { absoluteUrl } from "@/lib/utils";
import type { About, ContactLink, Publication } from "@/lib/types";

export function PersonJsonLd({
  about,
  links,
  publications,
}: {
  about: About | null;
  links: ContactLink[];
  publications: Publication[];
}) {
  if (!about) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.full_name,
    url: absoluteUrl(),
    jobTitle: about.current_role ?? undefined,
    description: about.short_bio ?? about.long_bio ?? undefined,
    image: about.profile_image_url ?? undefined,
    address: about.location
      ? { "@type": "Place", name: about.location }
      : undefined,
    sameAs: links
      .filter((l) => l.href.startsWith("http"))
      .map((l) => l.href),
    knowsAbout: [
      "Deep Learning",
      "Vision Transformers",
      "Computer Vision",
      "Multimodal Learning",
      "AI Research",
    ],
    publishingPrinciples: about.research_focus ?? undefined,
    award: undefined,
    affiliation: about.current_role
      ? { "@type": "Organization", name: about.current_role }
      : undefined,
    workExample: publications.slice(0, 5).map((p) => ({
      "@type": "ScholarlyArticle",
      headline: p.title,
      datePublished: `${p.year}`,
      url: p.arxiv_url ?? p.pdf_url ?? undefined,
      author: p.authors,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
