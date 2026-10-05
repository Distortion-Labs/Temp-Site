import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import GradientSection from '@/components/GradientSection'
import BrowserMockup from '@/components/BrowserMockup'
import ProductActions from '@/components/ProductActions'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import Contact from '@/components/Contact'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/metadata'
import { getProduct, products } from '@/lib/products'
import { siteConfig } from '@/lib/site'

// Only the products defined in lib/products.ts exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}

  return pageMetadata({
    title: `${product.name} — ${product.category}`,
    description: product.summary,
    path: `/products/${product.slug}`,
  })
}

export default async function ProductPage({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome',
    url: `${siteConfig.url}/products/${product.slug}`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
  }

  return (
    <GradientSection>
      <JsonLd data={softwareJsonLd} />

      {/* Product hero */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] orb orb-cyan opacity-15 pointer-events-none" />
        <div className="container-main relative">
          <nav aria-label="Breadcrumb" className="mb-8 sm:mb-10 animate-fade-in-up">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li aria-current="page" className="text-white/70">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-primary-600 flex items-center justify-center shadow-glow-cyan flex-shrink-0">
                  <product.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 text-xs font-medium text-white/60 rounded-full glass-subtle">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    Available Now
                  </span>
                </div>
              </div>

              <h1 className="font-display text-display-lg font-bold text-white mb-4 text-balance">
                {product.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-xl">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <ProductActions product={product} />
              </div>
            </div>

            <div className="animate-fade-in-delay">
              <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-5">
                <BrowserMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-12 sm:py-16">
        <div className="container-main relative">
          <Reveal className="mb-10 sm:mb-12">
            <SectionHeading eyebrow="Features" title="Everything you need to find it fast" />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {product.features.map((feature, index) => (
              <Reveal
                key={feature.title}
                y={15}
                delay={index * 0.1}
                duration={0.4}
                margin="0px"
                className="glass-card rounded-2xl p-5 sm:p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-medium text-white mb-1.5">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] orb orb-purple opacity-15 pointer-events-none" />
        <div className="container-main relative">
          <Reveal className="mb-10 sm:mb-12">
            <SectionHeading eyebrow="How It Works" accent="primary" title="Three steps to every match" />
          </Reveal>

          <ol className="grid md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {product.steps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                y={15}
                delay={index * 0.1}
                duration={0.4}
                margin="0px"
                className="glass-card rounded-2xl p-5 sm:p-6"
              >
                <span className="inline-block font-mono text-sm text-gradient mb-3" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-medium text-white mb-1.5">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal y={10} margin="0px" className="mt-10 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-white/40 mb-3">Built for</p>
            <div className="flex flex-wrap justify-center gap-2">
              {product.audience.map((audience) => (
                <span
                  key={audience}
                  className="px-3 py-1.5 text-xs sm:text-sm text-white/60 bg-white/[0.03] rounded-lg border border-white/[0.05]"
                >
                  {audience}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Contact
        title={
          <>
            Questions or
            <span className="text-gradient"> feature requests?</span>
          </>
        }
        description={`We read every message. Tell us how you use ${product.name} and what would make it better.`}
      />
    </GradientSection>
  )
}
