'use client'

import { useState } from 'react'
import {
  BarChart3,
  BookMarked,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronLeft,
  CircleCheck,
  Clapperboard,
  FileText,
  Globe,
  Home,
  Image as ImageIcon,
  Images,
  KanbanSquare,
  Layers,
  LayoutGrid,
  LayoutPanelTop,
  Lightbulb,
  ListTree,
  Map as MapIcon,
  PenLine,
  Search,
  Settings,
  Sparkles,
  Trash2,
  Tv,
  Users,
  type LucideIcon,
} from 'lucide-react'

// Tokens from Writer's Canvas globals.css (dark theme, violet accent).
const T = {
  bg: '#0a0a0a',
  card: '#111111',
  hover: '#1a1a1a',
  border: '#222222',
  text: '#e5e5e5',
  dim: '#888888',
  muted: '#555555',
  accent: '#a78bfa',
}

type View = 'editor' | 'characters' | 'outline' | 'pipeline' | 'insights'

// Phases, colors and tab sets from lib/sidebar-profiles.ts. Read Mode is hidden for Webtoon projects.
const PHASES: {
  id: string
  label: string
  desc: string
  color: string
  icon: LucideIcon
  tabs: { name: string; view?: View }[]
  view: View
}[] = [
  { id: 'all', label: 'All', desc: 'Show all tools', color: T.accent, icon: LayoutGrid, tabs: [], view: 'editor' },
  {
    id: 'worldbuilding',
    label: 'Worldbuilding',
    desc: 'Build your characters, places, and lore',
    color: '#a855f7',
    icon: Globe,
    tabs: [{ name: 'Home' }, { name: 'Characters', view: 'characters' }, { name: 'World' }, { name: 'Wiki' }],
    view: 'characters',
  },
  {
    id: 'outlining',
    label: 'Outlining',
    desc: 'Plan your story structure',
    color: '#f59e0b',
    icon: ListTree,
    tabs: [{ name: 'Home' }, { name: 'Outline', view: 'outline' }, { name: 'Chapters', view: 'editor' }, { name: 'Timeline' }],
    view: 'outline',
  },
  {
    id: 'drafting',
    label: 'Drafting',
    desc: 'Focus on writing chapters',
    color: '#3b82f6',
    icon: PenLine,
    tabs: [{ name: 'Home' }, { name: 'Chapters', view: 'editor' }, { name: 'Brain Dump' }],
    view: 'editor',
  },
  {
    id: 'production',
    label: 'Production',
    desc: 'Visual assets and pipeline',
    color: '#f97316',
    icon: Clapperboard,
    tabs: [{ name: 'Home' }, { name: 'Storyboard' }, { name: 'Pipeline', view: 'pipeline' }, { name: 'Schedule' }],
    view: 'pipeline',
  },
  {
    id: 'review',
    label: 'Review',
    desc: 'Polish and finalize your work',
    color: '#10b981',
    icon: CircleCheck,
    tabs: [{ name: 'Home' }, { name: 'AI Insights', view: 'insights' }, { name: 'Analytics' }],
    view: 'insights',
  },
]

const NAV: { section: string; items: [string, LucideIcon, View?][] }[] = [
  {
    section: 'Writing',
    items: [
      ['Chapters', FileText, 'editor'],
      ['Outline', ListTree, 'outline'],
      ['Episodes', Tv],
      ['Seasons', Layers],
      ['Pipeline', KanbanSquare, 'pipeline'],
      ['Schedule', Calendar],
    ],
  },
  { section: 'World', items: [['Characters', Users, 'characters'], ['Lore & Places', MapIcon], ['Wiki', BookMarked]] },
  { section: 'Visual', items: [['Storyboard', LayoutPanelTop], ['Thumbnails', Images], ['References', ImageIcon]] },
  { section: 'AI & Analysis', items: [['AI Insights', Sparkles, 'insights'], ['Analytics', BarChart3]] },
  { section: 'Project', items: [['Brain Dump', Lightbulb], ['Trash', Trash2], ['Settings', Settings]] },
]

const VIEW_LABEL: Record<View, string> = {
  editor: 'Chapters',
  characters: 'Characters',
  outline: 'Outline',
  pipeline: 'Pipeline',
  insights: 'AI Insights',
}

