'use client'

import { useRef, useEffect, useCallback } from 'react'

interface ChromaticTextProps {
  children: string
  className?: string
}

export default function ChromaticText({ children, className = '' }: ChromaticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const redRef = useRef<HTMLSpanElement>(null)
  const blueRef = useRef<HTMLSpanElement>(null)
  const mainRef = useRef<HTMLSpanElement>(null)
  const isHoveringRef = useRef(false)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const update = useCallback(() => {
    const hoverMult = isHoveringRef.current ? 1.6 : 1
    const sp = scrollRef.current
    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    const scrollShift = sp * 4
    const mouseShiftX = mx * 3 * hoverMult
    const mouseShiftY = my * 1.5 * hoverMult

    const redX = (2 + mouseShiftX + scrollShift * 0.5) * hoverMult
    const redY = (0.5 + mouseShiftY * 0.3) * hoverMult
    const blueX = (-2 - mouseShiftX - scrollShift * 0.5) * hoverMult
    const blueY = (-0.5 - mouseShiftY * 0.3) * hoverMult

    if (redRef.current) redRef.current.style.transform = `translate(${redX}px, ${redY}px)`
    if (blueRef.current) blueRef.current.style.transform = `translate(${blueX}px, ${blueY}px)`
    if (mainRef.current) mainRef.current.style.transform = `translate(${mouseShiftX * 0.15}px, ${scrollShift * 0.3 + mouseShiftY * 0.1}px)`

    rafRef.current = null
  }, [])

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(update)
    }
  }, [update])

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = 1 - (rect.top + rect.height / 2) / viewH
      scrollRef.current = Math.max(-1, Math.min(1, (progress - 0.5) * 2))
      scheduleUpdate()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
      scheduleUpdate()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [scheduleUpdate])

  return (
    <div
      ref={containerRef}
      className={`chromatic-text-wrapper ${className}`}
      onMouseEnter={() => { isHoveringRef.current = true; scheduleUpdate() }}
      onMouseLeave={() => { isHoveringRef.current = false; scheduleUpdate() }}
      style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
    >
      {/* Red channel */}
      <span
        ref={redRef}
        className="chromatic-layer chromatic-red"
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Blue channel */}
      <span
        ref={blueRef}
        className="chromatic-layer chromatic-blue"
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Main white text on top */}
      <span ref={mainRef} className="chromatic-main">
        {children}
      </span>
    </div>
  )
}
