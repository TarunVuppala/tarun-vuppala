import type { Metadata } from "next"
import type React from "react"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects from internships, college, and experiments with backend systems, real-time software, and AI.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "A collection of projects from internships, college, and experiments with backend systems, real-time software, and AI.",
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
      "Projects from internships, college, and experiments with backend systems, real-time software, and AI.",
    images: ["/projects/twitter-image"],
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
