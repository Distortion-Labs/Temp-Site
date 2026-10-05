import type { ProjectSlug } from '@/lib/work'
import RoomSketch from './RoomSketch'

const PALETTE = ['#FFFF77', '#7777FF', '#77FF92', '#C977FF', '#77FFE4', '#FF7792']

/** Small, lightweight illustration of each project for index previews and cards. */
export default function ProjectPoster({ slug, className = '' }: { slug: ProjectSlug; className?: string }) {
  if (slug === 'multi-finder-pro') {
    // Lines of text with highlighted keywords in the extension's palette.
    const rows = [
      [18, 0, 30, 1, 22],
      [40, 2, 26],
      [12, 3, 34, 0, 10],
      [28, 1, 18, 4, 14],
      [46, 5, 20],
      [16, 0, 24, 2, 28],
    ]
    return (
      <div className={`flex h-full w-full flex-col justify-center gap-[7%] bg-paper-raised p-[9%] ${className}`} aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="flex h-[6%] items-center gap-[2.5%]">
            {row.map((v, i) =>
              i % 2 === 0 ? (
                <span key={i} className="h-full rounded-[2px] bg-line" style={{ width: `${v}%` }} />
              ) : (
                <span key={i} className="h-[160%] w-[13%] rounded-[3px]" style={{ background: PALETTE[v] }} />
              )
            )}
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'writers-canvas') {
    return (
      <div className={`flex h-full w-full gap-[4%] bg-[#0a0a0a] p-[6%] ${className}`} aria-hidden="true">
        <div className="flex w-[26%] flex-col gap-[6%]">
          <span className="h-[7%] w-[70%] rounded-sm bg-[#2a2a2a]" />
          <span className="h-[12%] rounded-md border border-[#3b82f655] bg-[#3b82f61f]" />
          {[80, 60, 72, 54, 66].map((w, i) => (
            <span key={i} className="h-[4%] rounded-sm bg-[#1f1f1f]" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-[5%] rounded-lg border border-[#222] bg-[#111] p-[7%]">
          <span className="h-[7%] w-[55%] rounded-sm bg-[#e5e5e5]/80" />
          {[100, 94, 98, 62, 0, 100, 88, 70].map((w, i) =>
            w ? (
              <span key={i} className="h-[3.5%] rounded-sm bg-[#3a3a3a]" style={{ width: `${w}%` }}>
                {i === 1 && <span className="ml-[30%] block h-full w-[22%] rounded-sm bg-[#a78bfa]/60" />}
              </span>
            ) : (
              <span key={i} className="h-[2%]" />
            )
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex h-full w-full items-center bg-[#0e0d0b] ${className}`} aria-hidden="true">
      <RoomSketch className="w-full" />
    </div>
  )
}
