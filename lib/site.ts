export const siteConfig = {
  name: 'Distortion Labs',
  tagline: 'Independent software studio',
  description:
    'Distortion Labs is an independent software studio. We design and build browser extensions, creative tools and websites, from first sketch to shipped product.',
  // Canonical origin used for metadata, sitemap and structured data. Override per environment if needed.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://distortion-labs.com').replace(/\/$/, ''),
  email: 'contact@distortion-labs.com',
  links: {
    github: 'https://github.com/Distortion-Labs',
  },
}

export const mainNav = [
  { name: 'Work', href: '/work' },
  { name: 'Studio', href: '/studio' },
  { name: 'Contact', href: '/contact' },
]

export const capabilities = [
  {
    title: 'Browser extensions',
    body: 'Manifest V3, in-page interfaces that sit politely on top of any site, accounts and sync.',
  },
  {
    title: 'Product software',
    body: 'Web apps with real editors, offline support and the boring-but-vital parts: auth, billing, data.',
  },
  {
    title: 'Websites & stores',
    body: 'Editorial sites, commerce and the admin tools that keep them running.',
  },
  {
    title: 'Interactive & 3D',
    body: 'WebGL, motion and the small details that make an interface feel made rather than assembled.',
  },
]

export const stack = ['TypeScript', 'React', 'Next.js', 'Chrome APIs', 'Supabase', 'Stripe', 'three.js', 'Tailwind']

export const principles = [
  {
    title: 'We use what we make.',
    body: 'Our products start as tools we needed ourselves, and we keep using them after they ship. It is the fastest way to find out what is wrong with them.',
  },
  {
    title: 'Fewer features, finished.',
    body: 'We would rather ship one thing that feels inevitable than five that feel provisional. Scope is a design decision.',
  },
  {
    title: 'Design and engineering in one room.',
    body: 'The person drawing the interface is the person building it, so the details survive the handoff — because there isn’t one.',
  },
]
