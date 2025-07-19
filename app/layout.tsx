import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tarun Vuppala - Full Stack Developer",
  description:
    "Full Stack Developer crafting digital experiences that solve real problems and scale beautifully. Specializing in React, Next.js, and modern web technologies.",
  keywords:
    "Tarun Vuppala, Full Stack Developer, React, Next.js, Web Development, JavaScript, TypeScript, Frontend, Backend",
  authors: [{ name: "Tarun Vuppala" }],
  creator: "Tarun Vuppala",
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
