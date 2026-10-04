import { Chrome, ExternalLink } from 'lucide-react'
import type { Product } from '@/lib/products'

/** Primary install + source links for a product. */
export default function ProductActions({ product }: { product: Product }) {
  return (
    <>
      <a
        href={product.installUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary px-6 py-3.5 text-sm sm:text-base font-medium text-white rounded-xl flex items-center justify-center gap-2"
      >
        <Chrome className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Add to Chrome</span>
        <ExternalLink className="w-4 h-4 relative z-10" />
      </a>
      <a
        href={product.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glass px-6 py-3.5 text-sm sm:text-base font-medium text-white/70 rounded-xl flex items-center justify-center gap-2"
      >
        View on GitHub
        <ExternalLink className="w-4 h-4" />
      </a>
    </>
  )
}
