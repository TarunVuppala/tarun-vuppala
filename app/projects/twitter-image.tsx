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
            "linear-gradient(130deg, rgba(132, 99, 255, 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 10%, rgba(72, 255, 199, 0.2), transparent 50%)",
          color: "#f8fafc",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>
          Projects
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.05 }}>Selected Work</div>
          <div style={{ fontSize: 26, fontWeight: 500, opacity: 0.85 }}>{siteConfig.name}</div>
        </div>
        <div style={{ fontSize: 18, opacity: 0.6 }}>Engineering case studies and product builds.</div>
      </div>
    ),
    size
  )
}
