'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Chrome, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import to prevent SSR issues with WebGL
const WebGLDistortedText = dynamic(() => import('./WebGLDistortedText'), {
  ssr: false,
  loading: () => (
    <span className="text-white opacity-80">bends reality</span>
  )
})

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-5">
      {/* Static orbs - using CSS animations for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-purple w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] -top-20 -left-20 sm:-top-40 sm:-left-40 animate-float-slow" />
        <div className="orb orb-cyan w-[200px] h-[200px] sm:w-[450px] sm:h-[450px] -bottom-20 -right-20 sm:-bottom-32 sm:-right-32 animate-float-slower" />
        <div className="orb orb-rose w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] top-1/3 -right-10 sm:right-1/4 opacity-60 hidden sm:block" />
      </div>

      {/* Floating glass elements - desktop only */}
      <div className="absolute top-[20%] left-[8%] hidden lg:block animate-fade-in-delay">
        <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center animate-float">
          <Chrome className="w-7 h-7 text-cyan-400" />
        </div>
      </div>

      <div className="absolute bottom-[25%] right-[10%] hidden lg:block animate-fade-in-delay-2">
        <div className="w-14 h-14 glass-card rounded-xl flex items-center justify-center animate-float-alt">
          <Sparkles className="w-6 h-6 text-primary-400" />
        </div>
      </div>

      {/* Main content - fast load with minimal delays */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-20 sm:pt-24 animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 rounded-full glass-subtle">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-white/70">
            Now shipping Multi-Finder Pro
          </span>
        </div>

        {/* Main heading with WebGL distortion effect */}
        <h1 className="font-display text-display-xl font-bold tracking-tight mb-4 sm:mb-6">
          <span className="text-white">Software that</span>
          <br />
          <WebGLDistortedText>bends reality</WebGLDistortedText>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          We build browser extensions and apps that transform how you interact
          with the digital world. Small team, big ideas.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => scrollToSection('#products')}
            className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white rounded-xl sm:rounded-2xl"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Chrome className="w-4 h-4 sm:w-5 sm:h-5" />
              See Our Extensions
            </span>
          </button>

          <button
            onClick={() => scrollToSection('#about')}
            className="w-full sm:w-auto btn-glass px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white/80 rounded-xl sm:rounded-2xl"
          >
            Learn More
          </button>
        </div>

        {/* Tech stack hint */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-6 text-white/30 text-xs sm:text-sm animate-fade-in-delay">
          <span>Built with</span>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-white/40">React</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-mono text-white/40">TypeScript</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-mono text-white/40">Chrome APIs</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('#products')}
          className="flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors animate-bounce-slow"
          aria-label="Scroll to products"
        >
          <span className="text-xs hidden sm:block">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  )
}
