import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/work'
import Facts from './Facts'
import ProjectMockup from './mockups/ProjectMockup'

/** Home page spread for a project: sticky facts column beside the live mockup. */
export default function ProjectFeature({ project }: { project: Project }) {
  return (
    <article id={project.slug} className="container-site scroll-mt-24 border-t border-line py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start lg:pr-8">
          <p className="label flex gap-3 text-muted">
            <span>{project.index}</span>
            <span>{project.kind}</span>
          </p>
          <h3 className="mt-5 text-title font-medium" style={{ fontVariationSettings: "'wdth' 112" }}>
            {project.name}
          </h3>
          <p className="mt-5 text-lead text-pretty">{project.summary}</p>
          <p className="mt-4 text-small text-muted text-pretty">{project.description}</p>
          <Facts items={project.facts} className="mt-8" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/work/${project.slug}`} className="btn btn-solid group">
              Case study <ArrowRight className="nudge-x h-4 w-4" strokeWidth={1.75} />
            </Link>
            {project.link && (
              <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="btn group">
                {project.link.label} <ArrowUpRight className="nudge h-4 w-4" strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>
        <div className="lg:col-span-8">
          <ProjectMockup slug={project.slug} />
        </div>
      </div>
    </article>
  )
}
