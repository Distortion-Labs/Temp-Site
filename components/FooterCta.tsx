'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/site'

const [emailUser, emailDomain] = siteConfig.email.split('@')

/** The big "start a conversation" block at the top of the footer. Hidden on the contact page itself. */
export default function FooterCta() {
  const pathname = usePathname()
  if (pathname === '/contact') return null

  return (
    <section className="container-site pb-16 pt-24 sm:pb-24 sm:pt-32">
      <p className="label mb-8 text-night-muted">(Contact)</p>
      <h2 className="max-w-[14ch] text-display font-medium text-balance" style={{ fontVariationSettings: "'wdth' 112" }}>
        Have something in mind?
      </h2>
      <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
        <a
          href={`mailto:${siteConfig.email}`}
          className="group inline-flex items-center gap-3 text-heading font-medium text-paper"
        >
          <span className="link [overflow-wrap:anywhere]">
            {emailUser}@<wbr />
            {emailDomain}
          </span>
          <ArrowUpRight className="nudge h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
        </a>
        <Link href="/contact" className="btn btn-night self-start sm:self-auto">
          Start a project
        </Link>
      </div>
    </section>
  )
}
