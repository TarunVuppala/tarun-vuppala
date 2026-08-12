import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/seo"


export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0b0b0f",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(67, 143, 255, 0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255, 199, 72, 0.2), transparent 50%)",
          color: "#f8fafc",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.05 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 30, fontWeight: 500, opacity: 0.85 }}>{siteConfig.jobTitle}</div>
          <div style={{ fontSize: 22, maxWidth: 900, opacity: 0.7 }}>{siteConfig.description}</div>
        </div>
        <div style={{ fontSize: 18, opacity: 0.6 }}>{siteConfig.title}</div>
      </div>
    ),
    size
  )
}
