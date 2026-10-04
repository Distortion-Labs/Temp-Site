import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import BrowserMockup from './BrowserMockup'
import ProductActions from './ProductActions'
import Reveal from './Reveal'

/** Showcase card for a product: overview, preview, features and calls to action. */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Reveal y={30} margin="-50px" className="relative max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute -top-32 -right-32 w-64 h-64 orb orb-cyan opacity-30" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 orb orb-purple opacity-20" />

        <div className="relative">
          {/* Product header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-primary-600 flex items-center justify-center shadow-glow-cyan">
                <product.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  <Link href={`/products/${product.slug}`} className="hover:text-primary-200 transition-colors">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-white/50">{product.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                Available Now
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/60 mb-8 max-w-2xl leading-relaxed">
            {product.description}
          </p>

          {/* Product preview mockup */}
          <BrowserMockup className="mb-8" />

          {/* Features grid with staggered reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {product.features.map((feature, index) => (
              <Reveal
                key={feature.title}
                y={15}
                delay={index * 0.1}
                duration={0.4}
                margin="0px"
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-white/40">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <ProductActions product={product} />
            <Link
              href={`/products/${product.slug}`}
              className="group sm:ml-auto inline-flex items-center justify-center gap-1.5 px-2 py-2 text-sm font-medium text-primary-300 hover:text-primary-200 transition-colors"
            >
              Learn more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
