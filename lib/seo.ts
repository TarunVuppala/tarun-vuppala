const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")

export const siteUrl = (rawSiteUrl || "http://localhost:3000").replace(/\/$/, "")
export const resumeFilePath = "/Tarun-Vuppala-Resume.pdf"

export const siteConfig = {
  name: "Tarun Vuppala",
  title: "Tarun Vuppala - Full Stack Developer",
  description: "Backend-first problem solver building resilient systems and modern web apps.",
  keywords: [
    "Tarun Vuppala",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Frontend",
    "Backend",
  ],
  creator: "Tarun Vuppala",
  jobTitle: "Full Stack Developer",
  email: "tarun.vuppala26@gmail.com",
  sameAs: [
    "https://github.com/tarunvuppala",
    "https://linkedin.com/in/tarun26",
    "https://x.com/tarunvuppala",
  ],
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
