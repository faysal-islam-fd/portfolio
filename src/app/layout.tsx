import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import { absoluteUrl } from "@/lib/utils";

const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "AI Researcher Portfolio";
const SITE_DESC =
  "Deep Learning Engineer & AI Researcher specializing in Vision Transformers, multimodal learning, and edge AI.";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    "Deep Learning",
    "AI Research",
    "Computer Vision",
    "Vision Transformers",
    "Machine Learning",
    "PyTorch",
    "Multimodal AI",
    "AI Researcher Portfolio",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl(),
    title: SITE_NAME,
    description: SITE_DESC,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
    images: ["/og.svg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="font-sans antialiased grain min-h-screen"
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          toastOptions={{
            classNames: {
              toast:
                "!bg-ink-900/95 !backdrop-blur-xl !border !border-white/10 !text-zinc-100",
              title: "!text-white",
              description: "!text-zinc-300",
            },
          }}
        />
      </body>
    </html>
  );
}
