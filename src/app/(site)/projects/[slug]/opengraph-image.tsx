import { renderOg, OG_SIZE } from "@/lib/og";
import { getCaseStudy } from "@/content/work";
import { getProjectBySlug } from "@/lib/queries";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (cs) return renderOg({ kicker: `Case study · ${cs.name}`, title: cs.title });
  const p = await getProjectBySlug(slug);
  return renderOg({ kicker: "Work", title: p?.title ?? "Work" });
}
