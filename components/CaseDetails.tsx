import type { ProjectSlug } from '@/lib/work'
import RoomSketch from './mockups/RoomSketch'
import SectionHeader from './SectionHeader'

const MF_PALETTE = ['#FFFF77', '#7777FF', '#77FF92', '#C977FF', '#77FFE4', '#77C9FF', '#FF7792', '#FFAE77']

const WC_PHASES = [
  { name: 'Worldbuilding', desc: 'Build your characters, places, and lore', color: '#a855f7', tabs: 'Characters · World · Wiki' },
  { name: 'Outlining', desc: 'Plan your story structure', color: '#f59e0b', tabs: 'Outline · Chapters · Timeline' },
  { name: 'Drafting', desc: 'Focus on writing chapters', color: '#3b82f6', tabs: 'Chapters · Read Mode · Brain Dump' },
  { name: 'Production', desc: 'Visual assets and pipeline', color: '#f97316', tabs: 'Storyboard · Pipeline · Schedule' },
  { name: 'Review', desc: 'Polish and finalize your work', color: '#10b981', tabs: 'AI Insights · Analytics · Read Mode' },
]
const WC_PIPELINE = ['Script', 'Thumbnail', 'Sketch', 'Line', 'Color', 'Letter', 'QA', 'Published']

const SR_ROOM = [
  { label: 'Room', value: 'A 26 × 14 × 5 m white cube with a vestibule, a partition wall and an alcove.' },
  { label: 'Hanging', value: 'Every work at true size. A deterministic planner puts the largest piece on the wall facing the entrance.' },
  { label: 'Light', value: 'One warm track spotlight per work, with soft shadows and a reflective parquet floor.' },
  { label: 'Controls', value: 'WASD and pointer-lock on desktop, a joystick on phones, and deep links that start you in front of a given work.' },
  { label: 'Fallbacks', value: 'A quality toggle for slower machines and a plain version for browsers without WebGL.' },
]

function Keycap({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="grid h-16 min-w-16 place-items-center rounded-xl border border-line-strong bg-paper-raised px-4 font-sans text-[1.75rem] shadow-[inset_0_-3px_0_theme(colors.line)] sm:h-20 sm:min-w-20 sm:text-[2.25rem]">
      {children}
    </kbd>
  )
}

/** The product-specific section of a case study. */
export default function CaseDetails({ slug }: { slug: ProjectSlug }) {
  if (slug === 'multi-finder-pro') {
    return (
      <section aria-labelledby="details-title" className="container-site border-t border-line py-24 sm:py-32">
        <SectionHeader id="details-title" index="03" label="Details" title="Eight colors, tuned to stay legible." />
        <div className="mt-14 grid grid-cols-4 gap-2 sm:mt-20 sm:grid-cols-8">
          {MF_PALETTE.map((color, i) => (
            <div key={color}>
              <div className="aspect-[3/4] rounded-md" style={{ background: color }} />
              <p className="label mt-3 text-muted">0{i + 1}</p>
              <p className="label">{color}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[48ch] text-small text-muted sm:ml-[25%]">
          Keywords take these in order; after the eighth, each new term gets a fresh hue, and the text on top switches
          between dark and light to keep its contrast.
        </p>

        <div className="mt-24 grid gap-10 sm:grid-cols-12 sm:gap-6">
          <p className="label text-muted sm:col-span-3">Shortcut</p>
          <div className="sm:col-span-9">
            <div className="flex items-center gap-3" aria-label="Command Shift F">
              <Keycap>⌘</Keycap>
              <Keycap>⇧</Keycap>
              <Keycap>F</Keycap>
            </div>
            <p className="mt-6 max-w-[40ch] text-lead">
              Opens on any page, on top of the page — no new tab, no context switch. Ctrl+Shift+F on Windows and Linux.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (slug === 'writers-canvas') {
    return (
      <section aria-labelledby="details-title" className="container-site border-t border-line py-24 sm:py-32">
        <SectionHeader id="details-title" index="03" label="Workflow" title="Five phases, one series." />
        <ol className="mt-14 border-t border-ink sm:mt-20">
          {WC_PHASES.map((phase, i) => (
            <li key={phase.name} className="grid gap-2 border-b border-line py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <span className="label text-muted sm:col-span-1">0{i + 1}</span>
              <span className="flex items-center gap-3 text-heading font-medium sm:col-span-4">
                <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: phase.color }} />
                {phase.name}
              </span>
              <span className="text-small sm:col-span-4">{phase.desc}</span>
              <span className="label text-muted sm:col-span-3 sm:text-right">{phase.tabs}</span>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-8 sm:grid-cols-12 sm:gap-6">
          <p className="label text-muted sm:col-span-3">Production pipeline</p>
          <div className="sm:col-span-9">
            <ol className="flex flex-wrap gap-y-3">
              {WC_PIPELINE.map((stage, i) => (
                <li key={stage} className="flex items-center">
                  <span className="rounded-full border border-line-strong px-3.5 py-1.5 text-small">{stage}</span>
                  {i < WC_PIPELINE.length - 1 && <span className="mx-1.5 h-px w-5 bg-line-strong" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-[44ch] text-lead">
              Every chapter moves through the same stages, with a release calendar on top — so a weekly series stays
              weekly.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="details-title" className="bg-night py-24 text-paper sm:py-32">
      <div className="container-site">
        <div className="grid gap-y-5 sm:grid-cols-12 sm:gap-x-6">
          <p className="label text-night-muted sm:col-span-3 sm:pt-3">(03) The gallery</p>
          <h2 id="details-title" className="text-display font-medium text-balance sm:col-span-9" style={{ fontVariationSettings: "'wdth' 112" }}>
            A room you can walk through.
          </h2>
        </div>
        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <RoomSketch className="w-full" />
          </div>
          <dl className="border-t border-night-line lg:col-span-4 lg:col-start-9">
            {SR_ROOM.map((item) => (
              <div key={item.label} className="border-b border-night-line py-4">
                <dt className="label text-night-muted">{item.label}</dt>
                <dd className="mt-1.5 text-small text-paper/85">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
