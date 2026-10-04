import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site'
import Reveal from './Reveal'

interface ContactProps {
  title?: React.ReactNode
  description?: React.ReactNode
}

/** Call-to-action card pointing to the contact page; shown at the bottom of most pages. */
export default function Contact({
  title = (
    <>
      Let&apos;s build something
      <span className="text-gradient"> together</span>
    </>
  ),
  description = (
    <>
      Have an idea for a browser extension or app? Want to collaborate?
      We&apos;d love to hear from you.
    </>
  ),
}: ContactProps) {
  return (
    <section id="contact" className="section-space relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] orb orb-purple opacity-15 pointer-events-none" />

      <div className="container-main relative">
        <Reveal className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
            {/* Badge */}
            <span className="inline-block px-3 py-1.5 mb-6 text-xs sm:text-sm font-medium text-cyan-400 rounded-full glass-subtle">
              Get In Touch
            </span>

            <h2 className="font-display text-display-md font-bold text-white mb-4 text-balance">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-white/50 mb-8 sm:mb-10 max-w-lg mx-auto">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-primary px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white rounded-xl sm:rounded-2xl"
              >
                <span className="relative z-10">Start a conversation</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-glass px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white/80 rounded-xl sm:rounded-2xl"
              >
                <Mail className="w-5 h-5" />
                Email us
              </a>
            </div>

            {/* Subtle message */}
            <p className="text-xs sm:text-sm text-white/30">
              We typically respond within 24-48 hours
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
