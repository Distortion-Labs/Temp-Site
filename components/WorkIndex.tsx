'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/work'
import ProjectPoster from './mockups/ProjectPoster'

/**
 * Ruled index of projects. On devices with a fine pointer, hovering a row dims the others and a
 * poster of the project trails the cursor.
 */
export default function WorkIndex({ projects, headingLevel = 'h3' }: { projects: Project[]; headingLevel?: 'h2' | 'h3' }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const follow = () => {
    pos.current.x += (target.current.x - pos.current.x) * 0.16
    pos.current.y += (target.current.y - pos.current.y) * 0.16
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
    }
    const settled = Math.abs(target.current.x - pos.current.x) < 0.3 && Math.abs(target.current.y - pos.current.y) < 0.3
    frame.current = settled ? 0 : requestAnimationFrame(follow)
  }

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    target.current = { x: e.clientX + 28, y: e.clientY - 120 }
    if (hovered === null) pos.current = { ...target.current }
    if (!frame.current) frame.current = requestAnimationFrame(follow)
  }

  const Heading = headingLevel

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setHovered(null)} className="relative">
      <ul className="border-t border-ink">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
            className={`border-b border-line transition-opacity duration-500 ${hovered !== null && hovered !== i ? 'opacity-35' : ''}`}
          >
            <Link
              href={`/work/${project.slug}`}
              className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 py-6 sm:grid-cols-12 sm:gap-x-6 sm:py-8"
            >
              <span className="label text-muted sm:col-span-1">{project.index}</span>
              <Heading
                className="text-title font-medium transition-transform duration-700 ease-out group-hover:translate-x-2 sm:col-span-6"
                style={{ fontVariationSettings: "'wdth' 112" }}
              >
                {project.name}
              </Heading>
              <ArrowUpRight className="nudge h-6 w-6 self-center text-muted transition-colors group-hover:text-ink sm:hidden" strokeWidth={1.5} />
              <span className="col-start-2 mt-2 text-small text-muted sm:col-span-3 sm:col-start-auto sm:mt-0">{project.kind}</span>
              <span className="label col-start-2 mt-1 flex items-center gap-2 sm:col-span-2 sm:col-start-auto sm:mt-0 sm:justify-end">
                <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Live' ? 'bg-[#2fb36b]' : 'bg-line-strong'}`} />
                {project.status}
                <ArrowUpRight className="nudge ml-2 hidden h-5 w-5 text-muted transition-colors group-hover:text-ink sm:block" strokeWidth={1.5} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ transform: 'translate3d(-999px, -999px, 0)' }}
      >
        <div
          className={`aspect-[4/3] w-[19rem] overflow-hidden rounded-md shadow-[0_30px_60px_-30px_rgba(17,17,16,0.5)] transition-[opacity,transform] duration-500 ease-out ${
            hovered !== null ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          {projects.map((project, i) => (
            <div key={project.slug} className={`absolute inset-0 transition-opacity duration-300 ${hovered === i ? 'opacity-100' : 'opacity-0'}`}>
              <ProjectPoster slug={project.slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
