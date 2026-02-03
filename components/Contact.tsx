'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
    setEmail('')

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Main CTA card */}
          <div className="relative p-8 md:p-12 lg:p-16 rounded-[2.5rem] glass-strong overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/20 rounded-full blur-[100px]" />

            {/* Floating icons */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 right-8 w-12 h-12 rounded-xl glass flex items-center justify-center"
            >
              <Mail className="w-5 h-5 text-primary-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute bottom-8 left-8 w-10 h-10 rounded-lg glass flex items-center justify-center"
            >
              <Send className="w-4 h-4 text-accent-400" />
            </motion.div>

            {/* Content */}
            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow"
              >
                <Send className="w-7 h-7 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>

              <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
                Join our newsletter and be the first to know about new products,
                updates, and exclusive offers.
              </p>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-white/40">
                    <Mail className="w-5 h-5" />
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-36 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500/50 focus:bg-white/[0.07] transition-all duration-300"
                    required
                  />

                  <button
                    type="submit"
                    disabled={isLoading || isSubmitted}
                    className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-70 flex items-center gap-2"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Done
                      </>
                    ) : isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-4 text-sm text-white/40">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </form>

              {/* Success message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Thanks for subscribing!
                </motion.div>
              )}
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <motion.a
              href="mailto:contact@distortion-labs.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group p-6 rounded-2xl glass-card glass-card-hover flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Email Us</h4>
                <p className="text-sm text-white/50">
                  contact@distortion-labs.com
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 ml-auto group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-300" />
            </motion.a>

            <motion.a
              href="#features"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={(e) => {
                e.preventDefault()
                document
                  .querySelector('#features')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group p-6 rounded-2xl glass-card glass-card-hover flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Send className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">View Our Work</h4>
                <p className="text-sm text-white/50">Explore our solutions</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 ml-auto group-hover:text-accent-400 group-hover:translate-x-1 transition-all duration-300" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
