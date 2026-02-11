'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import GlassSurface from './GlassSurface'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Distortion-Labs',
    icon: Github,
    color: 'hover:text-white',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
    color: 'hover:text-cyan-400',
  },
  {
    name: 'Email',
    href: 'mailto:contact@distortion-labs.com',
    icon: Mail,
    color: 'hover:text-primary-400',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-space relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/20 to-void pointer-events-none" />

      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Badge */}
          <GlassSurface
            borderRadius={9999}
            brightness={40}
            className="inline-flex mb-4"
            contentClassName="px-3 py-1.5"
          >
            <span className="text-xs sm:text-sm font-medium text-cyan-400">Get In Touch</span>
          </GlassSurface>

          <h2 className="font-display text-display-md font-bold text-white mb-4 text-balance">
            Let&apos;s build something
            <span className="text-gradient"> together</span>
          </h2>

          <p className="text-base sm:text-lg text-white/50 mb-8 sm:mb-10 max-w-lg mx-auto">
            Have an idea for a browser extension or app? Want to collaborate?
            We&apos;d love to hear from you.
          </p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-10 sm:mb-12"
          >
            <GlassSurface
              as="a"
              href="mailto:contact@distortion-labs.com"
              borderRadius={16}
              brightness={40}
              className="inline-flex cursor-pointer hover:scale-105 transition-transform duration-300"
              contentClassName="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4"
            >
              <Mail className="w-5 h-5 text-white" />
              <span className="text-sm sm:text-base font-medium text-white">Send us an email</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </GlassSurface>
          </motion.div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <GlassSurface
                  as="a"
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  borderRadius={16}
                  brightness={35}
                  className={`w-12 h-12 sm:w-14 sm:h-14 text-white/50 ${link.color} transition-colors duration-300`}
                  contentClassName="flex items-center justify-center"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </GlassSurface>
              </motion.div>
            ))}
          </div>

          {/* Subtle message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 sm:mt-12 text-xs sm:text-sm text-white/30"
          >
            We typically respond within 24-48 hours
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
