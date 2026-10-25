import "@/styles/globals.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://noor.example"
  ),
  title: "Noor Studio — A Maeen Alganimi booking demo",
  description:
    "A little time for yourself. Explore services and try English and Arabic online booking at Noor Studio, a fictional demo.",
  robots: { index: false, follow: false },
}

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
