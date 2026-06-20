import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MD. Faysal Islam Fahad — Deep Learning Engineer & AI Researcher",
    short_name: "Faysal Portfolio",
    description:
      "Portfolio of MD. Faysal Islam Fahad — Deep Learning Engineer specializing in Vision Transformers, multimodal learning, and edge AI.",
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
