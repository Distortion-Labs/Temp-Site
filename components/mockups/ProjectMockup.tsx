import type { ProjectSlug } from '@/lib/work'
import MultiFinderDemo from './MultiFinderDemo'
import SunuraiMockup from './SunuraiMockup'
import WritersCanvasMockup from './WritersCanvasMockup'

export default function ProjectMockup({ slug, className }: { slug: ProjectSlug; className?: string }) {
  if (slug === 'multi-finder-pro') return <MultiFinderDemo className={className} />
  if (slug === 'writers-canvas') return <WritersCanvasMockup className={className} />
  return <SunuraiMockup className={className} />
}
