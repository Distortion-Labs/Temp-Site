export const siteConfig = {
  name: 'Distortion Labs',
  tagline: 'Software That Bends Reality',
  description:
    'Free, open-source Chrome extensions and productivity tools. Multi-Finder Pro lets you search and highlight multiple terms on any webpage simultaneously.',
  // Canonical origin used for metadata, sitemap and structured data. Override per environment if needed.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://distortion-labs.com').replace(/\/$/, ''),
  email: 'contact@distortion-labs.com',
  links: {
    github: 'https://github.com/Distortion-Labs',
    twitter: 'https://twitter.com',
  },
  techStack: ['React', 'TypeScript', 'Next.js', 'Chrome APIs', 'Node.js', 'Tailwind'],
}

export const mainNav = [
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]
