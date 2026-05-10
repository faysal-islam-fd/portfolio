import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/lib/queries";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? "Blog Post";
  const date = post?.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const readTime = post?.reading_minutes ? `${post.reading_minutes} min read` : "";

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
        {/* Grid pattern */}
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
            bottom: "-150px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
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
              Blog
            </span>
            {date && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#71717a",
                  letterSpacing: "0.05em",
                }}
              >
                · {date}
              </span>
            )}
            {readTime && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#71717a",
                  letterSpacing: "0.05em",
                }}
              >
                · {readTime}
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
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#d4d4d8",
            }}
          >
            MD. Faysal Islam Fahad
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
