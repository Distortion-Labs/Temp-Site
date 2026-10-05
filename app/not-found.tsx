import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GradientSection from '@/components/GradientSection'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

// Rendered outside the (site) layout, so it brings its own header and footer.
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative">
        <GradientSection>
          <section className="relative min-h-[75dvh] flex items-center pt-32 pb-20">
            <div className="container-main text-center animate-fade-in-up">
              <p className="font-mono text-sm sm:text-base text-gradient mb-4">404</p>
              <h1 className="font-display text-display-lg font-bold text-white mb-4 text-balance">
                This page bent out of reality
              </h1>
              <p className="text-base sm:text-lg text-white/50 max-w-md mx-auto mb-8 sm:mb-10">
                The page you&apos;re looking for doesn&apos;t exist or has moved.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-primary px-6 sm:px-8 py-3.5 text-sm sm:text-base font-medium text-white rounded-xl sm:rounded-2xl"
                >
                  <ArrowLeft className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Back to home</span>
                </Link>
                <Link
                  href="/products"
                  className="w-full sm:w-auto btn-glass px-6 sm:px-8 py-3.5 text-sm sm:text-base font-medium text-white/80 text-center rounded-xl sm:rounded-2xl"
                >
                  View products
                </Link>
              </div>
            </div>
          </section>
        </GradientSection>
      </main>
      <Footer />
    </>
  )
}
