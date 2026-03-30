import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/seo"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 600,
}

export const contentType = "image/png"

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: "#0b0b0f",
          backgroundImage:
            "linear-gradient(120deg, rgba(67, 143, 255, 0.18) 0%, transparent 40%), radial-gradient(circle at 85% 15%, rgba(255, 199, 72, 0.2), transparent 50%)",
          color: "#f8fafc",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>
          Full Stack Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.05 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 28, fontWeight: 500, opacity: 0.85 }}>{siteConfig.jobTitle}</div>
        </div>
        <div style={{ fontSize: 18, opacity: 0.6 }}>{siteConfig.description}</div>
      </div>
    ),
    size
  )
}
