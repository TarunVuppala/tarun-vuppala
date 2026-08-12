import type { Metadata } from "next"
import type React from "react"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated collection of projects showcasing backend systems, AI engineering, performance, and product delivery.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "A curated collection of projects showcasing backend systems, AI engineering, performance, and product delivery.",
    url: "/projects",
    images: [
      {
        url: "/projects/opengraph-image",
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "A curated collection of projects showcasing backend systems, AI engineering, performance, and product delivery.",
    images: ["/projects/twitter-image"],
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
