import { ImageResponse } from "next/og";

import { getProjectBySlug } from "@/lib/queries";
import { PROJECT_TYPE_LABELS } from "@/lib/utils";

export const runtime = "edge";
export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const title = project?.title ?? "Project";
  const tagline = project?.tagline ?? project?.description ?? "";
  const typeLabel =
    PROJECT_TYPE_LABELS[project?.project_type ?? ""] ?? project?.project_type ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #050505 0%, #0a0a1a 40%, #0f0f2e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#3b82f6",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Project
            </span>
            {typeLabel && (
              <span
                style={{
                  fontSize: "13px",
                  color: "#6366f1",
                  border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: "6px",
                  padding: "2px 10px",
                }}
              >
                {typeLabel}
              </span>
            )}
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              background: "linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)",
              backgroundClip: "text",
              color: "transparent",
              maxWidth: "950px",
            }}
          >
            {title}
          </h1>

          {tagline && (
            <p
              style={{
                fontSize: "22px",
                color: "#a1a1aa",
                lineHeight: 1.5,
                maxWidth: "800px",
              }}
            >
              {tagline.length > 120 ? tagline.slice(0, 120) + "…" : tagline}
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(180deg, #3b82f6, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "white",
            }}
          >
            ✦
          </div>
          <span
            style={{ fontSize: "18px", fontWeight: 600, color: "#d4d4d8" }}
          >
            MD. Faysal Islam Fahad
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
