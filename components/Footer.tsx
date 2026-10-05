import Link from 'next/link'
import { mainNav, siteConfig } from '@/lib/site'
import { projects } from '@/lib/work'
import FooterCta from './FooterCta'
import Mark from './Mark'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-night text-paper">
      <FooterCta />

      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-night-line py-12 sm:grid-cols-4 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${siteConfig.name} — home`}>
              <Mark className="h-8 w-8" />
              <span className="text-[15px] font-semibold tracking-[-0.015em]" style={{ fontVariationSettings: "'wdth' 112" }}>
                Distortion Labs
              </span>
            </Link>
            <p className="mt-5 max-w-[30ch] text-small text-night-muted">{siteConfig.description}</p>
          </div>

          <FooterColumn title="Index" className="lg:col-span-2 lg:col-start-6">
            {[{ name: 'Home', href: '/' }, ...mainNav, { name: 'Privacy', href: '/privacy' }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link">
                  {item.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Work" className="lg:col-span-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className="link">
                  {project.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Elsewhere" className="lg:col-span-2">
            <li>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="link">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="link">
                Email ↗
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="label flex flex-col gap-2 border-t border-night-line py-6 text-night-muted sm:flex-row sm:justify-between">
          <span>
            © {year} {siteConfig.name}
          </span>
          <span>{siteConfig.tagline}</span>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <div
          className="container-site translate-y-[22%] whitespace-nowrap font-semibold leading-[0.8] tracking-[-0.05em] text-night-raised"
          style={{ fontSize: 'calc((min(100vw, 95rem) - 2 * var(--gutter)) * 0.118)', fontVariationSettings: "'wdth' 125" }}
        >
          Distortion Labs
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, className = '', children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="label mb-4 text-night-muted">{title}</p>
      <ul className="space-y-2 text-small">{children}</ul>
    </div>
  )
}
