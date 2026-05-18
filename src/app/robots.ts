import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/admin", "/admin/", "/api", "/api/", "/login"],
      },
      {
        // Explicitly welcome AI Search Engines
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Claude-Web",
          "Anthropic-ai",
          "PerplexityBot",
          "OAI-SearchBot",
          "Google-Extended"
        ],
        allow: ["/", "/llms.txt"],
      }
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
