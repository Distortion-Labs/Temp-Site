'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

export default function EmailVerified() {
  return (
    <main className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-5">
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="orb w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] -top-20 -left-20 bg-emerald-500/30"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="orb orb-purple w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] -bottom-20 -right-20"
        />
      </div>

      {/* Main content */}
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          {/* Glass card */}
          <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl glass-card overflow-hidden text-center">
            {/* Gradient accents */}
            <div className="absolute -top-20 -right-20 w-40 h-40 orb bg-emerald-500/20" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 orb orb-primary opacity-20" />

            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600"
            >
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-emerald-500"
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3"
            >
              Email Verified!
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base text-white/50 mb-6 sm:mb-8 leading-relaxed"
            >
              Your email has been successfully verified. You can now access all
              features of your account.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white rounded-xl sm:rounded-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Go to Homepage
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Support link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10"
            >
              <p className="text-xs sm:text-sm text-white/30">
                Having trouble?{' '}
                <a
                  href="mailto:contact@distortion-labs.com"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Contact support
                </a>
              </p>
            </motion.div>
          </div>

          {/* Brand link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Distortion Labs
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
