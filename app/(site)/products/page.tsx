import GradientSection from '@/components/GradientSection'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import PipelineTeaser from '@/components/PipelineTeaser'
import Contact from '@/components/Contact'
import { pageMetadata } from '@/lib/metadata'
import { products } from '@/lib/products'

export const metadata = pageMetadata({
  title: 'Products',
  description:
    'Browser extensions and productivity tools by Distortion Labs, including Multi-Finder Pro for searching and highlighting multiple terms on any webpage.',
  path: '/products',
})

export default function ProductsPage() {
  return (
    <GradientSection>
      <PageHero
        eyebrow="Our Products"
        title={<>Tools we&apos;re building</>}
        description={<>We focus on creating software that solves real problems. Here&apos;s what we&apos;re working on.</>}
      />

      <section className="relative pt-8 sm:pt-12 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] orb orb-purple opacity-20 pointer-events-none animate-float-slow" />
        <div className="container-main relative">
          <div className="space-y-8 sm:space-y-12">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <PipelineTeaser />
        </div>
      </section>

      <Contact />
    </GradientSection>
  )
}
