import GradientSection from '@/components/GradientSection'
import PageHero from '@/components/PageHero'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} handles information collected through this website.`,
  path: '/privacy',
})

const lastUpdated = 'October 4, 2026'

const sections = [
  {
    title: 'What this policy covers',
    body: (
      <p>
        This policy explains what information {siteConfig.name} collects through this website and how we use it.
        If you have questions about how one of our products handles data, contact us and we&apos;ll be happy to help.
      </p>
    ),
  },
  {
    title: 'Information you send us',
    body: (
      <p>
        When you contact us through the contact form or by email, we receive your name, email address and message.
        We use this information only to reply to you. Contact form messages are delivered to our inbox through a
        transactional email provider. We don&apos;t sell your information or use it for marketing.
      </p>
    ),
  },
  {
    title: 'Analytics',
    body: (
      <p>
        We use Vercel Web Analytics to understand how the site is used in aggregate — for example, which pages are
        visited, referring sites, and general device and country information. It does not use cookies and does not
        identify individual visitors.
      </p>
    ),
  },
  {
    title: 'Hosting',
    body: (
      <p>
        This website is hosted on Vercel. Like any web host, Vercel processes standard request information (such as
        IP address and browser user agent) to deliver pages and protect the site from abuse.
      </p>
    ),
  },
  {
    title: 'Your choices',
    body: (
      <p>
        You can ask us to delete any message you&apos;ve sent us, or ask what information we hold about you, by
        emailing{' '}
        <a href={`mailto:${siteConfig.email}`} className="text-primary-300 hover:text-primary-200 transition-colors">
          {siteConfig.email}
        </a>
        .
      </p>
    ),
  },
  {
    title: 'Changes to this policy',
    body: <p>If we change this policy, we&apos;ll update this page and the date below.</p>,
  },
]

export default function PrivacyPage() {
  return (
    <GradientSection>
      <PageHero eyebrow="Legal" accent="primary" title="Privacy Policy" />

      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="container-main">
          <article className="max-w-3xl mx-auto glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 animate-fade-in-up">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-3">{section.title}</h2>
                <div className="text-sm sm:text-base text-white/55 leading-relaxed">{section.body}</div>
              </section>
            ))}
            <p className="pt-6 border-t border-white/10 text-xs sm:text-sm text-white/30">Last updated: {lastUpdated}</p>
          </article>
        </div>
      </section>
    </GradientSection>
  )
}
