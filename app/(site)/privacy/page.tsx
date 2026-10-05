import PageIntro from '@/components/PageIntro'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Privacy',
  description: `How ${siteConfig.name} handles information collected through this website.`,
  path: '/privacy',
})

const lastUpdated = 'October 5, 2026'

const sections = [
  {
    title: 'What this covers',
    body: (
      <p>
        This policy explains what information {siteConfig.name} collects through this website and how we use it. If you
        have questions about how one of our products handles data, contact us and we&apos;ll be happy to help.
      </p>
    ),
  },
  {
    title: 'Information you send us',
    body: (
      <p>
        When you contact us through the contact form or by email, we receive your name, email address and message. We
        use this information only to reply to you. Contact form messages are delivered to our inbox through a
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
        This website is hosted on Vercel. Like any web host, Vercel processes standard request information (such as IP
        address and browser user agent) to deliver pages and protect the site from abuse.
      </p>
    ),
  },
  {
    title: 'Your choices',
    body: (
      <p>
        You can ask us to delete any message you&apos;ve sent us, or ask what information we hold about you, by emailing{' '}
        <a href={`mailto:${siteConfig.email}`} className="link-u">
          {siteConfig.email}
        </a>
        .
      </p>
    ),
  },
  {
    title: 'Changes',
    body: <p>If we change this policy, we&apos;ll update this page and the date below.</p>,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageIntro label="Privacy" title="Privacy policy." />

      <section aria-label="Policy" className="container-site pb-28 pt-20 sm:pb-40 sm:pt-28">
        <div className="border-t border-ink">
          {sections.map((section, i) => (
            <div key={section.title} className="grid gap-3 border-b border-line py-8 sm:grid-cols-12 sm:gap-6">
              <p className="label text-muted sm:col-span-1">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="text-[1.125rem] font-medium tracking-[-0.015em] sm:col-span-3 sm:col-start-4">{section.title}</h2>
              <div className="max-w-prose text-small text-muted text-pretty sm:col-span-6">{section.body}</div>
            </div>
          ))}
        </div>
        <p className="label mt-8 text-muted sm:ml-[25%]">Last updated {lastUpdated}</p>
      </section>
    </>
  )
}
