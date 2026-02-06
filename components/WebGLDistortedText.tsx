'use client'

import { useRef, useEffect, useState } from 'react'

interface WebGLDistortedTextProps {
  children: string
  className?: string
}

export default function WebGLDistortedText({ children, className = '' }: WebGLDistortedTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const [fontSize, setFontSize] = useState(72)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const isHoveringRef = useRef(false)
  const hoverRef = useRef(0)

  // Responsive font sizing with ResizeObserver
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateSize = () => {
      const computed = window.getComputedStyle(container)
      const size = parseFloat(computed.fontSize)
      setFontSize(Math.round(size * 1.4))
    }

    updateSize()

    const observer = new ResizeObserver(updateSize)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || fontSize < 10) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    if (width === 0 || height === 0) return

    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const font = `bold ${fontSize}px "Outfit", system-ui, sans-serif`
    const startTime = performance.now()

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const render = () => {
      const time = (performance.now() - startTime) / 1000
      const target = mouseRef.current
      const sm = smoothMouseRef.current

      // Silky-smooth mouse interpolation
      sm.x = lerp(sm.x, target.x, 0.07)
      sm.y = lerp(sm.y, target.y, 0.07)

      // Smooth hover transition (no pop-in)
      hoverRef.current = lerp(hoverRef.current, isHoveringRef.current ? 1 : 0, 0.05)
      const h = hoverRef.current

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      // Mouse influence (smooth, dampened)
      const mx = (sm.x - 0.5) * 35 * h
      const my = (sm.y - 0.5) * 18 * h

      // Organic time curves at different frequencies
      const s1 = Math.sin(time * 1.1)
      const c1 = Math.cos(time * 0.85)
      const s2 = Math.sin(time * 1.7 + 1.2)
      const c2 = Math.cos(time * 2.0 + 0.5)

      // Slow breathing modulation (alive quality)
      const breath = 0.5 + 0.5 * Math.sin(time * 0.7)

      // Shared liquid displacement for all layers
      const dx = s1 * 0.9 * (1 + h * 0.6) + mx * 0.06
      const dy = c1 * 0.55 * (1 + h * 0.6) + my * 0.06

      ctx.font = font
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // ═══════════════════════════════════════════════════
      // LAYER 0: Multi-color ambient glow
      // Creates the luminous halo behind the glass text
      // ═══════════════════════════════════════════════════
      ctx.save()
      ctx.shadowColor = `rgba(130, 80, 230, ${0.35 + h * 0.2 + s1 * 0.06 + breath * 0.05})`
      ctx.shadowBlur = 55 + h * 25 + s1 * 8 + breath * 8
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.fillStyle = 'rgba(0,0,0,0)'
      ctx.fillText(children, cx, cy)
      // Cyan accent halo
      ctx.shadowColor = `rgba(30, 160, 255, ${0.2 + h * 0.15 + c1 * 0.05 + breath * 0.04})`
      ctx.shadowBlur = 70 + h * 30 + c1 * 10 + breath * 6
      ctx.fillText(children, cx, cy)
      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 1: Deep shadow with chromatic tint
      // Grounds the glass with 3D depth
      // ═══════════════════════════════════════════════════
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.55)'
      ctx.shadowBlur = 30
      ctx.shadowOffsetX = 3.5 + s1 * 0.4
      ctx.shadowOffsetY = 5 + c1 * 0.4
      ctx.fillStyle = 'rgba(8, 4, 25, 0.2)'
      ctx.fillText(children, cx + 2, cy + 2)
      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 1.5: Glass thickness edge
      // Simulates the visible edge of thick glass
      // ═══════════════════════════════════════════════════
      ctx.save()
      ctx.fillStyle = 'rgba(100, 80, 160, 0.12)'
      ctx.fillText(children, cx + 1.5 + dx * 0.4, cy + 1.8 + dy * 0.4)
      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 2: Chromatic aberration
      // R/G/B channel separation rotating around the text
      // like light refracting through a glass prism
      // ═══════════════════════════════════════════════════
      const caBase = 2.5 + h * 4.5 + Math.abs(s1) * 1.2
      const caAng = time * 0.25 + (sm.x - 0.5) * 0.6

      ctx.globalCompositeOperation = 'screen'

      // Red channel
      ctx.fillStyle = `rgba(255, 30, 70, ${0.28 + h * 0.18})`
      ctx.fillText(children,
        cx + Math.cos(caAng) * caBase + mx * 0.25,
        cy + Math.sin(caAng) * caBase * 0.45 + my * 0.12
      )

      // Blue channel (opposite direction)
      ctx.fillStyle = `rgba(30, 80, 255, ${0.28 + h * 0.18})`
      ctx.fillText(children,
        cx + Math.cos(caAng + Math.PI) * caBase - mx * 0.25,
        cy + Math.sin(caAng + Math.PI) * caBase * 0.45 - my * 0.12
      )

      // Green channel (perpendicular, subtle)
      ctx.fillStyle = `rgba(30, 255, 100, ${0.14 + h * 0.1})`
      ctx.fillText(children,
        cx + Math.cos(caAng + Math.PI * 0.5) * caBase * 0.35,
        cy + Math.sin(caAng + Math.PI * 0.5) * caBase * 0.25
      )

      // Cyan accent channel
      ctx.fillStyle = `rgba(0, 200, 255, ${0.12 + h * 0.1})`
      ctx.fillText(children,
        cx + Math.cos(caAng + Math.PI * 1.15) * caBase * 0.5,
        cy + Math.sin(caAng + Math.PI * 1.15) * caBase * 0.3
      )

      ctx.globalCompositeOperation = 'source-over'

      // ═══════════════════════════════════════════════════
      // LAYER 3: Glass body — main text
      // Dynamic gradient simulating thick glass with
      // light passing through, rotating slowly
      // ═══════════════════════════════════════════════════
      const ga = time * 0.12
      const glassGrad = ctx.createLinearGradient(
        cx + Math.cos(ga) * 280, cy + Math.sin(ga) * 60,
        cx - Math.cos(ga) * 280, cy - Math.sin(ga) * 60
      )
      glassGrad.addColorStop(0, 'rgba(255,255,255,0.97)')
      glassGrad.addColorStop(0.18, 'rgba(238,242,255,0.94)')
      glassGrad.addColorStop(0.35, 'rgba(255,255,255,0.97)')
      glassGrad.addColorStop(0.5, 'rgba(242,238,255,0.93)')
      glassGrad.addColorStop(0.65, 'rgba(255,255,255,0.97)')
      glassGrad.addColorStop(0.82, 'rgba(238,245,255,0.94)')
      glassGrad.addColorStop(1, 'rgba(255,255,255,0.97)')

      ctx.save()
      ctx.shadowColor = `rgba(140,100,255,${0.45 + h * 0.25 + s1 * 0.06})`
      ctx.shadowBlur = 28 + h * 18 + s1 * 4
      ctx.fillStyle = glassGrad
      ctx.fillText(children, cx + dx, cy + dy)
      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 4: Caustic light patterns
      // Simulates light focusing and swimming inside glass
      // like sunlight through a water glass
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'overlay'

      // Caustic 1 — slow, wide sweep
      const k1x = cx + Math.sin(time * 0.45) * 220 + mx * 1.8
      const k1y = cy + Math.cos(time * 0.3) * 25 + my * 0.7
      const k1 = ctx.createRadialGradient(k1x, k1y, 0, k1x, k1y, 140 + s2 * 15)
      k1.addColorStop(0, `rgba(255,255,255,${0.8 + s1 * 0.08})`)
      k1.addColorStop(0.15, `rgba(255,252,245,${0.45 + c1 * 0.06})`)
      k1.addColorStop(0.45, 'rgba(255,255,255,0.12)')
      k1.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = k1
      ctx.fillText(children, cx + dx, cy + dy)

      // Caustic 2 — counter-moving, cooler tone
      const k2x = cx + Math.cos(time * 0.38 + 2.2) * 190 - mx
      const k2y = cy + Math.sin(time * 0.5 + 0.8) * 20 - my * 0.4
      const k2 = ctx.createRadialGradient(k2x, k2y, 0, k2x, k2y, 100)
      k2.addColorStop(0, `rgba(220,240,255,${0.55 + c2 * 0.08})`)
      k2.addColorStop(0.3, 'rgba(220,240,255,0.15)')
      k2.addColorStop(1, 'rgba(220,240,255,0)')
      ctx.fillStyle = k2
      ctx.fillText(children, cx + dx, cy + dy)

      // Caustic 3 — small, fast-moving
      const k3x = cx + Math.sin(time * 1.1 + 4) * 110 + mx * 0.4
      const k3y = cy + Math.cos(time * 1.4 + 1.5) * 12
      const k3 = ctx.createRadialGradient(k3x, k3y, 0, k3x, k3y, 55)
      k3.addColorStop(0, `rgba(255,255,255,${0.45 + s2 * 0.1})`)
      k3.addColorStop(0.35, 'rgba(255,255,255,0.08)')
      k3.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = k3
      ctx.fillText(children, cx + dx, cy + dy)

      ctx.globalCompositeOperation = 'source-over'

      // ═══════════════════════════════════════════════════
      // LAYER 5: Fresnel rim lights
      // Glass edges are brighter due to total internal
      // reflection — top rim bright, bottom rim subtle
      // ═══════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      // Top rim — strong white edge light
      const topRim = ctx.createLinearGradient(
        cx, cy - fontSize * 0.46,
        cx, cy - fontSize * 0.04
      )
      topRim.addColorStop(0, `rgba(255,255,255,${0.85 + s1 * 0.08})`)
      topRim.addColorStop(0.25, `rgba(255,255,255,${0.25 + c1 * 0.06})`)
      topRim.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = topRim
      ctx.fillText(children, cx + dx * 0.4, cy + dy * 0.25 - 1)

      // Bottom rim — fainter, cooler
      const btmRim = ctx.createLinearGradient(
        cx, cy + fontSize * 0.46,
        cx, cy + fontSize * 0.08
      )
      btmRim.addColorStop(0, `rgba(190,210,255,${0.25 + c1 * 0.04})`)
      btmRim.addColorStop(0.35, 'rgba(190,210,255,0.04)')
      btmRim.addColorStop(1, 'rgba(190,210,255,0)')
      ctx.fillStyle = btmRim
      ctx.fillText(children, cx + dx * 0.4, cy + dy * 0.25 + 1)

      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 6: Specular highlights
      // Sharp, bright point-light reflections moving across
      // the glass surface — 4 lights at different speeds
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'screen'

      // Primary specular — large, bright, slow
      const p1x = cx + Math.sin(time * 0.65) * 130 + mx * 1.6
      const p1y = cy - 3 + Math.cos(time * 0.45) * 7 + my * 0.4
      const g1 = ctx.createRadialGradient(p1x, p1y, 0, p1x, p1y, 48 + h * 8)
      g1.addColorStop(0, `rgba(255,255,255,${0.92 + h * 0.08})`)
      g1.addColorStop(0.12, `rgba(255,255,255,${0.55 + h * 0.1})`)
      g1.addColorStop(0.35, 'rgba(255,255,255,0.12)')
      g1.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g1
      ctx.fillText(children, cx, cy)

      // Secondary specular — medium, cooler tint
      const p2x = cx + Math.cos(time * 0.5 + 1.8) * 170 - mx * 0.7
      const p2y = cy + 2 + Math.sin(time * 0.6) * 5
      const g2 = ctx.createRadialGradient(p2x, p2y, 0, p2x, p2y, 32)
      g2.addColorStop(0, 'rgba(195,225,255,0.75)')
      g2.addColorStop(0.25, 'rgba(195,225,255,0.2)')
      g2.addColorStop(1, 'rgba(195,225,255,0)')
      ctx.fillStyle = g2
      ctx.fillText(children, cx, cy)

      // Tertiary specular — small, sharp, faster
      const p3x = cx + Math.sin(time * 1.05 + 3.2) * 90 + mx * 0.25
      const p3y = cy - 5 + Math.cos(time * 1.3) * 3
      const g3 = ctx.createRadialGradient(p3x, p3y, 0, p3x, p3y, 18)
      g3.addColorStop(0, 'rgba(255,255,255,1)')
      g3.addColorStop(0.15, 'rgba(255,255,255,0.55)')
      g3.addColorStop(0.45, 'rgba(255,255,255,0.08)')
      g3.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g3
      ctx.fillText(children, cx, cy)

      // Quaternary specular — pinpoint, very sharp
      const p4x = cx + Math.cos(time * 0.85 + 5.1) * 150
      const p4y = cy - 2 + Math.sin(time * 1.15 + 0.8) * 4
      const g4 = ctx.createRadialGradient(p4x, p4y, 0, p4x, p4y, 10)
      g4.addColorStop(0, 'rgba(255,255,255,1)')
      g4.addColorStop(0.12, 'rgba(255,255,255,0.6)')
      g4.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g4
      ctx.fillText(children, cx, cy)

      ctx.globalCompositeOperation = 'source-over'

      // ═══════════════════════════════════════════════════
      // LAYER 7: Iridescent thin-film interference
      // Always-active rainbow color shift across the glass
      // simulating thin-film optical interference
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'overlay'

      const iP = time * 0.18 + (sm.x - 0.5) * 2.5
      const iG = ctx.createLinearGradient(
        cx - 320 + Math.sin(iP) * 120, cy - 15,
        cx + 320 + Math.sin(iP) * 120, cy + 15
      )
      const iA = 0.1 + h * 0.18 + Math.abs(s2) * 0.04
      iG.addColorStop(0, `rgba(255,50,90,${iA})`)
      iG.addColorStop(0.17, `rgba(255,160,40,${iA * 0.75})`)
      iG.addColorStop(0.35, `rgba(40,255,110,${iA})`)
      iG.addColorStop(0.52, `rgba(40,170,255,${iA})`)
      iG.addColorStop(0.7, `rgba(170,50,255,${iA * 0.85})`)
      iG.addColorStop(0.88, `rgba(255,50,140,${iA * 0.9})`)
      iG.addColorStop(1, `rgba(255,80,60,${iA * 0.7})`)
      ctx.fillStyle = iG
      ctx.fillText(children, cx + dx, cy + dy)

      ctx.globalCompositeOperation = 'source-over'

      // ═══════════════════════════════════════════════════
      // LAYER 8: Refraction light band
      // Horizontal band of warm→cool light shifting
      // through the glass like refracted environment light
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'soft-light'

      const bY = cy + Math.sin(time * 0.55) * fontSize * 0.18 + my * 0.25
      const bG = ctx.createLinearGradient(cx - 320, bY - 12, cx + 320, bY + 12)
      bG.addColorStop(0, 'rgba(255,200,150,0)')
      bG.addColorStop(0.25, `rgba(255,225,185,${0.25 + s1 * 0.08})`)
      bG.addColorStop(0.5, `rgba(255,255,255,${0.35 + c1 * 0.08})`)
      bG.addColorStop(0.75, `rgba(185,225,255,${0.25 + s1 * 0.08})`)
      bG.addColorStop(1, 'rgba(150,200,255,0)')
      ctx.fillStyle = bG
      ctx.fillText(children, cx + dx, cy + dy)

      ctx.globalCompositeOperation = 'source-over'

      // ═══════════════════════════════════════════════════
      // LAYER 9: Sweeping light streak
      // A bright beam that oscillates across the text
      // like light sliding across a glass surface,
      // with chromatic edges (prismatic split)
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'screen'

      const streakPhase = Math.sin(time * 0.35)
      const streakX = cx + streakPhase * (width * 0.55)
      const halfW = 28 + h * 8
      // Intensity fades at edges of sweep, brightest at center
      const streakIntensity = 0.6 + Math.abs(Math.cos(time * 0.35)) * 0.4

      // Main white streak
      const sG = ctx.createLinearGradient(streakX - halfW, cy, streakX + halfW, cy)
      const sA = (0.2 + h * 0.25) * streakIntensity
      sG.addColorStop(0, 'rgba(255,255,255,0)')
      sG.addColorStop(0.3, `rgba(255,250,240,${sA * 0.3})`)
      sG.addColorStop(0.48, `rgba(255,255,255,${sA})`)
      sG.addColorStop(0.52, `rgba(255,255,255,${sA})`)
      sG.addColorStop(0.7, `rgba(240,250,255,${sA * 0.3})`)
      sG.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = sG
      ctx.fillText(children, cx, cy)

      // Chromatic split at streak edges (prismatic dispersion)
      const csA = sA * 0.35
      const csG = ctx.createLinearGradient(
        streakX - halfW * 1.5, cy,
        streakX + halfW * 1.5, cy
      )
      csG.addColorStop(0, 'rgba(255,100,50,0)')
      csG.addColorStop(0.25, `rgba(255,100,50,${csA})`)
      csG.addColorStop(0.45, 'rgba(255,255,255,0)')
      csG.addColorStop(0.55, 'rgba(255,255,255,0)')
      csG.addColorStop(0.75, `rgba(50,150,255,${csA})`)
      csG.addColorStop(1, 'rgba(50,150,255,0)')
      ctx.fillStyle = csG
      ctx.fillText(children, cx, cy)

      ctx.globalCompositeOperation = 'source-over'

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    // ── Event handlers ───────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouseRef.current = {
        x: (t.clientX - rect.left) / rect.width,
        y: (t.clientY - rect.top) / rect.height
      }
      isHoveringRef.current = true
    }

    const handleEnter = () => { isHoveringRef.current = true }
    const handleLeave = () => {
      isHoveringRef.current = false
      mouseRef.current = { x: 0.5, y: 0.5 }
    }
    const handleTouchEnd = () => {
      isHoveringRef.current = false
      mouseRef.current = { x: 0.5, y: 0.5 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleEnter)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchstart', handleEnter)
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      cancelAnimationFrame(animationRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleEnter)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleEnter)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [children, fontSize])

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ fontSize: 'inherit', width: '100%', maxWidth: '800px' }}
    >
      <canvas
        ref={canvasRef}
        className="cursor-crosshair touch-none"
        style={{
          width: '100%',
          height: `${Math.max(fontSize * 1.8, 90)}px`,
          display: 'block'
        }}
      />
    </div>
  )
}
