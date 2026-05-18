import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import { absoluteUrl } from "@/lib/utils";

const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "MD. Faysal Islam Fahad";
const FULL_TITLE = "MD. Faysal Islam Fahad — Deep Learning Engineer";
const SITE_DESC =
  "MD. Faysal Islam Fahad is a Deep Learning Engineer specializing in Computer Vision, multimodal learning, and edge AI. Explore his projects, research, and blog.";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: FULL_TITLE,
    template: `%s | MD. Faysal Islam Fahad`,
  },
  description: SITE_DESC,
  keywords: [
    // ── Name variations (so people can find you) ──
    "MD Faysal Islam Fahad",
    "Faysal Islam Fahad",
    "Faysal Islam",
    "Faysal Fahad",
    "MD Faysal",
    "Faysal Islam Fahad portfolio",
    "Faysal Islam Fahad AI",
    "Faysal Islam Fahad deep learning",
    // ── Technical keywords ──
    "Deep Learning",
    "AI Research",
    "Computer Vision",
    "Vision Transformers",
    "Machine Learning",
    "PyTorch",
    "TensorFlow",
    "Multimodal AI",
    "Edge AI",
    "Model Optimization",
    "ONNX",
    "AI Researcher Portfolio",
    "Deep Learning Portfolio",
    "AI Engineer",
    "Neural Networks",
    "Self-Supervised Learning",
  ],
  authors: [{ name: "MD. Faysal Islam Fahad", url: absoluteUrl() }],
  creator: "MD. Faysal Islam Fahad",
  publisher: "MD. Faysal Islam Fahad",
  category: "technology",
  alternates: {
    canonical: absoluteUrl(),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl(),
    title: FULL_TITLE,
    description: SITE_DESC,
    siteName: SITE_NAME,
    // OG image is auto-discovered from opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
    description: SITE_DESC,
    creator: "@faysal_islam_fd",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Uncomment and add your Google Search Console verification code:
  verification: {
    google: "oUlOeEFQgnYmSyBB9rWk7QoW6q9GoWgO6fHtViItV2s",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "MD. Faysal Islam Fahad",
    "alternateName": ["Faysal Islam", "Faysal Fahad", "MD Faysal", "Faysal Islam Fahad"],
    "jobTitle": "Deep Learning Engineer",
    "description": SITE_DESC,
    "url": absoluteUrl(),
    "sameAs": [
      "https://github.com/faysalfahad",
      "https://linkedin.com/in/faysalfahad",
      "https://twitter.com/faysalfahad"
    ],
    "knowsAbout": [
      "Deep Learning",
      "Computer Vision",
      "Vision Transformers",
      "Artificial Intelligence",
      "Machine Learning",
      "Multimodal AI",
      "Edge AI"
    ]
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="font-sans antialiased grain min-h-screen"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          toastOptions={{
            classNames: {
              toast:
                "!bg-ink-900/95 ! !border !border-white/10 !text-zinc-100",
              title: "!text-white",
              description: "!text-zinc-300",
            },
          }}
        />
      </body>
    </html>
  );
}
