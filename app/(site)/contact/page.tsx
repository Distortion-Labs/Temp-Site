import { ArrowUpRight } from 'lucide-react'
import PageIntro from '@/components/PageIntro'
import { getContactConfig } from '@/lib/contact'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'
import ContactForm from './ContactForm'

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Start a project with DistortionLens, ask about one of our products, or just say hello.',
  path: '/contact',
})

const [emailUser, emailDomain] = siteConfig.email.split('@')

const details = [
  { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: 'Replies', value: 'Usually within 24–48 hours' },
  { label: 'GitHub', value: 'github.com/Distortion-Labs', href: siteConfig.links.github, external: true },
]

export default function ContactPage() {
  const formEnabled = getContactConfig() !== null

  return (
    <>
      <PageIntro label="Contact" title="Tell us what you're making.">
        A new product, a website, a question about Multi-Finder Pro — or just hello. Every message is read by the
        people who&apos;d do the work.
      </PageIntro>

      <section aria-label="Get in touch" className="container-site pb-28 pt-20 sm:pb-40 sm:pt-28">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-12 sm:gap-6">
          <dl className="min-w-0 space-y-6 sm:col-span-3">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="label text-muted">{d.label}</dt>
                <dd className="mt-1.5 text-small">
                  {d.href ? (
                    <a
                      href={d.href}
                      {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group inline-flex items-center gap-1"
                    >
                      <span className="link">{d.value}</span>
                      <ArrowUpRight className="nudge h-3.5 w-3.5" strokeWidth={1.75} />
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="min-w-0 sm:col-span-9 lg:col-span-7">
            {formEnabled ? (
              <ContactForm />
            ) : (
              <div className="border-t border-ink pt-8">
                <p className="label text-muted">Write to us</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group mt-4 inline-flex items-center gap-3 text-[clamp(1.5rem,1rem+2.4vw,3rem)] font-medium tracking-[-0.03em]"
                >
                  <span className="link [overflow-wrap:anywhere]">
                    {emailUser}@<wbr />
                    {emailDomain}
                  </span>
                  <ArrowUpRight className="nudge h-[0.8em] w-[0.8em]" strokeWidth={1.25} />
                </a>
                <p className="mt-6 max-w-[44ch] text-small text-muted">
                  Tell us a little about what you&apos;re making and when you&apos;d like it to exist. Links and sketches
                  welcome.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
