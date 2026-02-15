'use client'

import { CheckCircle, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import GlassSurface from '@/components/GlassSurface'

const Silk = dynamic(() => import('@/components/Silk'), { ssr: false })

export default function EmailVerified() {
  return (
    <main className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-5">
      {/* Silk background */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={10.5}
          scale={0.7}
          color="#4f2b6e"
          noiseIntensity={2.6}
          rotation={3.3}
        />
      </div>

      {/* Main content */}
      <div className="container-main relative z-10">
        <div className="max-w-md mx-auto animate-fade-in-up">
          {/* Glass card */}
          <GlassSurface
            borderRadius={24}
            backgroundOpacity={0.06}
            saturation={1.4}
            brightness={48}
            blur={10}
            className="p-6 sm:p-8 md:p-10 text-center"
          >
            {/* Success icon */}
            <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
            </div>

            {/* Heading */}
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
              Email Verified!
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/50 mb-6 sm:mb-8 leading-relaxed">
              Your email has been successfully verified. You can now access all
              features of your account.
            </p>

            {/* CTA Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white rounded-xl sm:rounded-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Go to Homepage
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Support link */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
              <p className="text-xs sm:text-sm text-white/30">
                Having trouble?{' '}
                <a
                  href="mailto:contact@distortion-labs.com"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Contact support
                </a>
              </p>
            </div>
          </GlassSurface>

          {/* Brand link */}
          <div className="mt-6 text-center animate-fade-in-delay">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Distortion Labs
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
