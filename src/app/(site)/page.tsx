import {
  getAbout,
  getAchievements,
  getCertifications,
  getContactLinks,
  getExperience,
  getHero,
  getPosts,
  getProjects,
  getResearch,
  getSkills,
} from "@/lib/queries";

import { HeroSection } from "@/components/sections/hero";
import { ResearchSection } from "@/components/sections/research";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { AchievementsSection } from "@/components/sections/achievements";
import { CertificationsSection } from "@/components/sections/certifications";
import { BlogPreviewSection } from "@/components/sections/blog-preview";
import { ContactSection } from "@/components/sections/contact";
import { PersonJsonLd } from "@/components/site/json-ld";

export const revalidate = 60;

export default async function HomePage() {
  const [
    hero,
    about,
    research,
    projects,
    skills,
    experience,
    achievements,
    certifications,
    posts,
    contactLinks,
  ] = await Promise.all([
    getHero(),
    getAbout(),
    getResearch({ limit: 4, featured: false }),
    getProjects({ limit: 5 }),
    getSkills(),
    getExperience(),
    getAchievements(),
    getCertifications(),
    getPosts({ limit: 3 }),
    getContactLinks(),
  ]);

  return (
    <>
      <PersonJsonLd
        about={about}
        links={contactLinks}
      />
      <HeroSection hero={hero} about={about} />
      <ResearchSection items={research} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <ExperienceSection items={experience} />
      <AchievementsSection items={achievements} />
      <CertificationsSection items={certifications} />
      <BlogPreviewSection posts={posts} />
      <ContactSection links={contactLinks} />
    </>
  );
}
