export const canonicalSiteUrl = "https://www.tarunvuppala.me"

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_ENV === "production" ? canonicalSiteUrl : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")

export const siteUrl = (rawSiteUrl || (process.env.NODE_ENV === "production" ? canonicalSiteUrl : "http://localhost:3000")).replace(
  /\/$/,
  "",
)
export const resumeFilePath = "/Tarun-Vuppala-Resume.pdf"

export const socialProfiles = {
  github: "https://github.com/tarunvuppala",
  linkedin: "https://linkedin.com/in/tarun26",
  twitter: "https://x.com/tarunvuppala",
  email: "mailto:tarun.vuppala26@gmail.com",
} as const

export const siteConfig = {
  name: "Tarun Vuppala",
  title: "Tarun Vuppala - Backend & AI Engineer",
  description: "Backend and AI engineer building resilient systems, local AI applications, and modern web products.",
  keywords: [
    "Tarun Vuppala",
    "Tarun Vuppala Portfolio",
    "Tarun Vuppala Resume",
    "Tarun Vuppala Backend Engineer",
    "Tarun Vuppala AI Engineer",
    "Tarun Vuppala React",
    "V Tarun",
    "Tarun",
    "tarun",
    "tarun vuppala",
    "Backend Engineer",
    "AI Engineer",
    "React",
    "Next.js",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Frontend",
    "Backend",
  ],
  creator: "Tarun Vuppala",
  jobTitle: "Backend & AI Engineer",
  email: "tarun.vuppala26@gmail.com",
  sameAs: [canonicalSiteUrl, socialProfiles.github, socialProfiles.linkedin, socialProfiles.twitter],
  images: {
    openGraph: "/main.png",
  },
  location: {
    placename: process.env.NEXT_PUBLIC_GEO_PLACENAME || "Hyderabad",
    country: process.env.NEXT_PUBLIC_GEO_COUNTRY || "IN",
    region: process.env.NEXT_PUBLIC_GEO_REGION,
  },
}

export function getGeoMeta(): Record<string, string> {
  const meta: Record<string, string> = {}

  if (siteConfig.location.placename) {
    meta["geo.placename"] = siteConfig.location.placename
  }

  if (siteConfig.location.region) {
    meta["geo.region"] = siteConfig.location.region
  }

  return meta
}

export function getJsonLd() {
  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    url: siteUrl,
    image: `${siteUrl}${siteConfig.images.openGraph}`,
    sameAs: siteConfig.sameAs,
    email: siteConfig.email,
  }

  if (siteConfig.location.placename || siteConfig.location.country) {
    person.address = {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.placename,
      addressCountry: siteConfig.location.country,
    }
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteUrl,
    description: siteConfig.description,
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    inLanguage: "en",
  }

  return JSON.stringify([person, website])
}
