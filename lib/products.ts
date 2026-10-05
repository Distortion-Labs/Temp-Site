import { Search, Highlighter, Layers, Zap, type LucideIcon } from 'lucide-react'

export interface Product {
  slug: string
  name: string
  category: string
  icon: LucideIcon
  /** One-line pitch used in metadata and listings. */
  summary: string
  description: string
  features: { icon: LucideIcon; title: string; description: string }[]
  steps: { title: string; description: string }[]
  audience: string[]
  installUrl: string
  sourceUrl: string
}

export const products: Product[] = [
  {
    slug: 'multi-finder-pro',
    name: 'Multi-Finder Pro',
    category: 'Chrome Extension',
    icon: Search,
    summary: 'Search and highlight multiple terms on any webpage simultaneously.',
    description:
      'Find and highlight multiple words on any webpage simultaneously. Perfect for researchers, students, and anyone who needs to quickly locate multiple terms in long documents.',
    features: [
      {
        icon: Search,
        title: 'Multi-term Search',
        description: 'Find multiple words or phrases simultaneously on any webpage.',
      },
      {
        icon: Highlighter,
        title: 'Smart Highlighting',
        description: 'Each search term gets its own distinct color for easy identification.',
      },
      {
        icon: Layers,
        title: 'Persistent Results',
        description: 'Your highlights stay visible as you scroll through the page.',
      },
      {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Instant results with zero lag, even on content-heavy pages.',
      },
    ],
    steps: [
      {
        title: 'Add the extension',
        description: 'Install Multi-Finder Pro in Chrome so it is ready on any page you visit.',
      },
      {
        title: 'Enter your terms',
        description: 'Open it on the page you are reading and type the words or phrases you are looking for.',
      },
      {
        title: 'See every match at once',
        description: 'Each term lights up in its own color, and the highlights stay put as you scroll.',
      },
    ],
    audience: ['Researchers', 'Students', 'Anyone working with long documents'],
    installUrl: 'https://github.com/Sunu03/multi-finder-pro',
    sourceUrl: 'https://github.com/Sunu03/multi-finder-pro',
  },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}
