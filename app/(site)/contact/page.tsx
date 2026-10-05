import { ArrowUpRight, Clock, Github, Mail } from 'lucide-react'
import GradientSection from '@/components/GradientSection'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { getContactConfig } from '@/lib/contact'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'
import ContactForm from './ContactForm'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Distortion Labs — ideas for an extension or app, collaborations, feedback or support.',
  path: '/contact',
})

const contactDetails = [
  {
    icon: Mail,
    title: 'Email',
    body: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Clock,
    title: 'Response time',
    body: 'We typically respond within 24-48 hours.',
  },
  {
    icon: Github,
    title: 'GitHub',
    body: 'Follow our work and open issues on our projects.',
    href: siteConfig.links.github,
    external: true,
  },
]

export default function ContactPage() {
  const formEnabled = getContactConfig() !== null

  return (
    <GradientSection>
      <PageHero
        eyebrow="Get In Touch"
        title={
          <>
            Let&apos;s build something
            <span className="text-gradient"> together</span>
          </>
        }
        description={
          <>
            Have an idea for a browser extension or app? Want to collaborate?
            We&apos;d love to hear from you.
          </>
        }
      />

      <section className="section-space pt-8 sm:pt-12 md:pt-16 lg:pt-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] orb orb-purple opacity-15 pointer-events-none" />

        <div className="container-main relative">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
            <Reveal className="lg:col-span-3">
              {formEnabled ? (
                <ContactForm />
              ) : (
                <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-10">
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-2">
                    Send us an email
                  </h2>
                  <p className="text-sm sm:text-base text-white/50 mb-8">
                    Tell us a bit about your idea, project or question and we&apos;ll get back to you.
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 btn-primary px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white rounded-xl sm:rounded-2xl"
                  >
                    <Mail className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Send us an email</span>
                    <ArrowUpRight className="w-4 h-4 relative z-10" />
                  </a>
                </div>
              )}
            </Reveal>

            <Reveal className="lg:col-span-2 space-y-4" delay={0.15}>
              {contactDetails.map((detail) => {
                const content = (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0">
                      <detail.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-white mb-0.5 flex items-center gap-1">
                        {detail.title}
                        {detail.href && <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors" />}
                      </h3>
                      <p className="text-sm text-white/40 break-words">{detail.body}</p>
                    </div>
                  </>
                )

                const className = 'group flex items-start gap-4 p-5 rounded-2xl glass-subtle'
                return detail.href ? (
                  <a
                    key={detail.title}
                    href={detail.href}
                    {...(detail.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`${className} hover:bg-white/[0.06] transition-colors duration-300`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={detail.title} className={className}>
                    {content}
                  </div>
                )
              })}
            </Reveal>
          </div>
        </div>
      </section>
    </GradientSection>
  )
}
