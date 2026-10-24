import type { Metadata, Viewport } from "next";
import {
  Barlow,
  Barlow_Condensed,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
} from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { absoluteUrl } from "@/lib/utils";
import { CHANNELS, PROFILE, STACK } from "@/content/profile";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
// Public-site typefaces. The admin panel keeps Geist; `.site` swaps the
// --font-sans / --font-mono variables over to these (see globals.css).
const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const cond = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cond",
  display: "swap",
});
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const FULL_TITLE = `${PROFILE.name} — ${PROFILE.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: FULL_TITLE,
    template: `%s | ${PROFILE.name}`,
  },
  description: PROFILE.description,
  keywords: [
    // Name variations (so people can find you)
    "Faysal Islam Fahad",
    "MD Faysal Islam Fahad",
    "Faysal Islam",
    "Faysal Fahad",
    // What clients search for
    "full-stack AI engineer",
    "freelance AI engineer",
    "AI agent developer",
    "LLM application developer",
    "RAG developer",
    "AI copilot development",
    "LangChain developer",
    "LangGraph developer",
    "FastAPI developer",
    "Next.js developer",
    "AI MVP development",
    "sales forecasting machine learning",
    "AI engineer Bangladesh",
  ],
  authors: [{ name: PROFILE.name, url: absoluteUrl() }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  category: "technology",
  alternates: {
    canonical: absoluteUrl(),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl(),
    title: FULL_TITLE,
    description: PROFILE.description,
    siteName: PROFILE.name,
    // OG image is auto-discovered from opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
    description: PROFILE.description,
    creator: "@faysal_islam_fd",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
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
  verification: {
    google: "oUlOeEFQgnYmSyBB9rWk7QoW6q9GoWgO6fHtViItV2s",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0C2642" },
    { media: "(prefers-color-scheme: dark)", color: "#0C2642" },
  ],
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
    "@id": `${absoluteUrl()}#person`,
    name: PROFILE.name,
    alternateName: [PROFILE.legalName, "Faysal Islam", "Faysal Fahad"],
    jobTitle: PROFILE.role,
    description: PROFILE.description,
    url: absoluteUrl(),
    email: `mailto:${PROFILE.email}`,
    homeLocation: {
      "@type": "Place",
      name: PROFILE.location,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Bangladesh University of Business & Technology",
    },
    sameAs: CHANNELS.filter((c) => c.href.startsWith("http")).map(
      (c) => c.href
    ),
    knowsAbout: [
      "Large language model applications",
      "AI agents",
      "Retrieval-augmented generation",
      ...STACK.flatMap((g) => g.items).slice(0, 14),
    ],
  };

  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${body.variable} ${cond.variable} ${plex.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased grain min-h-screen"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="bottom-right" theme="system" richColors />
      </body>
    </html>
  );
}
