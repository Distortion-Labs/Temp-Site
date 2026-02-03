'use client'

import { motion } from 'framer-motion'
import {
  Chrome,
  Smartphone,
  Monitor,
  Plug,
  Shield,
  Settings,
} from 'lucide-react'

const features = [
  {
    icon: Chrome,
    title: 'Browser Extensions',
    description:
      'Powerful browser extensions that enhance productivity and transform how you interact with the web.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description:
      'Native and cross-platform mobile apps designed for performance, usability, and seamless user experiences.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Monitor,
    title: 'Desktop Software',
    description:
      'Robust desktop applications built with modern frameworks for Windows, macOS, and Linux platforms.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description:
      'Seamless API integrations that connect your systems and automate workflows across platforms.',
    gradient: 'from-orange-500 to-amber-600',
  },
  {
    icon: Shield,
    title: 'Security Tools',
    description:
      'Enterprise-grade security solutions to protect your data, users, and digital infrastructure.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Settings,
    title: 'Custom Solutions',
    description:
      'Tailored software solutions designed specifically for your unique business requirements and goals.',
    gradient: 'from-indigo-500 to-violet-600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Features() {
  return (
    <section id="features" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary-300 rounded-full glass border border-primary-500/20"
          >
            What We Build
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Powerful Solutions for
            <br />
            <span className="text-gradient">Modern Challenges</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We specialize in creating innovative software products that solve
            real problems and deliver exceptional user experiences.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-3xl glass-card glass-card-hover overflow-hidden">
                {/* Gradient glow on hover */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Icon container */}
                <div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom border gradient */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
