'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Library,
  Pin,
  Search,
  Settings,
  User,
  X,
} from 'lucide-react'
import BrowserFrame from './BrowserFrame'

// Highlight palette, in order, from Multi-Finder Pro v3 (content.js). Later keywords get generated hues.
const PALETTE = ['#FFFF77', '#7777FF', '#77FF92', '#C977FF', '#77FFE4', '#77C9FF', '#FF7792', '#FFAE77']

const ARTICLE = {
  title: 'Notes on lenses',
  paragraphs: [
    'Every photograph is a negotiation with light. The aperture decides how much of it gets in; the focal length decides how much of the world comes with it. Open the aperture wide and the depth of field collapses to a sliver. Stop it down and the whole scene sharpens, at the cost of light.',
    'Distortion is the part nobody prints on the box. Wide lenses bow straight lines outward into barrel distortion; long lenses pinch them inward. Good lens design rarely eliminates distortion so much as decides where to put it — and a little of it, used on purpose, can make a picture feel closer than it is.',
    'Then there is the iris: a ring of thin blades that pivot together to open and close the aperture. Count the blades and you can predict the shape of every out-of-focus highlight. Seven blades draw heptagons. Twelve draw a near-perfect circle of light.',
    'Coatings matter too. Each glass surface reflects a little light back, and a lens with a dozen elements can lose a surprising amount of contrast to flare. Modern coatings trade that loss for a faint violet or green cast you can sometimes see when you tilt the front element.',
  ],
}

const SAVED_SETS = [
  { name: 'Lens notes', keywords: ['aperture', 'distortion', 'light'], pinned: true },
  { name: 'Legal Research', keywords: ['indemnify', 'liability', 'termination'], pinned: false },
  { name: 'Bug Hunt', keywords: ['TODO', 'FIXME', 'deprecated'], pinned: false },
]

type Style = 'marker' | 'pill' | 'line'
type Theme = 'dark' | 'light'
type Tab = 'search' | 'library' | 'settings'

interface Keyword {
  term: string
  color: string
}

/** A run of article text; highlighted runs carry the keyword they matched and their ordinal. */
interface Segment {
  text: string
  key?: string
  n?: number
}

function colorAt(index: number) {
  return index < PALETTE.length ? PALETTE[index] : `hsl(${Math.round((index * 137.5) % 360)} 85% 74%)`
}

