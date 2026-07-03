import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MD. Faysal Islam Fahad — AI Engineer & Researcher",
    short_name: "Faysal Portfolio",
    description:
      "Portfolio of MD. Faysal Islam Fahad — AI Engineer specializing in autonomous agents, RAG systems, and custom computer vision.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
