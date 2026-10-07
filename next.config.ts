import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      // The studio moved from distortion-labs.com to distortionlens.com. Keep old links (and
      // email-verification links) working by sending every path on the old host to the new one.
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?:www\\.)?distortion-labs\\.com' }],
        destination: 'https://distortionlens.com/:path*',
        permanent: true,
      },
      // Earlier drafts of the site used /products and /about.
      { source: '/products', destination: '/work', permanent: true },
      { source: '/products/:slug', destination: '/work/:slug', permanent: true },
      { source: '/about', destination: '/studio', permanent: true },
    ]
  },
}

export default nextConfig
