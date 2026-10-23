import { ImageResponse } from "next/og";

import { PROFILE } from "@/content/profile";

export const OG_SIZE = { width: 1200, height: 630 };

const PAPER = "#F4F1EA";
const INK = "#161513";
const MUTED = "#6E6A60";
const LINE = "#D6CFC0";
const SIGNAL = "#C43E1A";

/** Fetches a Google font as TTF so Satori can render it. */
async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`Font not found: ${family}`);
  return (await fetch(match[1])).arrayBuffer();
}

/**
 * Brand OG card: paper background, serif title, mono metadata.
 * Falls back to the default font if Google Fonts can't be reached.
 */
export async function renderOg({
  kicker,
  title,
  footer = PROFILE.principle,
}: {
  kicker: string;
  title: string;
  footer?: string;
}) {
  const header = `${PROFILE.name.toUpperCase()} — ${kicker.toUpperCase()}`;
  const fonts: { name: string; data: ArrayBuffer; style: "normal"; weight: 400 }[] = [];
  try {
    fonts.push({
      name: "Serif",
      data: await loadGoogleFont("Instrument+Serif", title + footer),
      style: "normal",
      weight: 400,
    });
    fonts.push({
      name: "Mono",
      data: await loadGoogleFont("Geist+Mono", header + "faysalislamfahad.dev"),
      style: "normal",
      weight: 400,
    });
  } catch {
    // Render with the built-in font rather than failing the image.
  }
  const serif = fonts.length ? "Serif" : "serif";
  const mono = fonts.length > 1 ? "Mono" : "monospace";
  const titleSize = title.length > 70 ? 64 : title.length > 40 ? 78 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: PAPER,
          color: INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: mono, fontSize: 20, letterSpacing: 2, color: MUTED }}>
          <div style={{ width: 14, height: 14, background: SIGNAL }} />
          {header}
        </div>

        <div style={{ display: "flex", fontFamily: serif, fontSize: titleSize, lineHeight: 1.02, letterSpacing: -1, maxWidth: 1040 }}>
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", fontFamily: serif, fontSize: 34, color: SIGNAL }}>{footer}</div>
          <div style={{ display: "flex", fontFamily: mono, fontSize: 20, color: MUTED }}>faysalislamfahad.dev</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined }
  );
}
