import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { PublicationsSection } from "@/components/sections/publications";
import { getPublications } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Publications",
  description: "Peer-reviewed papers, workshop contributions, and preprints.",
};

export default async function PublicationsPage() {
  const items = await getPublications();
  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Peer-reviewed contributions."
        description="Conference papers, workshop talks, and preprints — chronologically."
      />
      <PublicationsSection items={items} />
    </>
  );
}
