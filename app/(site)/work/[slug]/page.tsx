import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import CaseDetails from '@/components/CaseDetails'
import Facts from '@/components/Facts'
import JsonLd from '@/components/JsonLd'
import SectionHeader from '@/components/SectionHeader'
import ProjectMockup from '@/components/mockups/ProjectMockup'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'
import { getProject, projects } from '@/lib/work'

// Only the projects in lib/work.ts exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return pageMetadata({ title: project.name, description: project.summary, path: `/work/${project.slug}` })
}

export default async function CaseStudyPage({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const position = projects.indexOf(project)
  const next = projects[(position + 1) % projects.length]

  const jsonLd =
    project.slug === 'sunurai'
      ? null
      : {
          '@context': 'https://schema.org',
          '@type': project.slug === 'multi-finder-pro' ? 'SoftwareApplication' : 'WebApplication',
          name: project.name,
          description: project.summary,
          url: `${siteConfig.url}/work/${project.slug}`,
          applicationCategory: project.slug === 'multi-finder-pro' ? 'BrowserApplication' : 'DesignApplication',
          operatingSystem: project.slug === 'multi-finder-pro' ? 'Chrome' : 'Web',
          ...(project.slug === 'multi-finder-pro' ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } } : {}),
          publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        }

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}

      {/* Hero */}
      <section className="container-site pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+5rem)]">
        <nav aria-label="Breadcrumb" className="label flex animate-rise flex-wrap gap-x-3 gap-y-1 text-muted">
          <Link href="/work" className="link">
            (Work)
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.index}</span>
          <span aria-hidden="true">—</span>
          <span>{project.kind}</span>
          <span className="flex items-center gap-2 sm:ml-auto">
            <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Live' ? 'bg-[#2fb36b]' : 'bg-line-strong'}`} />
            {project.status}
          </span>
        </nav>
        <h1
          className="mt-8 animate-rise text-[clamp(3rem,1rem+8.4vw,10rem)] font-medium leading-[0.88] tracking-[-0.05em] text-balance [animation-delay:80ms]"
          style={{ fontVariationSettings: "'wdth' 112" }}
        >
          {project.name}
        </h1>
        <div className="mt-12 grid animate-rise gap-10 [animation-delay:160ms] lg:grid-cols-12 lg:gap-6">
          <p className="text-heading font-normal text-pretty lg:col-span-6">{project.summary}</p>
          <div className="lg:col-span-5 lg:col-start-8">
            <Facts items={project.facts} />
            {project.link && (
              <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-solid group mt-8">
                {project.link.label} <ArrowUpRight className="nudge h-4 w-4" strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Stage */}
      <section aria-label={`${project.name} preview`} className="mt-20 bg-paper-sunk py-10 sm:mt-28 sm:py-16">
        <div className="container-site">
          <div className="mx-auto max-w-[72rem]">
            <ProjectMockup slug={project.slug} />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section aria-labelledby="overview-title" className="container-site py-24 sm:py-32">
        <div className="grid gap-y-6 sm:grid-cols-12 sm:gap-x-6">
          <h2 id="overview-title" className="label text-muted sm:col-span-3 sm:pt-2">
            (01) Overview
          </h2>
          <p className="text-heading font-normal text-pretty sm:col-span-9 lg:col-span-8">{project.description}</p>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-title" className="container-site border-t border-line py-24 sm:py-32">
        <SectionHeader id="features-title" index="02" label="Features" title="What it does." />
        <ol className="mt-14 grid border-t border-ink sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {project.features.map((feature, i) => (
            <li key={feature.title} className="border-b border-line py-7 sm:pr-8">
              <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-[1.125rem] font-medium tracking-[-0.015em]">{feature.title}</h3>
              <p className="mt-2 text-small text-muted text-pretty">{feature.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <CaseDetails slug={project.slug} />

      {/* Next project */}
      <Link href={`/work/${next.slug}`} className="group block border-t border-line">
        <div className="container-site py-16 sm:py-24">
          <p className="label text-muted">Next project — {next.index}</p>
          <p className="mt-6 flex items-center gap-4 text-display font-medium" style={{ fontVariationSettings: "'wdth' 112" }}>
            <span className="transition-transform duration-700 ease-out group-hover:translate-x-2">{next.name}</span>
            <ArrowRight className="nudge-x h-[0.7em] w-[0.7em] flex-none" strokeWidth={1.25} />
          </p>
          <p className="mt-4 text-small text-muted">{next.summary}</p>
        </div>
      </Link>
    </>
  )
}
