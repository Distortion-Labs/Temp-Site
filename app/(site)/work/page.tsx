import Link from 'next/link'
import PageIntro from '@/components/PageIntro'
import WorkIndex from '@/components/WorkIndex'
import ProjectPoster from '@/components/mockups/ProjectPoster'
import { pageMetadata } from '@/lib/metadata'
import { projects } from '@/lib/work'

export const metadata = pageMetadata({
  title: 'Work',
  description: "Products and websites by DistortionLens: Multi-Finder Pro, Writer's Canvas and sunurai.com.",
  path: '/work',
})

export default function WorkPage() {
  return (
    <>
      <PageIntro label="Work" title="Things we make.">
        Our own products, and a small number of sites built for people we like working with. Each one is
        something we use — or would.
      </PageIntro>

      <section aria-label="Index" className="container-site mt-16 sm:mt-24">
        <WorkIndex projects={projects} headingLevel="h2" />
      </section>

      <section aria-label="Projects" className="container-site grid gap-x-6 gap-y-14 pb-28 pt-20 sm:grid-cols-2 sm:pb-40 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-line">
              <ProjectPoster slug={project.slug} className="transition-transform duration-1000 ease-out group-hover:scale-[1.03]" />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="text-[1.25rem] font-medium tracking-[-0.02em]">
                <span className="link">{project.name}</span>
              </h3>
              <span className="label text-muted">{project.index}</span>
            </div>
            <p className="mt-1 text-small text-muted">{project.kind}</p>
            <p className="mt-3 max-w-[40ch] text-small text-pretty">{project.summary}</p>
          </Link>
        ))}
      </section>
    </>
  )
}
