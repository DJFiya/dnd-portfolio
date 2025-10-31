import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Cinzel_Decorative } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })
const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel-decorative",
})

export const metadata: Metadata = {
  title: "Daevik Jain",
  description: "A fantasy-themed portfolio showcasing legendary projects and epic quests",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cinzel.variable} ${cinzelDecorative.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
