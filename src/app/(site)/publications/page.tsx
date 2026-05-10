import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { PublicationsSection } from "@/components/sections/publications";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { getPublications } from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Peer-reviewed papers, workshop contributions, and preprints by MD. Faysal Islam Fahad in deep learning and computer vision.",
  alternates: {
    canonical: absoluteUrl("/publications"),
  },
  openGraph: {
    title: "Publications — MD. Faysal Islam Fahad",
    description:
      "Peer-reviewed papers, workshop contributions, and preprints.",
    url: absoluteUrl("/publications"),
  },
};

export default async function PublicationsPage() {
  const items = await getPublications();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Publications", href: "/publications" }]} />
      <PageHeader
        eyebrow="Publications"
        title="Peer-reviewed contributions."
        description="Conference papers, workshop talks, and preprints — chronologically."
      />
      <PublicationsSection items={items} />
    </>
  );
}
