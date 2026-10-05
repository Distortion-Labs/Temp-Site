'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw } from 'lucide-react'
import GradientSection from '@/components/GradientSection'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <GradientSection>
      <section className="relative min-h-[75dvh] flex items-center pt-32 pb-20">
        <div className="container-main text-center animate-fade-in-up">
          <h1 className="font-display text-display-md font-bold text-white mb-4 text-balance">
            Something went wrong
          </h1>
          <p className="text-base sm:text-lg text-white/50 max-w-md mx-auto mb-8 sm:mb-10">
            An unexpected error occurred while loading this page. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={reset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-primary px-6 sm:px-8 py-3.5 text-sm sm:text-base font-medium text-white rounded-xl sm:rounded-2xl"
            >
              <RotateCcw className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Try again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto btn-glass px-6 sm:px-8 py-3.5 text-sm sm:text-base font-medium text-white/80 text-center rounded-xl sm:rounded-2xl"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </GradientSection>
  )
}
