'use client'

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks'

const WDTH_MIN = 75
const WDTH_MAX = 125
const WDTH_BASE = 100
const WGHT_BASE = 560
const WGHT_MAX = 760
const LETTER_SPACING = '-0.045em'

interface LensWordmarkProps {
  lines: string[]
  /** Accessible name for the heading. */
  label: string
  className?: string
}

/**
 * A wordmark set in a variable-width typeface that behaves like a lens: letters near the pointer
 * swell (wider, heavier) while the rest of the line compresses so each line keeps its overall
 * width. On load a virtual lens sweeps across once so touch and keyboard users see the effect too.
 * The first line is fitted to the container width.
 */
export default function LensWordmark({ lines, label, className = '' }: LensWordmarkProps) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  // Fit the first line to the available width. The measuring copy is removed straight away: left in
  // place, its 100px text would widen the page and cause horizontal scrolling on phones.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const fit = () => {
      const measure = document.createElement('span')
      measure.setAttribute('aria-hidden', 'true')
      measure.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-size:100px;font-weight:${WGHT_BASE};letter-spacing:${LETTER_SPACING};font-variation-settings:'wdth' ${WDTH_BASE}`
      measure.textContent = lines[0]
      root.appendChild(measure)
      const natural = measure.getBoundingClientRect().width
      measure.remove()
      if (natural > 0) root.style.setProperty('--lens-size', `${(root.clientWidth / natural) * 100 * 0.995}px`)
    }
    fit()
    document.fonts?.ready.then(fit)
    const observer = new ResizeObserver(fit)
    observer.observe(root)
    return () => observer.disconnect()
  }, [lines])

  // Lens interaction.
  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return

    const chars = Array.from(root.querySelectorAll<HTMLSpanElement>('[data-lens-char]'))
    const lineOf = chars.map((c) => Number(c.dataset.line))
    const current = chars.map(() => ({ w: WDTH_BASE, g: WGHT_BASE }))
    let pointer: { x: number; y: number } | null = null
    let sweeping = false
    let frame = 0

    const apply = () => {
      chars.forEach((c, i) => {
        c.style.fontVariationSettings = `'wdth' ${current[i].w.toFixed(1)}, 'wght' ${current[i].g.toFixed(0)}`
      })
    }

    const tick = () => {
      frame = 0
      const size = parseFloat(getComputedStyle(root).fontSize) || 100
      const radius = size * 0.85
      const influence = chars.map((c) => {
        if (!pointer) return 0
        const r = c.getBoundingClientRect()
        const dx = (r.left + r.width / 2 - pointer.x) / radius
        const dy = (r.top + r.height / 2 - pointer.y) / (radius * 1.15)
        return Math.exp(-(dx * dx + dy * dy))
      })

      // Mean influence per line, so swelling letters are paid for by the rest of their line.
      const mean = new Map<number, { sum: number; n: number }>()
      influence.forEach((v, i) => {
        const m = mean.get(lineOf[i]) ?? { sum: 0, n: 0 }
        mean.set(lineOf[i], { sum: m.sum + v, n: m.n + 1 })
      })

      let moving = false
      influence.forEach((v, i) => {
        const m = mean.get(lineOf[i])!
        const targetW = Math.min(WDTH_MAX, Math.max(WDTH_MIN, WDTH_BASE + 85 * (v - m.sum / m.n)))
        const targetG = WGHT_BASE + (WGHT_MAX - WGHT_BASE) * v
        const c = current[i]
        c.w += (targetW - c.w) * 0.14
        c.g += (targetG - c.g) * 0.14
        if (Math.abs(targetW - c.w) > 0.05 || Math.abs(targetG - c.g) > 0.5) moving = true
      })
      apply()
      if (moving || pointer) frame = requestAnimationFrame(tick)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (sweeping) return
      const r = root.getBoundingClientRect()
      const margin = r.height * 0.25
      const inside =
        e.clientX > r.left - margin && e.clientX < r.right + margin && e.clientY > r.top - margin && e.clientY < r.bottom + margin
      pointer = inside ? { x: e.clientX, y: e.clientY } : null
      schedule()
    }
    const onLeave = () => {
      if (sweeping) return
      pointer = null
      schedule()
    }

    // Intro: sweep a virtual lens across the first line.
    let sweepFrame = 0
    const sweep = () => {
      const r = root.getBoundingClientRect()
      const first = chars.filter((_, i) => lineOf[i] === 0)
      if (!first.length) return
      const a = first[0].getBoundingClientRect()
      const b = first[first.length - 1].getBoundingClientRect()
      const y = (a.top + a.bottom) / 2
      const from = r.left - a.width
      const to = b.right + b.width
      const duration = 2200
      const start = performance.now()
      sweeping = true
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        pointer = { x: from + (to - from) * eased, y }
        schedule()
        if (t < 1) sweepFrame = requestAnimationFrame(step)
        else {
          sweeping = false
          pointer = null
          schedule()
        }
      }
      sweepFrame = requestAnimationFrame(step)
    }
    const intro = window.setTimeout(() => {
      if (root.getBoundingClientRect().bottom > 0) sweep()
    }, 450)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.clearTimeout(intro)
      cancelAnimationFrame(frame)
      cancelAnimationFrame(sweepFrame)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reducedMotion])

  return (
    <h1
      ref={rootRef}
      aria-label={label}
      className={`lens relative select-none ${className}`}
      style={{ letterSpacing: LETTER_SPACING, fontWeight: WGHT_BASE }}
    >
      {lines.map((line, l) => (
        <span key={l} className="block whitespace-nowrap" aria-hidden="true">
          {Array.from(line).map((ch, i) => (
            <span
              key={i}
              data-lens-char=""
              data-line={l}
              style={{ fontVariationSettings: `'wdth' ${WDTH_BASE}, 'wght' ${WGHT_BASE}` }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
