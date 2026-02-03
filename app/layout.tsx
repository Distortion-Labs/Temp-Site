import type { Metadata, Viewport } from 'next'
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050208',
}

export const metadata: Metadata = {
  title: 'Distortion Labs | Software That Bends Reality',
  description: 'We build browser extensions and apps that enhance how you interact with the digital world. Currently shipping Multi-Finder Pro.',
  keywords: ['browser extensions', 'chrome extensions', 'productivity tools', 'multi-finder pro', 'software development'],
  authors: [{ name: 'Distortion Labs' }],
  openGraph: {
    title: 'Distortion Labs | Software That Bends Reality',
    description: 'Browser extensions and apps that enhance your digital experience.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Distortion Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Distortion Labs',
    description: 'Software That Bends Reality',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased bg-void text-white overflow-x-hidden">
        {/* Cosmic background */}
        <div className="fixed inset-0 bg-mesh pointer-events-none" aria-hidden="true" />
        {/* Noise texture overlay */}
        <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
