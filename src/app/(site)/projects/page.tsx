import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { ProjectsSection } from "@/components/sections/projects";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { getProjects } from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Deep learning and AI engineering projects by MD. Faysal Islam Fahad — from architecture design to production-grade inference.",
  alternates: {
    canonical: absoluteUrl("/projects"),
  },
  openGraph: {
    title: "Projects — MD. Faysal Islam Fahad",
    description:
      "Deep learning case studies — from architecture design to production-grade inference.",
    url: absoluteUrl("/projects"),
  },
};

export default async function ProjectsIndex() {
  const projects = await getProjects();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Projects", href: "/projects" }]} />
      <PageHeader
        eyebrow="Projects"
        title="AI engineering, end to end."
        description="Each project is a research case study — the problem, the architecture, the metrics, and what shipped."
      />
      <ProjectsSection projects={projects} showAll />
    </>
  );
}
