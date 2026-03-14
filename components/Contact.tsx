'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="section-space relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] orb orb-purple opacity-15 pointer-events-none" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
            {/* Badge */}
            <span className="inline-block px-3 py-1.5 mb-6 text-xs sm:text-sm font-medium text-cyan-400 rounded-full glass-subtle">
              Get In Touch
            </span>

            <h2 className="font-display text-display-md font-bold text-white mb-4 text-balance">
              Let&apos;s build something
              <span className="text-gradient"> together</span>
            </h2>

            <p className="text-base sm:text-lg text-white/50 mb-8 sm:mb-10 max-w-lg mx-auto">
              Have an idea for a browser extension or app? Want to collaborate?
              We&apos;d love to hear from you.
            </p>

            {/* Primary CTA */}
            <a
              href="mailto:contact@distortion-labs.com"
              className="inline-flex items-center gap-2 btn-primary px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white rounded-xl sm:rounded-2xl mb-6"
            >
              <Mail className="w-5 h-5" />
              <span className="relative z-10">Send us an email</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </a>

            {/* Subtle message */}
            <p className="text-xs sm:text-sm text-white/30">
              We typically respond within 24-48 hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
