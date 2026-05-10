import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Mail, MapPin, Briefcase } from "lucide-react";

import { PageHeader } from "@/components/site/page-header";
import { ContactIcon } from "@/components/site/contact-icon";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { Button } from "@/components/ui/button";
import {
  getAbout,
  getContactLinks,
  getExperience,
  getSkills,
} from "@/lib/queries";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  const name = about?.full_name ?? "About";
  const description =
    about?.short_bio ??
    "Background, research focus, and the path that brought me here.";

  return {
    title: `About ${name}`,
    description,
    alternates: {
      canonical: absoluteUrl("/about"),
    },
    openGraph: {
      title: `About ${name}`,
      description,
      url: absoluteUrl("/about"),
      type: "profile",
      ...(about?.profile_image_url
        ? { images: [{ url: about.profile_image_url }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `About ${name}`,
      description,
    },
  };
}

export default async function AboutPage() {
  const [about, links, experience, skills] = await Promise.all([
    getAbout(),
    getContactLinks(),
    getExperience(),
    getSkills(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "About", href: "/about" }]} />

      <PageHeader
        eyebrow="About"
        title={about?.full_name ?? "About"}
        description={about?.short_bio ?? undefined}
      />

      <section className="section">
        <div className="container-prose">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-white/[0.06] bg-ink-900/90  overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  {about?.profile_image_url ? (
                    <Image
                      src={about.profile_image_url}
                      alt={about.full_name ?? "Profile"}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 480px"
                      priority
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-ink-800 to-ink-900" />
                  )}
                </div>
                <div className="p-5 space-y-3">
                  {about?.current_role && (
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-accent-blue" />
                      <span className="text-zinc-300">{about.current_role}</span>
                    </div>
                  )}
                  {about?.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-accent-indigo" />
                      <span className="text-zinc-300">{about.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {about?.resume_url && (
                  <Button asChild size="lg" className="w-full">
                    <a href={about.resume_url} target="_blank" rel="noreferrer">
                      <Download className="h-4 w-4" /> Download CV
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/contact">
                    <Mail className="h-4 w-4" /> Get in touch
                  </Link>
                </Button>
              </div>

              {links?.length > 0 && (
                <div className="rounded-2xl border border-white/[0.06] bg-ink-900/90 p-5 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
                    Connect
                  </p>
                  {links.map((l) => (
                    <a
                      key={l.id}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-zinc-300 hover:bg-white/[0.04] hover:text-white transition-colors"
                    >
                      <ContactIcon name={l.icon} className="h-3.5 w-3.5" />
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </aside>

            <article className="lg:col-span-8 prose-research">
              {about?.research_focus && (
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue">
                  {about.research_focus}
                </p>
              )}
              {about?.long_bio && (
                <p className="mt-2 text-xl text-zinc-200 leading-relaxed font-light text-balance">
                  {about.long_bio}
                </p>
              )}
              {about?.highlights?.length ? (
                <>
                  <h2>Highlights</h2>
                  <ul>
                    {about.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </article>
          </div>
        </div>
      </section>

      <ExperienceSection items={experience} />
      <SkillsSection skills={skills} />
    </>
  );
}
