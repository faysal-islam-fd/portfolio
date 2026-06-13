import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "MD. Faysal Islam Fahad — AI Solutions & Agent Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #050505 0%, #0a0a1a 40%, #0f0f2e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(180deg, #3b82f6, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "white",
            }}
          >
            ✦
          </div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#e4e4e7",
              letterSpacing: "-0.02em",
            }}
          >
            AI Solutions Architect
          </span>
        </div>

        <h1
          style={{
            marginTop: "40px",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            background: "linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)",
            backgroundClip: "text",
            color: "transparent",
            maxWidth: "900px",
          }}
        >
          MD. Faysal Islam Fahad
        </h1>

        <p
          style={{
            marginTop: "24px",
            fontSize: "28px",
            color: "#a1a1aa",
            lineHeight: 1.4,
            maxWidth: "700px",
          }}
        >
          AI Solutions & Agent Architect — Generative AI,
          LangGraph, RAG, Computer Vision
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "24px",
          }}
        >
          {["Services", "Projects", "Blog", "Contact"].map((label) => (
            <span
              key={label}
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#71717a",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                borderBottom: "2px solid rgba(59,130,246,0.4)",
                paddingBottom: "4px",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
