import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { ContactSection } from "@/components/sections/contact";
import { getContactLinks } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out for research collaborations, hiring, or consulting.",
};

export default async function ContactPage() {
  const links = await getContactLinks();
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        description="Research collaborations, hard CV/DL problems, hiring — I respond to every message personally."
      />
      <ContactSection links={links} />
    </>
  );
}
