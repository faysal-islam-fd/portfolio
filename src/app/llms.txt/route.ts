import { absoluteUrl } from "@/lib/utils";
import { CHANNELS, PROFILE, STACK } from "@/content/profile";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/work";

export const revalidate = 86400; // Cache for a day

export async function GET() {
  const markdown = `# ${PROFILE.name}

> ${PROFILE.description}

## Identity
- Name: ${PROFILE.name} (also written ${PROFILE.legalName})
- Role: ${PROFILE.role}
- Location: ${PROFILE.location} (${PROFILE.timezone}); works remotely with clients worldwide
- Website: ${absoluteUrl()}
${CHANNELS.map((c) => `- ${c.label}: ${c.href.replace("mailto:", "")}`).join("\n")}

## Approach
${PROFILE.principle} Deterministic code makes decisions with consequences; models read, interpret and draft; every model output is validated, and each model call has a fallback path.

## Services
${SERVICES.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.promise}`).join("\n")}

## Case studies
${CASE_STUDIES.map((c) => `- [${c.name}](${absoluteUrl(`/projects/${c.slug}`)}) (${c.year}, ${c.status}): ${c.summary}`).join("\n")}

## Stack
${STACK.map((g) => `- ${g.group}: ${g.items.join(", ")}`).join("\n")}

## Background
- B.Sc. in Computer Science & Engineering, Bangladesh University of Business & Technology
- Backend developer, Rangpur IT (Sep 2025 – May 2026)

## Contact
To hire or collaborate, use ${absoluteUrl("/contact")} or email ${PROFILE.email}.
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
