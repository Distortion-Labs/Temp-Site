import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Distortion Labs | Creating Exceptional Software Experiences',
  description: 'Distortion Labs creates innovative digital products and solutions. We specialize in browser extensions, mobile applications, desktop software, and custom solutions.',
  keywords: ['software development', 'browser extensions', 'mobile apps', 'desktop software', 'API integration', 'custom solutions'],
  authors: [{ name: 'Distortion Labs' }],
  openGraph: {
    title: 'Distortion Labs | Creating Exceptional Software Experiences',
    description: 'Innovative digital products and solutions for the modern world.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Distortion Labs',
    description: 'Creating Exceptional Software Experiences',
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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {/* Background mesh gradient */}
        <div className="mesh-bg" aria-hidden="true" />
        {/* Subtle noise texture */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Main content */}
        {children}
      </body>
    </html>
  )
}
