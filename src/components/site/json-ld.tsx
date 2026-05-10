import { absoluteUrl } from "@/lib/utils";
import type { About, ContactLink, Publication } from "@/lib/types";

/**
 * Outputs Person + WebSite + ProfilePage JSON-LD on the homepage.
 * The WebSite schema enables Google sitelinks search box.
 */
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

  const siteUrl = absoluteUrl();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}#profilepage`,
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}#person`,
      name: about.full_name,
      url: siteUrl,
      jobTitle: about.current_role ?? undefined,
      description: about.short_bio ?? about.long_bio ?? undefined,
      image: about.profile_image_url ?? undefined,
      address: about.location
        ? { "@type": "PostalAddress", addressLocality: about.location }
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
        "Edge AI",
        "Self-Supervised Learning",
        "PyTorch",
        "Neural Networks",
      ],
      publishingPrinciples: about.research_focus ?? undefined,
      workExample: publications.slice(0, 5).map((p) => ({
        "@type": "ScholarlyArticle",
        headline: p.title,
        datePublished: `${p.year}`,
        url: p.arxiv_url ?? p.pdf_url ?? undefined,
        author: p.authors,
      })),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: about.full_name ?? "AI Researcher Portfolio",
    description:
      about.short_bio ??
      "Deep Learning Engineer Portfolio",
    publisher: {
      "@id": `${siteUrl}#person`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
