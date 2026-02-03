'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Chrome, Sparkles } from 'lucide-react'

// Chromatic Aberration Text Component
function GlitchText({ children }: { children: string }) {
  return (
    <span className="glitch-wrapper relative inline-block">
      {/* Base text */}
      <span className="relative z-10 text-white">{children}</span>
      {/* Red channel - offset left */}
      <span
        className="glitch-layer glitch-red absolute inset-0 text-[#ff0000] opacity-70"
        aria-hidden="true"
      >
        {children}
      </span>
      {/* Cyan/Blue channel - offset right */}
      <span
        className="glitch-layer glitch-cyan absolute inset-0 text-[#00ffff] opacity-70"
        aria-hidden="true"
      >
        {children}
      </span>
      {/* Green channel - slight offset */}
      <span
        className="glitch-layer glitch-green absolute inset-0 text-[#00ff00] opacity-40"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  )
}

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-5">
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="orb orb-purple w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] -top-20 -left-20 sm:-top-40 sm:-left-40"
        />
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="orb orb-cyan w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] -bottom-20 -right-20 sm:-bottom-32 sm:-right-32"
        />
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -40, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="orb orb-rose w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] top-1/3 -right-10 sm:right-1/4 opacity-60"
        />
      </div>

      {/* Floating glass elements - desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
        className="absolute top-[20%] left-[8%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center"
        >
          <Chrome className="w-7 h-7 text-cyan-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.6, type: 'spring' }}
        className="absolute bottom-[25%] right-[10%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="w-14 h-14 glass-card rounded-xl flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-primary-400" />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-20 sm:pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 rounded-full glass-subtle"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-white/70">
            Now shipping Multi-Finder Pro
          </span>
        </motion.div>

        {/* Main heading with chromatic aberration effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-display-xl font-bold tracking-tight mb-4 sm:mb-6 text-balance"
        >
          <span className="text-white">Software that</span>
          <br className="hidden sm:block" />
          <span className="inline-block"> </span>
          <GlitchText>bends reality</GlitchText>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
        >
          We build browser extensions and apps that transform how you interact
          with the digital world. Small team, big ideas.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
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
        </motion.div>

        {/* Tech stack hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-6 text-white/30 text-xs sm:text-sm"
        >
          <span>Built with</span>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-white/40">React</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-mono text-white/40">TypeScript</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-mono text-white/40">Chrome APIs</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('#products')}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors"
          aria-label="Scroll to products"
        >
          <span className="text-xs hidden sm:block">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  )
}
