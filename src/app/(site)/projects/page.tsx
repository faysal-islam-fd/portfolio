import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { ProjectsSection } from "@/components/sections/projects";
import { getProjects } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Deep learning case studies — from architecture design to production-grade inference.",
};

export default async function ProjectsIndex() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="AI engineering, end to end."
        description="Each project is a research case study — the problem, the architecture, the metrics, and what shipped."
      />
      <ProjectsSection projects={projects} showAll />
    </>
  );
}
