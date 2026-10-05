import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { projects } from '@/lib/work'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const pages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/work`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/studio`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${siteConfig.url}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const casePages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...pages, ...casePages]
}
