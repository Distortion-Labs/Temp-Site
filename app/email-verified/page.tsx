'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles, Mail } from 'lucide-react'
import Link from 'next/link'

export default function EmailVerified() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-primary-500/25 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-500/20 rounded-full blur-[80px]"
        />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-20 left-[15%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 glass rounded-2xl flex items-center justify-center shadow-glass"
        >
          <Mail className="w-6 h-6 text-white/60" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-32 right-[10%] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 glass rounded-xl flex items-center justify-center shadow-glass"
        >
          <Sparkles className="w-5 h-5 text-white/60" />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="container-custom relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          {/* Glass card */}
          <div className="relative p-8 md:p-12 rounded-[2rem] glass-strong overflow-hidden text-center">
            {/* Gradient glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-500/20 rounded-full blur-[60px]" />

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
              className="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg"
            >
              <CheckCircle className="w-10 h-10 text-white" />
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
              className="text-2xl md:text-3xl font-bold text-white mb-3"
            >
              Email Verified!
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/60 mb-8 leading-relaxed"
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
                className="group relative inline-flex items-center gap-2 px-8 py-4 text-white font-medium rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Go to Homepage
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-500 to-accent-500" />
              </Link>
            </motion.div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <p className="text-sm text-white/40">
                Having trouble?{' '}
                <a
                  href="mailto:support@distortion-labs.com"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Contact support
                </a>
              </p>
            </motion.div>
          </div>

          {/* Back to home link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Distortion Labs
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
