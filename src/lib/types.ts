// =====================================================================
// Database row types - mirror the Supabase schema in
// supabase/migrations/0001_initial_schema.sql
// =====================================================================

export type SkillCategory =
  | "deep_learning"
  | "computer_vision"
  | "nlp"
  | "ml_frameworks"
  | "languages"
  | "tools"
  | "cloud"
  | "web";

export type ProjectStatus = "draft" | "published" | "archived";

export type ProjectType =
  | "research"
  | "computer_vision"
  | "nlp"
  | "multimodal"
  | "reinforcement_learning"
  | "web"
  | "tool";

export type ResearchStatus =
  | "in_progress"
  | "under_review"
  | "accepted"
  | "published"
  | "completed";

export type PublicationType =
  | "conference"
  | "journal"
  | "workshop"
  | "preprint"
  | "thesis"
  | "book_chapter";

export type ExperienceType =
  | "work"
  | "research"
  | "education"
  | "fellowship"
  | "volunteer";

export type PostStatus = "draft" | "published" | "archived";

export interface Metric {
  label: string;
  value: string;
  unit?: string;
}

export interface Hero {
  id: string;
  eyebrow: string | null;
  headline: string;
  subheadline: string | null;
  rotating_titles: string[] | null;
  cta_primary_label: string | null;
  cta_primary_href: string | null;
  cta_secondary_label: string | null;
  cta_secondary_href: string | null;
  metrics: Metric[];
  updated_at: string;
}

export interface About {
  id: string;
  full_name: string;
  short_bio: string | null;
  long_bio: string | null;
  research_focus: string | null;
  current_role: string | null;
  location: string | null;
  profile_image_url: string | null;
  resume_url: string | null;
  highlights: string[];
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon: string | null;
  display_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  problem: string | null;
  approach: string | null;
  results: string | null;
  content_mdx: string | null;
  cover_image_url: string | null;
  architecture_image_url: string | null;
  gallery_urls: string[];
  tags: string[];
  datasets: string[];
  models: string[];
  metrics: Metric[];
  github_url: string | null;
  demo_url: string | null;
  paper_url: string | null;
  project_type: ProjectType;
  status: ProjectStatus;
  is_featured: boolean;
  display_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Research {
  id: string;
  slug: string;
  title: string;
  abstract: string | null;
  problem_statement: string | null;
  methodology: string | null;
  results: string | null;
  content_mdx: string | null;
  thumbnail_url: string | null;
  diagram_url: string | null;
  collaborators: string[];
  keywords: string[];
  status: ResearchStatus;
  start_date: string | null;
  end_date: string | null;
  external_url: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string | null;
  publication_type: PublicationType;
  year: number;
  abstract: string | null;
  pdf_url: string | null;
  arxiv_url: string | null;
  doi: string | null;
  bibtex: string | null;
  citation_count: number;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  experience_type: ExperienceType;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  highlights: string[];
  technologies: string[];
  logo_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string | null;
  date: string | null;
  description: string | null;
  url: string | null;
  icon: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_mdx: string;
  cover_image_url: string | null;
  tags: string[];
  reading_minutes: number;
  status: PostStatus;
  is_featured: boolean;
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  icon: string | null;
  display_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteConfig {
  id: string;
  key: string;
  value: Record<string, unknown> | unknown[];
  updated_at: string;
}
