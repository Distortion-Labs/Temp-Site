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
    // Earlier drafts of the site used /products and /about.
    return [
      { source: '/products', destination: '/work', permanent: true },
      { source: '/products/:slug', destination: '/work/:slug', permanent: true },
      { source: '/about', destination: '/studio', permanent: true },
    ]
  },
}

export default nextConfig