export default function WritersCanvasMockup({ className = '' }: { className?: string }) {
  const [phaseId, setPhaseId] = useState('drafting')
  const [view, setView] = useState<View>('editor')
  const [menuOpen, setMenuOpen] = useState(false)
  const phase = PHASES.find((p) => p.id === phaseId)!

  const choosePhase = (id: string) => {
    const next = PHASES.find((p) => p.id === id)!
    setPhaseId(id)
    setView(next.view)
    setMenuOpen(false)
  }

  return (
    <div className={className}>
      <div
        className="overflow-hidden rounded-[14px] border shadow-[0_24px_60px_-28px_rgba(17,17,16,0.55)]"
        style={{ background: T.bg, borderColor: T.border, color: T.text, fontFamily: 'var(--font-sans)' }}
        role="group"
        aria-label="Interactive mockup of the Writer's Canvas workspace"
      >
        <div className="flex h-[34rem] text-[12.5px] md:h-[38rem]">
          {/* Sidebar */}
          <aside aria-label="Sidebar" className="hidden w-[15rem] flex-none flex-col gap-3 p-3 md:flex">
            <span className="flex items-center gap-1 text-[11.5px]" style={{ color: T.dim }}>
              <ChevronLeft className="h-3.5 w-3.5" /> All Projects
            </span>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: `${T.accent}22`, color: T.accent }}>
                <BookOpen className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold leading-tight">The Glass Tide</p>
                <p className="text-[11px]" style={{ color: T.dim }}>
                  Webtoon | 42,310w
                </p>
              </div>
            </div>
            <div>
              <div className="h-px w-full" style={{ background: T.border }}>
                <div className="h-px" style={{ width: '68%', background: T.accent }} />
              </div>
              <div className="mt-1.5 flex justify-between text-[10.5px]" style={{ color: T.dim }}>
                <span>68%</span>
                <span>3,840 to go</span>
              </div>
              <p className="mt-0.5 text-[10.5px]" style={{ color: T.muted }}>
                Episode 12 due · 3 days left
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5" style={{ borderColor: T.border, color: T.muted }}>
              <Search className="h-3.5 w-3.5" />
              <span className="flex-1">Search...</span>
              <kbd className="rounded border px-1 text-[10px]" style={{ borderColor: T.border }}>
                ⌘K
              </kbd>
            </div>

            {/* Phase selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                className="flex w-full items-center gap-2.5 rounded-xl p-2.5 text-left"
                style={{ background: `${phase.color}1f`, border: `1.5px solid ${phase.color}55` }}
              >
                <span className="grid h-7 w-7 flex-none place-items-center rounded-lg" style={{ background: `${phase.color}33`, color: phase.color }}>
                  <phase.icon className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{phase.label}</span>
                  <span className="block truncate text-[10.5px]" style={{ color: T.dim }}>
                    {phase.desc}
                  </span>
                </span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`} style={{ color: T.dim }} />
              </button>
              {menuOpen && (
                <div
                  className="absolute inset-x-0 top-full z-20 mt-1.5 rounded-xl border p-1.5 shadow-2xl"
                  style={{ background: T.card, borderColor: T.border }}
                >
                  <p className="px-2 pb-1 pt-1.5 text-[10px] font-semibold tracking-wider" style={{ color: T.muted }}>
                    WORKFLOW PHASE
                  </p>
                  {PHASES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => choosePhase(p.id)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-white/5"
                    >
                      <p.icon className="h-3.5 w-3.5" style={{ color: p.color }} />
                      <span className={p.id === phaseId ? 'font-semibold' : ''}>{p.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav aria-label="Project navigation" className="-mr-1 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-width:none]">
              <NavItem icon={Home} label="Home" />
              {phaseId === 'all' ? (
                NAV.map((group) => (
                  <div key={group.section} className="rounded-lg border p-1.5" style={{ borderColor: T.border, background: `${T.hover}80` }}>
                    <p className="px-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: T.muted }}>
                      {group.section}
                    </p>
                    {group.items.map(([label, icon, target]) => (
                      <NavItem key={label} icon={icon} label={label} active={target === view} onClick={target ? () => setView(target) : undefined} />
                    ))}
                  </div>
                ))
              ) : (
                <div className="space-y-2 px-1.5 pt-1 text-[11px]" style={{ color: T.muted }}>
                  <p>Tools are shown as tabs above</p>
                  <button type="button" onClick={() => choosePhase('all')} className="underline-offset-2 hover:underline" style={{ color: T.accent }}>
                    Show full sidebar
                  </button>
                </div>
              )}
            </nav>
          </aside>

          {/* Main card */}
          <div className="flex min-w-0 flex-1 flex-col p-2 md:p-3 md:pl-0">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border" style={{ background: T.card, borderColor: T.border }}>
              <div className="flex items-center gap-1.5 border-b px-4 py-2.5 text-[11px]" style={{ borderColor: T.border, color: T.dim }}>
                The Glass Tide <span style={{ color: T.muted }}>›</span> {VIEW_LABEL[view]}
                {view === 'editor' && (
                  <>
                    <span style={{ color: T.muted }}>›</span> Chapter 12
                  </>
                )}
              </div>

              {phase.tabs.length > 0 && (
                <div className="flex gap-1 overflow-x-auto border-b px-3 py-2 [scrollbar-width:none]" style={{ borderColor: T.border }}>
                  {phase.tabs.map((tab) => {
                    const isActive = tab.view === view && VIEW_LABEL[view] === tab.name
                    const Tag = tab.view ? 'button' : 'span'
                    return (
                      <Tag
                        key={tab.name}
                        {...(tab.view ? { type: 'button' as const, onClick: () => setView(tab.view!) } : {})}
                        className="whitespace-nowrap rounded-lg px-2.5 py-1.5"
                        style={isActive ? { background: `${phase.color}26`, color: phase.color } : { color: T.dim }}
                      >
                        {tab.name}
                      </Tag>
                    )
                  })}
                </div>
              )}

              <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
                {view === 'editor' && <EditorView />}
                {view === 'characters' && <CharactersView />}
                {view === 'outline' && <OutlineView />}
                {view === 'pipeline' && <PipelineView />}
                {view === 'insights' && <InsightsView />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* External phase switcher — the same control, reachable on small screens too */}
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Try a workflow phase">
        <span className="label mr-1 text-muted">Try a phase:</span>
        {PHASES.filter((p) => p.id !== 'all').map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => choosePhase(p.id)}
            aria-pressed={phaseId === p.id}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-small transition-colors ${
              phaseId === p.id ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
            }`}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: LucideIcon; label: string; active?: boolean; onClick?: () => void }) {
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      {...(onClick ? { type: 'button' as const, onClick } : {})}
      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left"
      style={active ? { background: `${T.accent}1a`, color: T.accent } : { color: '#bdbdbd' }}
    >
      <Icon className="h-3.5 w-3.5 flex-none" />
      {label}
    </Tag>
  )
}

function Entity({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded px-0.5" style={{ background: `${T.accent}1f`, boxShadow: `inset 0 -1px 0 ${T.accent}99` }}>
      {children}
    </span>
  )
}

function EditorView() {
  return (
    <div className="flex h-full">
      <div className="min-w-0 flex-1 px-5 py-5 md:px-8">
        <div className="flex items-center gap-3 text-[11px]" style={{ color: T.dim }}>
          <ChevronLeft className="h-3.5 w-3.5" /> Chapters
          <span className="ml-auto rounded-md border px-2 py-0.5" style={{ borderColor: T.border }}>
            Jump...
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <h4 className="text-[20px] font-semibold tracking-[-0.01em]">Chapter 12 — Low Water</h4>
          <span className="rounded-full px-2 py-0.5 text-[10.5px] font-medium" style={{ background: '#f59e0b22', color: '#fbbf24' }}>
            Draft
          </span>
        </div>
        <div className="mt-3 flex items-center gap-4 border-b pb-2 text-[11.5px]" style={{ borderColor: T.border, color: T.dim }}>
          {['File', 'Edit', 'View', 'Insert', 'Format', 'Tools'].map((m) => (
            <span key={m}>{m}</span>
          ))}
          <span className="ml-auto hidden whitespace-nowrap tabular xl:inline" style={{ color: T.muted }}>
            2,418 words · 10 min read
          </span>
        </div>
        <div className="mt-4 space-y-4" style={{ fontFamily: 'Georgia, serif', fontSize: '15px', lineHeight: 1.8, color: '#d4d4d4' }}>
          <p>
            The tide went out at noon and didn&apos;t come back. By dusk the harbor was a field of glass — wet sand
            holding the sky so perfectly that <Entity>Mira Ves</Entity> could walk across the clouds.
          </p>
          <p>
            She stopped where the old pier ended. Somewhere under her boots was the city <Entity>Oren Hale</Entity> swore
            was only a story, waiting one tide deep.
          </p>
          <p>
            &ldquo;You hear that?&rdquo; Oren called from the seawall. She did. Far out, past the last buoy,{' '}
            <Entity>the Tidewarden</Entity> had started to sing.
            <span className="ml-0.5 inline-block h-[1.1em] w-px translate-y-[3px] animate-blink" style={{ background: T.accent }} />
          </p>
        </div>
      </div>

      {/* Quick Reference panel */}
      <aside className="hidden w-[13.5rem] flex-none border-l p-4 lg:block" style={{ borderColor: T.border }}>
        <p className="text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: T.muted }}>
          Quick Reference
        </p>
        <div className="mt-3 rounded-xl border p-3" style={{ borderColor: T.border, background: T.hover }}>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold" style={{ background: '#3b82f633', color: '#93c5fd' }}>
              MV
            </span>
            <div>
              <p className="font-semibold">Mira Ves</p>
              <p className="text-[10.5px]" style={{ color: T.dim }}>
                Protagonist
              </p>
            </div>
          </div>
          <p className="mt-3 text-[10.5px]" style={{ color: T.muted }}>
            Color palette
          </p>
          <div className="mt-1 flex gap-1">
            {['#1e3a5f', '#4f7cac', '#c0d6df', '#e8c07d', '#2b2d42'].map((c) => (
              <span key={c} className="h-4 w-4 rounded" style={{ background: c }} />
            ))}
          </div>
          <dl className="mt-3 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <dt style={{ color: T.dim }}>Appears in</dt>
              <dd>12 chapters</dd>
            </div>
            <div className="flex justify-between">
              <dt style={{ color: T.dim }}>Rival</dt>
              <dd>Oren Hale</dd>
            </div>
          </dl>
        </div>
        <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: T.muted }}>
          History
        </p>
        <ul className="mt-2 space-y-1.5 text-[11px]" style={{ color: T.dim }}>
          <li>Autosave · 2m ago</li>
          <li>Autosave · 18m ago</li>
          <li style={{ color: T.text }}>“Before the reveal” · yesterday</li>
        </ul>
      </aside>
    </div>
  )
}

function CharactersView() {
  const people = [
    { name: 'Mira Ves', role: 'Protagonist', hue: '#3b82f6', palette: ['#1e3a5f', '#4f7cac', '#c0d6df', '#e8c07d'] },
    { name: 'Oren Hale', role: 'Rival', hue: '#f59e0b', palette: ['#5c3d2e', '#b85c38', '#e0c097', '#2d2424'] },
    { name: 'The Tidewarden', role: 'Antagonist', hue: '#10b981', palette: ['#0b3d3a', '#1f7a6d', '#9ed2c6', '#e9f5f2'] },
  ]
  return (
    <div className="p-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {people.map((p) => (
          <div key={p.name} className="rounded-xl border p-3.5" style={{ borderColor: T.border, background: T.hover }}>
            <span className="grid h-10 w-10 place-items-center rounded-full text-[12px] font-semibold" style={{ background: `${p.hue}33`, color: p.hue }}>
              {p.name
                .replace('The ', '')
                .split(' ')
                .map((w) => w[0])
                .join('')}
            </span>
            <p className="mt-3 font-semibold">{p.name}</p>
            <p className="text-[11px]" style={{ color: T.dim }}>
              {p.role}
            </p>
            <div className="mt-3 flex gap-1">
              {p.palette.map((c) => (
                <span key={c} className="h-3.5 w-3.5 rounded" style={{ background: c }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border p-4" style={{ borderColor: T.border }}>
        <p className="text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: T.muted }}>
          Relationship map
        </p>
        <svg viewBox="0 0 360 120" className="mt-2 w-full" aria-hidden="true">
          <line x1="70" y1="60" x2="180" y2="30" stroke="#333" strokeDasharray="3 3" />
          <line x1="180" y1="30" x2="290" y2="75" stroke="#333" />
          <line x1="70" y1="60" x2="290" y2="75" stroke="#333" />
          {[
            [70, 60, '#3b82f6', 'Mira'],
            [180, 30, '#f59e0b', 'Oren'],
            [290, 75, '#10b981', 'Tidewarden'],
          ].map(([x, y, c, n]) => (
            <g key={n as string}>
              <circle cx={x as number} cy={y as number} r="7" fill={c as string} />
              <text x={x as number} y={(y as number) + 22} fill="#888" fontSize="10" textAnchor="middle">
                {n}
              </text>
            </g>
          ))}
          <text x="125" y="36" fill="#555" fontSize="9">
            rivals
          </text>
        </svg>
      </div>
    </div>
  )
}

function OutlineView() {
  const acts = [
    { name: 'Act I — The Low Tide', chapters: [['1', 'Glass Harbor', 'Final'], ['2', 'The Seawall', 'Final'], ['3', 'Salt Debts', 'Final'], ['4', 'Buoy Lights', 'Revision']] },
    { name: 'Act II — One Tide Deep', chapters: [['11', 'The Ledger', 'Revision'], ['12', 'Low Water', 'Draft'], ['13', 'Drowned Bells', 'Draft']] },
  ]
  const tone: Record<string, string> = { Final: '#10b981', Revision: '#3b82f6', Draft: '#f59e0b' }
  return (
    <div className="space-y-4 p-5">
      {acts.map((act) => (
        <div key={act.name}>
          <p className="mb-2 font-semibold">{act.name}</p>
          <ul className="divide-y rounded-xl border" style={{ borderColor: T.border }}>
            {act.chapters.map(([n, title, status]) => (
              <li key={n} className="flex items-center gap-3 px-3 py-2" style={{ borderColor: T.border }}>
                <span className="w-6 tabular" style={{ color: T.muted }}>
                  {n}
                </span>
                <span className="flex-1">{title}</span>
                <span className="flex items-center gap-1.5 text-[11px]" style={{ color: T.dim }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone[status] }} />
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function PipelineView() {
  const stages: [string, string[]][] = [
    ['Script', ['Ch. 13', 'Ch. 14']],
    ['Thumbnail', ['Ch. 12']],
    ['Sketch', ['Ch. 11']],
    ['Line', []],
    ['Color', ['Ch. 10']],
    ['Letter', []],
    ['QA', []],
    ['Published', ['Ch. 1–9']],
  ]
  return (
    <div className="p-4">
      <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {stages.map(([stage, cards], i) => (
          <div key={stage} className="w-[7.25rem] flex-none rounded-xl border p-2" style={{ borderColor: T.border, background: `${T.hover}99` }}>
            <p className="flex items-center justify-between px-1 text-[11px] font-semibold">
              {stage}
              <span style={{ color: T.muted }}>{cards.length}</span>
            </p>
            <div className="mt-2 space-y-1.5">
              {cards.map((c) => (
                <div key={c} className="rounded-lg border px-2 py-2 text-[11.5px]" style={{ borderColor: T.border, background: T.card }}>
                  {c}
                  <div className="mt-1.5 h-1 rounded-full" style={{ background: '#222' }}>
                    <div className="h-1 rounded-full" style={{ width: `${((i + 1) / stages.length) * 100}%`, background: '#f97316' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 px-1 text-[11px]" style={{ color: T.muted }}>
        Drag a chapter to move it through production.
      </p>
    </div>
  )
}

function InsightsView() {
  const groups: [string, [string, string][]][] = [
    [
      'Analysis Tools',
      [
        ['Style Analysis', 'Prose quality, readability, word choice, dialogue, show vs tell'],
        ['Pacing Analysis', 'Rhythm, tension arc, drag and rush points, scene transitions'],
        ['Continuity Check', 'Plot holes, character contradictions, timeline errors'],
        ['Voice Consistency', 'Per-character speech profiles and drift detection'],
      ],
    ],
    [
      'Creative Tools',
      [
        ['Brainstorm', 'Talk through ideas with your project as context'],
        ['Chapter Summaries', 'Per-chapter summaries to keep the series straight'],
      ],
    ],
  ]
  return (
    <div className="space-y-4 p-5">
      {groups.map(([title, tools]) => (
        <div key={title}>
          <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: T.muted }}>
            {title}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {tools.map(([name, desc]) => (
              <div key={name} className="flex items-start gap-2.5 rounded-xl border p-3" style={{ borderColor: T.border, background: T.hover }}>
                <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-none" style={{ color: '#10b981' }} />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-[11px]" style={{ color: T.dim }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
