import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import LensWordmark from '@/components/LensWordmark'
import SectionHeader from '@/components/SectionHeader'
import WorkIndex from '@/components/WorkIndex'
import ProjectFeature from '@/components/ProjectFeature'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/metadata'
import { capabilities, principles, siteConfig } from '@/lib/site'
import { projects } from '@/lib/work'

export const metadata = pageMetadata({ path: '/' })

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon-512.png`,
  email: siteConfig.email,
  sameAs: [siteConfig.links.github],
}

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />

      {/* Hero */}
      <section className="pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="container-site">
          <div className="label mb-5 flex animate-rise justify-between gap-4 text-muted sm:mb-8">
            <span>(Independent software studio)</span>
            <span className="hidden md:inline">Extensions — Tools — Websites</span>
            <span className="hidden sm:inline">
              Now building: Writer&apos;s Canvas<span className="animate-blink">_</span>
            </span>
          </div>

          <div className="relative">
            <LensWordmark lines={['Distortion', 'Labs']} label="Distortion Labs" />
            <div className="mt-10 animate-rise [animation-delay:200ms] lg:absolute lg:bottom-[0.5%] lg:left-[57%] lg:right-0 lg:mt-0">
              <p className="max-w-[30ch] text-lead text-pretty">
                An independent software studio. We design and build browser extensions, creative tools and
                websites — and we use what we make.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="#work" className="btn btn-solid group">
                  See the work <ArrowDown className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" strokeWidth={1.75} />
                </Link>
                <Link href="/contact" className="btn">
                  Start a project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section aria-label="What we do" className="container-site mt-20 sm:mt-28">
        <div className="grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, i) => (
            <div
              key={item.title}
              className="border-b border-line py-6 sm:pr-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 sm:[&:nth-child(even)]:pl-6 lg:[&:nth-child(even)]:pl-6"
            >
              <p className="label text-muted">0{i + 1}</p>
              <h2 className="mt-6 text-[1.125rem] font-medium tracking-[-0.015em]">{item.title}</h2>
              <p className="mt-2 max-w-[32ch] text-small text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" aria-labelledby="work-title" className="scroll-mt-16 pt-28 sm:pt-40">
        <div className="container-site">
          <SectionHeader id="work-title" index="01" label="Selected work" title="Software we make, and use." />
          <div className="mt-14 sm:mt-20">
            <WorkIndex projects={projects} />
          </div>
        </div>
      </section>

      <div className="mt-24 sm:mt-32">
        {projects.map((project) => (
          <ProjectFeature key={project.slug} project={project} />
        ))}
      </div>

      {/* Studio */}
      <section aria-labelledby="studio-title" className="border-t border-line py-28 sm:py-40">
        <div className="container-site">
          <SectionHeader
            id="studio-title"
            index="02"
            label="Studio"
            title="A small studio that would rather finish things."
          />
          <div className="mt-14 grid gap-10 sm:mt-20 sm:grid-cols-12 sm:gap-6">
            {principles.map((item, i) => (
              <div key={item.title} className="sm:col-span-4 lg:col-span-3 lg:[&:first-child]:col-start-4">
                <p className="label text-muted">0{i + 1}</p>
                <h3 className="mt-4 text-[1.25rem] font-medium leading-snug tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-small text-muted text-pretty">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 sm:grid sm:grid-cols-12 sm:gap-6">
            <Link href="/studio" className="group inline-flex items-center gap-2 text-lead sm:col-span-9 sm:col-start-4">
              <span className="link">More about the studio</span>
              <ArrowRight className="nudge-x h-5 w-5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
