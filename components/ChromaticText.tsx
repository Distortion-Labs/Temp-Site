'use client'

import { useRef, useEffect, useState } from 'react'

interface ChromaticTextProps {
  children: string
  className?: string
}

export default function ChromaticText({ children, className = '' }: ChromaticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = 1 - (rect.top + rect.height / 2) / viewH
      setScrollProgress(Math.max(-1, Math.min(1, (progress - 0.5) * 2)))
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Displacement amounts driven by hover, scroll, and mouse
  const hoverMult = isHovering ? 1.6 : 1
  const scrollShift = scrollProgress * 4
  const mouseShiftX = mouse.x * 3 * hoverMult
  const mouseShiftY = mouse.y * 1.5 * hoverMult

  const redX = (2 + mouseShiftX + scrollShift * 0.5) * hoverMult
  const redY = (0.5 + mouseShiftY * 0.3) * hoverMult
  const blueX = (-2 - mouseShiftX - scrollShift * 0.5) * hoverMult
  const blueY = (-0.5 - mouseShiftY * 0.3) * hoverMult

  return (
    <div
      ref={containerRef}
      className={`chromatic-text-wrapper ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
    >
      {/* Red channel */}
      <span
        className="chromatic-layer chromatic-red"
        aria-hidden="true"
        style={{
          transform: `translate(${redX}px, ${redY}px)`,
        }}
      >
        {children}
      </span>

      {/* Blue channel */}
      <span
        className="chromatic-layer chromatic-blue"
        aria-hidden="true"
        style={{
          transform: `translate(${blueX}px, ${blueY}px)`,
        }}
      >
        {children}
      </span>

      {/* Main white text on top */}
      <span
        className="chromatic-main"
        style={{
          transform: `translate(${mouseShiftX * 0.15}px, ${(scrollShift * 0.3 + mouseShiftY * 0.1)}px)`,
        }}
      >
        {children}
      </span>
    </div>
  )
}
