import Hero from '@/components/Hero'
import GradientSection from '@/components/GradientSection'
import Products from '@/components/Products'
import About from '@/components/About'
import Contact from '@/components/Contact'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'

export const metadata = pageMetadata({ path: '/' })

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  email: siteConfig.email,
  sameAs: [siteConfig.links.github],
}

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <GradientSection>
        <Products />
        <About />
        <Contact />
      </GradientSection>
    </>
  )
}
