import type { Metadata } from "next"
import type React from "react"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated collection of projects that showcase problem-solving, performance, and modern full-stack engineering.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "A curated collection of projects that showcase problem-solving, performance, and modern full-stack engineering.",
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
      "A curated collection of projects that showcase problem-solving, performance, and modern full-stack engineering.",
    images: ["/projects/twitter-image"],
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
