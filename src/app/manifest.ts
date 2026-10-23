import type { MetadataRoute } from "next";

import { PROFILE } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${PROFILE.role}`,
    short_name: "Faysal Islam Fahad",
    description: PROFILE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F1EA",
    theme_color: "#F4F1EA",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
