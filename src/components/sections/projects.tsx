import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, Globe, FileCode2 } from "lucide-react";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/fx/reveal";
import { Spotlight } from "@/components/fx/spotlight";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { PROJECT_TYPE_LABELS } from "@/lib/utils";
import type { Metric, Project } from "@/lib/types";

export function ProjectsSection({
  projects,
  showAll = false,
}: {
  projects: Project[];
  showAll?: boolean;
}) {
  if (!projects?.length) return null;

  return (
    <section id="projects" className="section">
      <div className="container-prose">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeading
            eyebrow="03 — Projects"
            title="AI research, shipped."
            description="A selection of deep learning case studies — from architecture design to deployment-grade inference pipelines."
          />
          {!showAll && (
            <Reveal>
              <Link
                href="/projects"
                className="hidden md:inline-flex group items-center gap-1.5 text-sm font-medium text-accent-blue hover:text-white transition-colors"
              >
                See all projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          )}
        </div>

        {/* Featured project - large hero card */}
        {projects[0] && (
          <Reveal className="mt-14">
            <FeaturedProjectCard project={projects[0]} />
          </Reveal>
        )}

        {projects.length > 1 && (
          <StaggerContainer className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(1).map((p) => (
              <StaggerItem key={p.id}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  const metrics: Metric[] = (project.metrics ?? []) as Metric[];
  return (
    <Spotlight
      size={700}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl border border-white/[0.06] bg-ink-900/60  overflow-hidden lift"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="lg:col-span-7 relative block aspect-[16/10] lg:aspect-auto group"
      >
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width:1024px) 100vw, 800px"
            priority
          />
        ) : (
          <div className="relative h-full w-full bg-gradient-to-br from-ink-800 via-ink-900 to-black">
            <div className="absolute inset-0 neural-grid opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FileCode2 className="h-20 w-20 text-accent-blue/40" strokeWidth={1.2} />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/30 to-transparent lg:bg-gradient-to-l" />
      </Link>

      <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col">
        <div className="flex items-center flex-wrap gap-2">
          <Badge variant="accent">Featured</Badge>
          <Badge variant="outline">
            {PROJECT_TYPE_LABELS[project.project_type] ?? project.project_type}
          </Badge>
        </div>

        <Link href={`/projects/${project.slug}`} className="mt-5">
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance hover:text-gradient-accent transition-all">
            {project.title}
          </h3>
        </Link>

        {project.tagline && (
          <p className="mt-4 text-zinc-400 leading-relaxed text-base">
            {project.tagline}
          </p>
        )}

        {metrics.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-px rounded-xl border border-white/[0.06] bg-white/[0.04] overflow-hidden">
            {metrics.slice(0, 3).map((m, i) => (
              <div key={i} className="bg-ink-950/40 p-4">
                <div className="font-mono text-lg font-semibold text-white">
                  {m.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {(project.tags?.length ?? 0) > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 border border-white/10 rounded-md px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-7 flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-accent-blue transition-colors"
          >
            View case study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              aria-label="Demo"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </Spotlight>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const metrics: Metric[] = (project.metrics ?? []) as Metric[];
  return (
    <Spotlight
      size={400}
      className="group h-full rounded-2xl border border-white/[0.06] bg-ink-900/50  overflow-hidden lift"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.cover_image_url ? (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 500px"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-ink-800 via-ink-900 to-black">
              <div className="absolute inset-0 neural-grid opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-1.5">
            <Badge variant="outline">
              {PROJECT_TYPE_LABELS[project.project_type] ?? project.project_type}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-gradient-accent transition-all">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
              {project.tagline}
            </p>
          )}
          {metrics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {metrics.slice(0, 3).map((m, i) => (
                <span
                  key={i}
                  className="chip chip-accent"
                  title={m.label}
                >
                  {m.label}: {m.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Spotlight>
  );
}
