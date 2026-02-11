'use client'

import { motion } from 'framer-motion'
import { Search, Highlighter, Layers, Zap, ExternalLink, Chrome } from 'lucide-react'
import GlassSurface from './GlassSurface'

const features = [
  {
    icon: Search,
    title: 'Multi-term Search',
    description: 'Find multiple words or phrases simultaneously on any webpage.',
  },
  {
    icon: Highlighter,
    title: 'Smart Highlighting',
    description: 'Each search term gets its own distinct color for easy identification.',
  },
  {
    icon: Layers,
    title: 'Persistent Results',
    description: 'Your highlights stay visible as you scroll through the page.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant results with zero lag, even on content-heavy pages.',
  },
]

export default function Products() {
  return (
    <section id="products" className="section-space relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orb orb-purple opacity-20 pointer-events-none" />

      <div className="container-main relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <GlassSurface
            borderRadius={9999}
            brightness={40}
            className="inline-flex mb-4"
            contentClassName="px-3 py-1.5"
          >
            <span className="text-xs sm:text-sm font-medium text-cyan-400">Our Products</span>
          </GlassSurface>
          <h2 className="font-display text-display-md font-bold text-white mb-4 text-balance">
            Tools we&apos;re building
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            We focus on creating software that solves real problems. Here&apos;s what we&apos;re working on.
          </p>
        </motion.div>

        {/* Main product card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <GlassSurface
            borderRadius={24}
            brightness={35}
            backgroundOpacity={0.1}
            contentClassName="p-6 sm:p-8 md:p-10"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 orb orb-cyan opacity-30" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 orb orb-purple opacity-20" />

            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-primary-600 flex items-center justify-center shadow-glow-cyan">
                    <Search className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">Multi-Finder Pro</h3>
                    <p className="text-sm text-white/50">Chrome Extension</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  Available Now
                </span>
              </div>

              <p className="text-base sm:text-lg text-white/60 mb-8 max-w-2xl leading-relaxed">
                Find and highlight multiple words on any webpage simultaneously.
                Perfect for researchers, students, and anyone who needs to quickly
                locate multiple terms in long documents.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {features.map((feature) => (
                  <GlassSurface
                    key={feature.title}
                    borderRadius={12}
                    brightness={30}
                    opacity={0.7}
                    contentClassName="flex items-start gap-3 p-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-white/40">{feature.description}</p>
                    </div>
                  </GlassSurface>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <GlassSurface
                  as="a"
                  href="https://github.com/Sunu03/multi-finder-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  borderRadius={12}
                  brightness={40}
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  contentClassName="flex items-center justify-center gap-2 px-6 py-3.5"
                >
                  <Chrome className="w-5 h-5 text-white" />
                  <span className="text-sm sm:text-base font-medium text-white">Add to Chrome</span>
                  <ExternalLink className="w-4 h-4 text-white" />
                </GlassSurface>

                <GlassSurface
                  as="a"
                  href="https://github.com/Sunu03/multi-finder-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  borderRadius={12}
                  brightness={30}
                  opacity={0.7}
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  contentClassName="flex items-center justify-center gap-2 px-6 py-3.5"
                >
                  <span className="text-sm sm:text-base font-medium text-white/70">View on GitHub</span>
                  <ExternalLink className="w-4 h-4 text-white/70" />
                </GlassSurface>
              </div>
            </div>
          </GlassSurface>
        </motion.div>

        {/* Coming soon teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-12 max-w-4xl mx-auto"
        >
          <GlassSurface
            borderRadius={16}
            brightness={30}
            opacity={0.7}
            contentClassName="p-6 sm:p-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              In Development
            </div>
            <h4 className="font-display text-lg sm:text-xl font-semibold text-white mb-2">
              More tools coming soon
            </h4>
            <p className="text-sm sm:text-base text-white/40 max-w-md mx-auto">
              We&apos;re working on new browser extensions and apps. Stay tuned for updates.
            </p>
          </GlassSurface>
        </motion.div>
      </div>
    </section>
  )
}
