import { products } from '@/lib/products'
import PipelineTeaser from './PipelineTeaser'
import ProductCard from './ProductCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

/** Home page products section. */
export default function Products() {
  return (
    <section id="products" className="section-space relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orb orb-purple opacity-25 pointer-events-none animate-float-slow" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] orb orb-cyan opacity-15 pointer-events-none animate-float-slower" />

      <div className="container-main relative">
        <Reveal className="mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Our Products"
            title={<>Tools we&apos;re building</>}
            description={<>We focus on creating software that solves real problems. Here&apos;s what we&apos;re working on.</>}
          />
        </Reveal>

        <div className="space-y-8 sm:space-y-12">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <PipelineTeaser />
      </div>
    </section>
  )
}
