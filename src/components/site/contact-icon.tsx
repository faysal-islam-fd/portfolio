import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  GraduationCap,
  Globe,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  email: Mail,
  twitter: Twitter,
  x: Twitter,
  scholar: GraduationCap,
  hf: BookOpen,
  huggingface: BookOpen,
  website: Globe,
};

export function ContactIcon({
  name,
  className = "h-4 w-4",
}: {
  name: string | null;
  className?: string;
}) {
  const key = (name ?? "").toLowerCase();
  const Icon = MAP[key] ?? ExternalLink;
  return <Icon className={className} />;
}
