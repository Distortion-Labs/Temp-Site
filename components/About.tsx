'use client'

import { motion } from 'framer-motion'
import { Sparkles, Target, Users, Award, Rocket } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every line of code is crafted with purpose and attention to detail.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'We push boundaries and embrace cutting-edge technologies.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working closely with clients to bring their visions to life.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering products that exceed expectations.',
  },
]

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-accent-300 rounded-full glass border border-accent-500/20">
              <Sparkles className="w-4 h-4" />
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Building the Future of
              <span className="text-gradient"> Digital Innovation</span>
            </h2>

            <p className="text-lg text-white/60 mb-6 leading-relaxed">
              At Distortion Labs, we believe in the power of technology to
              transform ideas into reality. Our team of passionate developers
              and designers work together to create software that makes a
              difference.
            </p>

            <p className="text-white/50 mb-8 leading-relaxed">
              Founded with a vision to deliver exceptional software experiences,
              we&apos;ve grown into a trusted partner for businesses and individuals
              seeking innovative digital solutions. Our commitment to quality
              and user-centric design sets us apart.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group p-4 rounded-2xl glass-card hover:bg-white/[0.08] transition-all duration-300"
                >
                  <value.icon className="w-6 h-6 text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="font-semibold text-white mb-1">
                    {value.title}
                  </h4>
                  <p className="text-sm text-white/50">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative">
              {/* Floating decorative elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl glass border border-primary-500/30 flex items-center justify-center"
              >
                <div className="text-3xl font-bold text-gradient">10+</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-xl glass border border-accent-500/30 flex items-center justify-center"
              >
                <div className="text-2xl font-bold text-accent-400">5K+</div>
              </motion.div>

              {/* Main glass card */}
              <div className="relative p-8 md:p-10 rounded-3xl glass-strong overflow-hidden">
                {/* Gradient orbs */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full blur-[60px]" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-500/20 rounded-full blur-[60px]" />

                {/* Content */}
                <div className="relative space-y-8">
                  {/* Mission */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                      Our Mission
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      To empower individuals and businesses with software
                      solutions that are not just functional, but delightful to
                      use. We strive to set new standards in quality and
                      innovation.
                    </p>
                  </div>

                  {/* Approach */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full" />
                      Our Approach
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      We combine technical expertise with creative thinking to
                      deliver solutions that are both powerful and intuitive.
                      Every project is an opportunity to innovate.
                    </p>
                  </div>

                  {/* Stats row */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                          99%
                        </div>
                        <div className="text-xs text-white/40">Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                          24/7
                        </div>
                        <div className="text-xs text-white/40">Support</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                          50+
                        </div>
                        <div className="text-xs text-white/40">Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
