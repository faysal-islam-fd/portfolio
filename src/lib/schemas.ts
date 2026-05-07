import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(10, "Message is too short").max(4000),
  // Anti-spam honeypot
  website: z.string().optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

const slug = z
  .string()
  .min(1)
  .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and dashes");

const stringArr = z.array(z.string()).default([]);

export const projectSchema = z.object({
  slug,
  title: z.string().min(2),
  tagline: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  problem: z.string().optional().nullable(),
  approach: z.string().optional().nullable(),
  results: z.string().optional().nullable(),
  content_mdx: z.string().optional().nullable(),
  cover_image_url: z.string().url().or(z.literal("")).optional().nullable(),
  architecture_image_url: z.string().url().or(z.literal("")).optional().nullable(),
  gallery_urls: stringArr,
  tags: stringArr,
  datasets: stringArr,
  models: stringArr,
  metrics: z.array(z.object({ label: z.string(), value: z.string(), unit: z.string().optional() })).default([]),
  github_url: z.string().url().or(z.literal("")).optional().nullable(),
  demo_url: z.string().url().or(z.literal("")).optional().nullable(),
  paper_url: z.string().url().or(z.literal("")).optional().nullable(),
  project_type: z.enum([
    "research", "computer_vision", "nlp", "multimodal",
    "reinforcement_learning", "web", "tool",
  ]),
  status: z.enum(["draft", "published", "archived"]),
  is_featured: z.boolean().default(false),
  display_order: z.number().int().default(0),
});
export type ProjectInput = z.infer<typeof projectSchema>;

export const researchSchema = z.object({
  slug,
  title: z.string().min(2),
  abstract: z.string().optional().nullable(),
  problem_statement: z.string().optional().nullable(),
  methodology: z.string().optional().nullable(),
  results: z.string().optional().nullable(),
  content_mdx: z.string().optional().nullable(),
  thumbnail_url: z.string().url().or(z.literal("")).optional().nullable(),
  diagram_url: z.string().url().or(z.literal("")).optional().nullable(),
  collaborators: stringArr,
  keywords: stringArr,
  status: z.enum([
    "in_progress", "under_review", "accepted", "published", "completed",
  ]),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  external_url: z.string().url().or(z.literal("")).optional().nullable(),
  is_featured: z.boolean().default(false),
  display_order: z.number().int().default(0),
});
export type ResearchInput = z.infer<typeof researchSchema>;

export const publicationSchema = z.object({
  title: z.string().min(2),
  authors: z.string().min(2),
  venue: z.string().optional().nullable(),
  publication_type: z.enum([
    "conference", "journal", "workshop", "preprint", "thesis", "book_chapter",
  ]),
  year: z.number().int().min(1900).max(2100),
  abstract: z.string().optional().nullable(),
  pdf_url: z.string().url().or(z.literal("")).optional().nullable(),
  arxiv_url: z.string().url().or(z.literal("")).optional().nullable(),
  doi: z.string().optional().nullable(),
  bibtex: z.string().optional().nullable(),
  citation_count: z.number().int().default(0),
  is_featured: z.boolean().default(false),
  display_order: z.number().int().default(0),
});
export type PublicationInput = z.infer<typeof publicationSchema>;

export const experienceSchema = z.object({
  organization: z.string().min(2),
  role: z.string().min(2),
  experience_type: z.enum(["work", "research", "education", "fellowship", "volunteer"]),
  location: z.string().optional().nullable(),
  start_date: z.string(),
  end_date: z.string().optional().nullable(),
  is_current: z.boolean().default(false),
  description: z.string().optional().nullable(),
  highlights: stringArr,
  technologies: stringArr,
  logo_url: z.string().url().or(z.literal("")).optional().nullable(),
  display_order: z.number().int().default(0),
});
export type ExperienceInput = z.infer<typeof experienceSchema>;

export const skillSchema = z.object({
  name: z.string().min(1),
  category: z.enum([
    "deep_learning", "computer_vision", "nlp", "ml_frameworks",
    "languages", "tools", "cloud", "web",
  ]),
  proficiency: z.number().int().min(0).max(100).default(80),
  icon: z.string().optional().nullable(),
  display_order: z.number().int().default(0),
  is_featured: z.boolean().default(false),
});
export type SkillInput = z.infer<typeof skillSchema>;

export const achievementSchema = z.object({
  title: z.string().min(2),
  organization: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  url: z.string().url().or(z.literal("")).optional().nullable(),
  icon: z.string().optional().nullable(),
  display_order: z.number().int().default(0),
});
export type AchievementInput = z.infer<typeof achievementSchema>;

export const postSchema = z.object({
  slug,
  title: z.string().min(2),
  excerpt: z.string().optional().nullable(),
  content_mdx: z.string().min(10),
  cover_image_url: z.string().url().or(z.literal("")).optional().nullable(),
  tags: stringArr,
  reading_minutes: z.number().int().default(5),
  status: z.enum(["draft", "published", "archived"]),
  is_featured: z.boolean().default(false),
});
export type PostInput = z.infer<typeof postSchema>;

export const contactLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  icon: z.string().optional().nullable(),
  display_order: z.number().int().default(0),
});
export type ContactLinkInput = z.infer<typeof contactLinkSchema>;

export const heroSchema = z.object({
  eyebrow: z.string().optional().nullable(),
  headline: z.string().min(2),
  subheadline: z.string().optional().nullable(),
  rotating_titles: stringArr,
  cta_primary_label: z.string().optional().nullable(),
  cta_primary_href: z.string().optional().nullable(),
  cta_secondary_label: z.string().optional().nullable(),
  cta_secondary_href: z.string().optional().nullable(),
  metrics: z.array(z.object({
    label: z.string(), value: z.string(), unit: z.string().optional(),
  })).default([]),
});
export type HeroInput = z.infer<typeof heroSchema>;

export const aboutSchema = z.object({
  full_name: z.string().min(2),
  short_bio: z.string().optional().nullable(),
  long_bio: z.string().optional().nullable(),
  research_focus: z.string().optional().nullable(),
  current_role: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  profile_image_url: z.string().url().or(z.literal("")).optional().nullable(),
  resume_url: z.string().url().or(z.literal("")).optional().nullable(),
  highlights: stringArr,
});
export type AboutInput = z.infer<typeof aboutSchema>;