// Pick dark or light text for a highlight color, like the extension does.
function textOn(color: string) {
  if (!color.startsWith('#')) return '#1a1a2e'
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(color.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.32 ? '#1a1a2e' : '#ffffff'
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default function MultiFinderDemo({ className = '' }: { className?: string }) {
  const [keywords, setKeywords] = useState<Keyword[]>(() =>
    SAVED_SETS[0].keywords.map((term, i) => ({ term, color: colorAt(i) }))
  )
  const [draft, setDraft] = useState('')
  const [exact, setExact] = useState(false)
  const [tab, setTab] = useState<Tab>('search')
  const [style, setStyle] = useState<Style>('marker')
  const [theme, setTheme] = useState<Theme>('dark')
  const [saved, setSaved] = useState<string[]>([])
  const [positions, setPositions] = useState<Record<string, number>>({})
  const [active, setActive] = useState<{ term: string; n: number } | null>(null)
  const [ticks, setTicks] = useState<{ top: number; color: string }[]>([])
  const pageRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Live search: the term being typed is highlighted once it's two characters long.
  const live = draft.trim().length >= 2 && !keywords.some((k) => k.term.toLowerCase() === draft.trim().toLowerCase())
  const effective = useMemo(
    () => (live ? [...keywords, { term: draft.trim(), color: colorAt(keywords.length) }] : keywords),
    [keywords, draft, live]
  )

  // Split the article into plain and highlighted segments.
  const { segments, counts } = useMemo((): { segments: Segment[][]; counts: Record<string, number> } => {
    const counts: Record<string, number> = {}
    effective.forEach((k) => (counts[k.term.toLowerCase()] = 0))
    if (!effective.length) {
      return { segments: ARTICLE.paragraphs.map((p) => [{ text: p }]), counts }
    }
    const alternation = [...effective]
      .sort((a, b) => b.term.length - a.term.length)
      .map((k) => escapeRegExp(k.term))
      .join('|')
    const pattern = new RegExp(exact ? `\\b(${alternation})\\b` : `(${alternation})`, 'gi')
    const segments = ARTICLE.paragraphs.map((paragraph) => {
      const parts: Segment[] = []
      let last = 0
      for (const match of paragraph.matchAll(pattern)) {
        const start = match.index ?? 0
        if (start > last) parts.push({ text: paragraph.slice(last, start) })
        const key = match[0].toLowerCase()
        const owner = effective.find((k) => k.term.toLowerCase() === key)?.term.toLowerCase() ?? key
        counts[owner] = (counts[owner] ?? 0) + 1
        parts.push({ text: match[0], key: owner, n: counts[owner] })
        last = start + match[0].length
      }
      if (last < paragraph.length) parts.push({ text: paragraph.slice(last) })
      return parts
    })
    return { segments, counts }
  }, [effective, exact])

  const colorOf = (key: string) => effective.find((k) => k.term.toLowerCase() === key)?.color ?? PALETTE[0]

  // Scroll the page to the active match and recompute scrollbar markers after each render.
  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    const marks = Array.from(page.querySelectorAll<HTMLElement>('mark[data-kw]'))
    const height = page.scrollHeight || 1
    const next = marks.map((m) => ({ top: (m.offsetTop / height) * 100, color: m.dataset.color ?? '' }))
    setTicks((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
    if (active) {
      const el = page.querySelector<HTMLElement>(`mark[data-kw="${CSS.escape(active.term)}"][data-n="${active.n}"]`)
      if (el) page.scrollTo({ top: el.offsetTop - page.clientHeight / 2, behavior: 'smooth' })
    }
  }, [segments, active])

  const addKeyword = (raw: string) => {
    const term = raw.trim().replace(/,+$/, '')
    if (!term) return
    setKeywords((prev) =>
      prev.some((k) => k.term.toLowerCase() === term.toLowerCase()) ? prev : [...prev, { term, color: colorAt(prev.length) }]
    )
    setDraft('')
  }

  const removeKeyword = (term: string) => {
    setKeywords((prev) => prev.filter((k) => k.term !== term))
    setActive(null)
  }

  const navigate = (term: string, dir: 1 | -1) => {
    const key = term.toLowerCase()
    const total = counts[key] ?? 0
    if (!total) return
    const current = positions[key] ?? 0
    const n = current === 0 ? (dir === 1 ? 1 : total) : ((current - 1 + dir + total) % total) + 1
    setPositions((p) => ({ ...p, [key]: n }))
    setActive({ term: key, n })
  }

  const loadSet = (set: (typeof SAVED_SETS)[number]) => {
    setKeywords(set.keywords.map((term, i) => ({ term, color: colorAt(i) })))
    setPositions({})
    setActive(null)
    setTab('search')
  }

  const dark = theme === 'dark'
  const panel = dark
    ? 'border-white/[0.12] bg-[rgba(15,18,30,0.72)] text-white/[0.92]'
    : 'border-black/[0.08] bg-[rgba(255,255,255,0.78)] text-[#14151c]'
  const sub = dark ? 'text-white/60' : 'text-black/55'
  const chip = dark ? 'bg-white/[0.05] border-white/[0.08]' : 'bg-black/[0.035] border-black/[0.07]'
  const iconBtn = `grid place-items-center rounded-[10px] transition-colors ${dark ? 'bg-white/[0.05] hover:bg-white/[0.1]' : 'bg-black/[0.04] hover:bg-black/[0.08]'}`

  const markStyle = (color: string, isActive: boolean): React.CSSProperties => {
    const base: React.CSSProperties =
      style === 'line'
        ? { background: 'transparent', boxShadow: `inset 0 -0.18em 0 ${color}`, color: 'inherit' }
        : { background: color, color: textOn(color), borderRadius: style === 'pill' ? '999px' : '2px', padding: style === 'pill' ? '0 0.35em' : '0 0.06em' }
    return isActive ? { ...base, outline: '2px solid #111110', outlineOffset: '2px' } : base
  }

  return (
    <BrowserFrame url="notes.example/lenses" className={className}>
      <div className="relative grid md:block" aria-label="Interactive demo of Multi-Finder Pro" role="group">
        {/* The page being searched */}
        <div className="relative order-2 md:order-none">
          <div ref={pageRef} className="relative h-[22rem] overflow-y-auto scroll-smooth px-5 py-6 sm:px-8 md:h-[34rem] md:pr-[min(46%,27rem)] [scrollbar-width:none]">
            <p className="label text-muted">Journal — Optics</p>
            <h3 className="mt-2 font-serif text-[1.75rem] leading-tight tracking-[-0.01em] text-ink">{ARTICLE.title}</h3>
            <div className="mt-4 space-y-4 font-serif text-[0.95rem] leading-[1.7] text-ink/85">
              {segments.map((parts, p) => (
                <p key={p}>
                  {parts.map((part, i) =>
                    part.key ? (
                      <mark
                        key={i}
                        data-kw={part.key}
                        data-n={part.n}
                        data-color={colorOf(part.key)}
                        style={markStyle(colorOf(part.key), active?.term === part.key && active.n === part.n)}
                        className="transition-[outline-color] duration-200"
                      >
                        {part.text}
                      </mark>
                    ) : (
                      <Fragment key={i}>{part.text}</Fragment>
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
          {/* Scrollbar position markers */}
          <div className="pointer-events-none absolute inset-y-2 right-1.5 w-1.5" aria-hidden="true">
            {ticks.map((t, i) => (
              <span key={i} className="absolute h-[3px] w-full rounded-full" style={{ top: `${t.top}%`, background: t.color }} />
            ))}
          </div>
        </div>

        {/* The extension overlay */}
        <div
          className={`relative z-10 order-1 m-3 overflow-hidden rounded-[22px] border shadow-[0_28px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-[16px] backdrop-saturate-[1.4] md:absolute md:right-4 md:top-4 md:m-0 md:w-[min(44%,25rem)] ${panel}`}
        >
          {/* Header */}
          <div className={`flex items-center gap-2.5 border-b px-3 py-3 ${dark ? 'border-white/[0.08]' : 'border-black/[0.06]'}`}>
            <Image src="/work/multi-finder-pro/icon.png" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-[10px]" />
            <span className="text-[14px] font-extrabold tracking-[-0.02em]">Multi-Finder Pro</span>
            <span className={`rounded-md px-2 py-1 text-[10px] font-semibold uppercase ${dark ? 'bg-white/[0.08]' : 'bg-black/[0.06]'}`}>Free</span>
            <div className="ml-auto flex gap-1.5" aria-hidden="true">
              {[User, ChevronUp, X].map((Icon, i) => (
                <span key={i} className={`${iconBtn} h-[30px] w-[30px] ${i < 2 ? 'max-sm:hidden' : ''}`}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 p-2.5" role="tablist" aria-label="Multi-Finder Pro">
            {(
              [
                ['search', 'Search', Search],
                ['library', 'Library', Library],
                ['settings', 'Settings', Settings],
              ] as const
            ).map(([id, name, Icon]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[14px] border text-[12px] font-bold transition-colors ${
                  tab === id
                    ? `${dark ? 'bg-white/[0.07]' : 'bg-black/[0.05]'} border-[rgba(124,58,237,0.35)]`
                    : `border-transparent ${sub} hover:opacity-100`
                }`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                {name}
              </button>
            ))}
          </div>

          <div className="max-h-[22rem] overflow-y-auto px-2.5 pb-3 md:max-h-[25.5rem] [scrollbar-width:thin]">
            {tab === 'search' && (
              <>
                {/* Pill input */}
                <div
                  onClick={() => inputRef.current?.focus()}
                  className={`flex min-h-[50px] cursor-text flex-wrap items-center gap-1.5 rounded-2xl border-[1.5px] py-2 pl-9 pr-2 transition-shadow focus-within:border-[rgba(124,58,237,0.45)] focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.12)] ${
                    dark ? 'border-white/10 bg-white/[0.06]' : 'border-black/10 bg-white/70'
                  } relative`}
                >
                  <Search className={`absolute left-3 top-[17px] h-4 w-4 ${sub}`} strokeWidth={2} aria-hidden="true" />
                  {keywords.map((k) => (
                    <span
                      key={k.term}
                      className="inline-flex items-center gap-1 rounded-full py-1 pl-2.5 pr-1 text-[13px] font-bold"
                      style={{ background: k.color, color: textOn(k.color) }}
                    >
                      {k.term}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeKeyword(k.term)
                        }}
                        aria-label={`Remove ${k.term}`}
                        className="grid h-4 w-4 place-items-center rounded-full bg-black/25 text-white"
                      >
                        <X className="h-2.5 w-2.5" strokeWidth={3} />
                      </button>
                    </span>
                  ))}
                  <input
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => {
                      const v = e.target.value
                      if (v.endsWith(',')) addKeyword(v)
                      else setDraft(v)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addKeyword(draft)
                      } else if (e.key === 'Backspace' && !draft && keywords.length) {
                        removeKeyword(keywords[keywords.length - 1].term)
                      }
                    }}
                    aria-label="Add keyword"
                    placeholder={keywords.length ? '' : 'Type keyword and press ,'}
                    className={`min-w-[6rem] flex-1 bg-transparent py-1 text-[13px] outline-none ${dark ? 'placeholder:text-white/40' : 'placeholder:text-black/40'}`}
                  />
                </div>

                {/* Actions */}
                <div className="mt-2 flex gap-2 text-[13px] font-bold">
                  <button
                    type="button"
                    onClick={() => addKeyword(draft)}
                    className="h-11 flex-1 rounded-[14px] border border-[rgba(124,58,237,0.35)] bg-[rgba(124,58,237,0.18)] transition-colors hover:bg-[rgba(124,58,237,0.28)]"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setExact((v) => !v)
                      setActive(null)
                      setPositions({})
                    }}
                    aria-pressed={exact}
                    className={`h-11 w-[5.5rem] rounded-[14px] border ${chip}`}
                  >
                    {exact ? 'Exact' : 'Partial'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setKeywords([])
                      setDraft('')
                      setActive(null)
                      setPositions({})
                    }}
                    className="h-11 w-[4.5rem] rounded-[14px] border border-[rgba(244,63,94,0.2)] bg-[rgba(244,63,94,0.08)]"
                  >
                    Clear
                  </button>
                </div>

                {/* Results */}
                <ul className="mt-3 space-y-2.5" aria-live="polite">
                  {effective.map((k) => {
                    const key = k.term.toLowerCase()
                    const total = counts[key] ?? 0
                    const pos = positions[key] ?? 0
                    const isSaved = saved.includes(key)
                    return (
                      <li
                        key={key}
                        className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border py-3 pl-[18px] pr-3 ${chip}`}
                      >
                        <span className="absolute inset-y-0 left-0 w-[5px]" style={{ background: k.color }} />
                        <span className="h-9 w-9 flex-none rounded-[10px]" style={{ background: k.color }} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-extrabold">{k.term}</span>
                          <span className={`flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold ${sub}`}>
                            {total} {total === 1 ? 'match' : 'matches'}
                            <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                            <span className="tabular">
                              {pos}/{total}
                            </span>
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setSaved((s) => (isSaved ? s.filter((t) => t !== key) : [...s, key]))}
                          aria-label={isSaved ? `Unsave ${k.term}` : `Save keyword ${k.term}`}
                          className={`${iconBtn} h-[34px] w-[34px] max-sm:hidden`}
                        >
                          {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                        </button>
                        <button type="button" onClick={() => navigate(k.term, -1)} aria-label={`Previous match for ${k.term}`} className={`${iconBtn} h-[34px] w-[34px]`}>
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => navigate(k.term, 1)} aria-label={`Next match for ${k.term}`} className={`${iconBtn} h-[34px] w-[34px]`}>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}

            {tab === 'library' && (
              <div className="space-y-4 px-1 pt-1 text-[13px]">
                <LibraryGroup title="Pinned Sets" sub={sub}>
                  {SAVED_SETS.filter((s) => s.pinned).map((set) => (
                    <SetRow key={set.name} set={set} chip={chip} sub={sub} onLoad={() => loadSet(set)} pinned />
                  ))}
                </LibraryGroup>
                <LibraryGroup title="All Sets" sub={sub}>
                  {SAVED_SETS.map((set) => (
                    <SetRow key={set.name} set={set} chip={chip} sub={sub} onLoad={() => loadSet(set)} />
                  ))}
                </LibraryGroup>
                <LibraryGroup title="All Keywords" sub={sub}>
                  {saved.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {saved.map((t) => (
                        <span key={t} className={`rounded-full border px-2.5 py-1 font-semibold ${chip}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className={sub}>Saved keywords will appear here</p>
                  )}
                </LibraryGroup>
              </div>
            )}

            {tab === 'settings' && (
              <div className="space-y-3 px-1 pt-1 text-[13px]">
                <SettingRow title="Highlight style" desc="Choose how matches are highlighted" sub={sub}>
                  <Segmented options={['marker', 'pill', 'line'] as const} value={style} onChange={setStyle} chip={chip} dark={dark} />
                </SettingRow>
                <SettingRow title="Theme" desc="Dark or light mode" sub={sub}>
                  <Segmented options={['dark', 'light'] as const} value={theme} onChange={setTheme} chip={chip} dark={dark} />
                </SettingRow>
                <SettingRow title="Separator" desc="Character to separate keywords" sub={sub}>
                  <span className={`grid h-9 w-12 place-items-center rounded-xl border font-mono ${chip}`}>,</span>
                </SettingRow>
              </div>
            )}
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

function LibraryGroup({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <p className={`mb-2 text-[11px] font-bold uppercase tracking-wide ${sub}`}>{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function SetRow({
  set,
  chip,
  sub,
  onLoad,
  pinned,
}: {
  set: (typeof SAVED_SETS)[number]
  chip: string
  sub: string
  onLoad: () => void
  pinned?: boolean
}) {
  return (
    <button type="button" onClick={onLoad} className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-opacity hover:opacity-80 ${chip}`}>
      <span className="flex -space-x-1">
        {set.keywords.map((_, i) => (
          <span key={i} className="h-3 w-3 rounded-full ring-2 ring-black/20" style={{ background: colorAt(i) }} />
        ))}
      </span>
      <span className="flex-1">
        <span className="block font-bold">{set.name}</span>
        <span className={`text-[12px] ${sub}`}>{set.keywords.join(', ')}</span>
      </span>
      {pinned && <Pin className="h-3.5 w-3.5 opacity-60" />}
    </button>
  )
}

function SettingRow({ title, desc, sub, children }: { title: string; desc: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <div>
        <p className="font-bold">{title}</p>
        <p className={`text-[12px] ${sub}`}>{desc}</p>
      </div>
      {children}
    </div>
  )
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  chip,
  dark,
}: {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  chip: string
  dark: boolean
}) {
  return (
    <div className={`flex rounded-xl border p-0.5 ${chip}`} role="radiogroup">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`rounded-[10px] px-2.5 py-1.5 text-[12px] font-bold capitalize transition-colors ${
            value === o ? (dark ? 'bg-white/[0.14]' : 'bg-white shadow-sm') : 'opacity-60 hover:opacity-100'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
