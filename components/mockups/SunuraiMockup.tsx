import BrowserFrame from './BrowserFrame'
import RoomSketch from './RoomSketch'

// sunurai.com tokens: gesso paper, warm ink, Fraunces display.
const S = { gesso: '#f4f1ec', ink: '#141311', muted: '#6b665e', line: '#e2ddd3', dark: '#0e0d0b' }

function DimensionLine({ label, vertical = false }: { label: string; vertical?: boolean }) {
  return (
    <span
      className={`flex items-center gap-1 text-[10px] tabular ${vertical ? 'h-full flex-col' : 'w-full'}`}
      style={{ color: S.muted }}
      aria-hidden="true"
    >
      <span className={vertical ? 'h-px w-2.5' : 'h-2.5 w-px'} style={{ background: S.muted, opacity: 0.6 }} />
      <span className={`flex-1 ${vertical ? 'w-px' : 'h-px'}`} style={{ background: S.line }} />
      <span className={`whitespace-nowrap px-1 ${vertical ? '[writing-mode:vertical-rl] rotate-180' : ''}`}>{label}</span>
      <span className={`flex-1 ${vertical ? 'w-px' : 'h-px'}`} style={{ background: S.line }} />
      <span className={vertical ? 'h-px w-2.5' : 'h-2.5 w-px'} style={{ background: S.muted, opacity: 0.6 }} />
    </span>
  )
}

/** A stylised page from sunurai.com: editorial hero with a painting at true proportions, and the gallery door. */
export default function SunuraiMockup({ className = '' }: { className?: string }) {
  return (
    <BrowserFrame url="sunurai.com" className={className}>
      <div style={{ background: S.gesso, color: S.ink }} className="px-5 pb-6 pt-4 sm:px-8 sm:pb-8">
        <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: S.line }}>
          <span className="font-serif text-[1.15rem] tracking-[-0.015em]">Sunu Rai</span>
          <span className="hidden gap-5 text-[12px] sm:flex" style={{ color: S.muted }}>
            {['Work', 'Store', 'Gallery', 'About', 'Contact'].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </div>

        <div className="grid items-end gap-8 pt-8 sm:grid-cols-[1.1fr_1fr] sm:gap-10 sm:pt-10">
          <div className="pb-2">
            <p className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] font-light leading-[0.96] tracking-[-0.025em]" style={{ fontVariationSettings: "'opsz' 144" }}>
              Sunu Rai
            </p>
            <p className="mt-3 font-serif text-[1.15rem] font-light">Paintings and works on paper.</p>
            <p className="mt-1 text-[12px]" style={{ color: S.muted }}>
              Lexington, Kentucky
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[12px]">
              <span className="rounded-full border px-4 py-2" style={{ borderColor: S.ink }}>
                See the work
              </span>
              <span className="rounded-full border px-4 py-2" style={{ borderColor: S.ink }}>
                Enter the gallery
              </span>
            </div>
          </div>

          {/* A painting at honest proportions, with architectural dimension lines */}
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <div
              className="aspect-[4/5] w-full shadow-[0_18px_40px_-24px_rgba(20,19,17,0.5)]"
              style={{
                background:
                  'linear-gradient(180deg, #c9cfc8 0%, #b9c2bd 34%, #8d9a83 35%, #6f7d5e 58%, #5a644a 59%, #7b6a4d 82%, #6a5a40 100%)',
              }}
            />
            <div className="w-4">
              <DimensionLine label="30 in" vertical />
            </div>
            <DimensionLine label="24 in" />
          </div>
        </div>

        {/* Gallery door: the one dark surface on the site */}
        <div className="mt-8 grid overflow-hidden rounded-sm sm:grid-cols-[1.25fr_1fr]" style={{ background: S.dark, color: S.gesso }}>
          <RoomSketch className="w-full" stroke={S.gesso} />
          <div className="flex flex-col justify-center gap-2 p-5 sm:p-6">
            <span className="text-[11px]" style={{ color: '#9a938a' }}>
              The gallery
            </span>
            <span className="font-serif text-[1.6rem] font-light leading-tight tracking-[-0.02em]">Walk the room</span>
            <span className="text-[12.5px] leading-relaxed" style={{ color: '#c9c3b8' }}>
              Twelve works hung at true size in a white-cube gallery, twenty-six metres long. Stand as close as you like.
            </span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
