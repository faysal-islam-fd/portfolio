import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { ContactSection } from "@/components/sections/contact";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { getContactLinks } from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to MD. Faysal Islam Fahad for research collaborations, AI consulting, or hiring inquiries.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact — MD. Faysal Islam Fahad",
    description:
      "Reach out for research collaborations, hiring, or consulting.",
    url: absoluteUrl("/contact"),
  },
};

export default async function ContactPage() {
  const links = await getContactLinks();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        description="Research collaborations, hard CV/DL problems, hiring — I respond to every message personally."
      />
      <ContactSection links={links} />
    </>
  );
}
