import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/theme-provider"
import SiteAtmosphere from "@/components/site-atmosphere"
import { getGeoMeta, getJsonLd, siteConfig, siteUrl } from "@/lib/seo"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | Tarun Vuppala",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.creator,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/main.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/twitter-image"],
    creator: "@tarunvuppala",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    ...getGeoMeta(),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = getJsonLd()

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteAtmosphere />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
