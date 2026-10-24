import type { MetadataRoute } from "next";

import { PROFILE } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${PROFILE.role}`,
    short_name: "Faysal Islam Fahad",
    description: PROFILE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0C2642",
    theme_color: "#0C2642",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
