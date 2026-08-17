import { canonicalSiteUrl, resumeFilePath, siteConfig, socialProfiles } from "@/lib/data"

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_ENV === "production" ? canonicalSiteUrl : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")

export const siteUrl = (rawSiteUrl || (process.env.NODE_ENV === "production" ? canonicalSiteUrl : "http://localhost:3000")).replace(
  /\/$/,
  "",
)
export { resumeFilePath, siteConfig, socialProfiles, canonicalSiteUrl }

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
