import { renderOg, OG_SIZE } from "@/lib/og";
import { PROFILE } from "@/content/profile";

export const alt = `${PROFILE.name} — ${PROFILE.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OGImage() {
  return renderOg({ kicker: PROFILE.role, title: PROFILE.headline });
}
