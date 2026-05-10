import { absoluteUrl } from "@/lib/utils";

interface Crumb {
  name: string;
  href: string;
}

/**
 * Outputs a BreadcrumbList JSON-LD script tag.
 * Pass an array of breadcrumb items — the homepage is automatically prepended.
 *
 * Example:
 * ```tsx
 * <BreadcrumbJsonLd items={[{ name: "Blog", href: "/blog" }, { name: post.title, href: `/blog/${post.slug}` }]} />
 * ```
 */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
