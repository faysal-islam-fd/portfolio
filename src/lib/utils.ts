import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  input: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  }
) {
  if (!input) return "";
  const date = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatDateRange(
  start: string | Date | null | undefined,
  end: string | Date | null | undefined,
  isCurrent = false
) {
  const left = formatDate(start);
  if (isCurrent) return `${left} — Present`;
  const right = end ? formatDate(end) : "Present";
  return `${left} — ${right}`;
}

export function readingTime(text: string, wpm = 220) {
  const words = text?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / wpm));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string | null | undefined, len = 160) {
  if (!text) return "";
  if (text.length <= len) return text;
  return text.slice(0, len).trimEnd() + "…";
}

export function absoluteUrl(path = "") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    (process.env.NODE_ENV === "production"
      ? "https://www.faysalislamfahad.dev"
      : "http://localhost:3000");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  deep_learning: "Deep Learning & Transformers",
  computer_vision: "Computer Vision & ViTs",
  nlp: "Generative AI & Agents",
  ml_frameworks: "ML Frameworks",
  languages: "Programming Languages",
  tools: "Tools & Ops",
  cloud: "Cloud & Deployment",
  web: "Web Integration",
};

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  research: "AI Agent & Automation",
  computer_vision: "Computer Vision",
  nlp: "Gen AI & RAG",
  multimodal: "Multimodal AI",
  reinforcement_learning: "Reinforcement Learning",
  web: "Web App",
  tool: "AI Tool / MCP",
};

export const PUBLICATION_TYPE_LABELS: Record<string, string> = {
  conference: "Conference",
  journal: "Journal",
  workshop: "Workshop",
  preprint: "Preprint",
  thesis: "Thesis",
  book_chapter: "Book Chapter",
};

export const RESEARCH_STATUS_LABELS: Record<string, string> = {
  in_progress: "In Development",
  under_review: "Beta",
  accepted: "Available",
  published: "Active",
  completed: "Ready",
};
