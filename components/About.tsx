'use client'

import { motion } from 'framer-motion'
import { Code2, Lightbulb, Heart, Rocket } from 'lucide-react'
import GlassSurface from './GlassSurface'

const principles = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'We write code that\'s readable, maintainable, and built to last.',
  },
  {
    icon: Lightbulb,
    title: 'User First',
    description: 'Every feature starts with a real problem that needs solving.',
  },
  {
    icon: Heart,
    title: 'Open Source',
    description: 'We believe in transparency and giving back to the community.',
  },
  {
    icon: Rocket,
    title: 'Ship Fast',
    description: 'We iterate quickly and learn from real user feedback.',
  },
]

export default function About() {
  return (
    <section id="about" className="section-space relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] orb orb-cyan opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] orb orb-purple opacity-15 pointer-events-none" />

      <div className="container-main relative">
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
            <span className="text-xs sm:text-sm font-medium text-primary-400">About Us</span>
          </GlassSurface>
          <h2 className="font-display text-display-md font-bold text-white mb-4 text-balance">
            A small team with
            <span className="text-gradient"> big ambitions</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <GlassSurface borderRadius={20} brightness={35} backgroundOpacity={0.08} className="mb-6" contentClassName="p-6 sm:p-8">
              <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full" />
                Our Story
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-white/50 leading-relaxed">
                <p>
                  Distortion Labs started with a simple idea: build tools that we
                  actually want to use. As developers ourselves, we got tired of
                  clunky software that overcomplicates simple tasks.
                </p>
                <p>
                  Our first product, Multi-Finder Pro, came from a real need.
                  We wanted to search for multiple terms on a webpage without
                  opening multiple find dialogs. So we built it.
                </p>
                <p>
                  We&apos;re not a big company with hundreds of employees.
                  We&apos;re a small, focused team that cares deeply about
                  craft and user experience. Every product we ship is
                  something we use daily.
                </p>
              </div>
            </GlassSurface>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {principles.map((principle) => (
                <GlassSurface key={principle.title} borderRadius={16} brightness={35} className="group" contentClassName="p-4 sm:p-5">
                  <principle.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mb-2 sm:mb-3 sm:group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="font-medium text-sm sm:text-base text-white mb-1">{principle.title}</h4>
                  <p className="text-xs sm:text-sm text-white/40 leading-relaxed">{principle.description}</p>
                </GlassSurface>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassSurface borderRadius={20} brightness={35} backgroundOpacity={0.08} contentClassName="p-6 sm:p-8 relative">
              <div className="absolute -top-20 -right-20 w-40 h-40 orb orb-purple opacity-30" />

              <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-3 relative">
                <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-primary-500 rounded-full" />
                What We Focus On
              </h3>

              <div className="space-y-6 relative">
                <GlassSurface borderRadius={12} brightness={28} opacity={0.7} contentClassName="p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <h4 className="font-medium text-white">Browser Extensions</h4>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Chrome extensions that enhance your browsing experience.
                    We build tools that integrate seamlessly with your workflow.
                  </p>
                </GlassSurface>

                <GlassSurface borderRadius={12} brightness={28} opacity={0.7} contentClassName="p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                    <h4 className="font-medium text-white">Web Applications</h4>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Modern web apps built with React and TypeScript.
                    Fast, accessible, and designed for real-world use.
                  </p>
                </GlassSurface>

                <GlassSurface borderRadius={12} brightness={28} opacity={0.7} contentClassName="p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <h4 className="font-medium text-white">Mobile Apps</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">Coming Soon</span>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Cross-platform mobile applications. Currently in the planning phase.
                  </p>
                </GlassSurface>
              </div>
            </GlassSurface>

            <GlassSurface borderRadius={16} brightness={30} opacity={0.7} className="mt-6" contentClassName="p-5 sm:p-6">
              <p className="text-xs sm:text-sm text-white/40 mb-3">Technologies we work with</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js', 'Chrome APIs', 'Node.js', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-mono text-white/50 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                    {tech}
                  </span>
                ))}
              </div>
            </GlassSurface>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
