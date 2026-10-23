import { renderOg, OG_SIZE } from "@/lib/og";
import { getService } from "@/content/services";

export const alt = "Service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  return renderOg({ kicker: "Service", title: s?.name ?? "Services" });
}
