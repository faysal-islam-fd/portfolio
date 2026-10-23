import { renderOg, OG_SIZE } from "@/lib/og";
import { getPostBySlug } from "@/lib/queries";

export const alt = "Writing";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return renderOg({ kicker: "Writing", title: post?.title ?? "Writing" });
}
