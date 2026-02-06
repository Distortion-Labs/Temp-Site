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
  // Gyroscope + scroll refs
  const gyroRef = useRef({ x: 0.5, y: 0.5 })
  const smoothGyroRef = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0.5)
  const smoothScrollRef = useRef(0.5)
  const gyroRequestedRef = useRef(false)

  // Responsive font sizing with ResizeObserver
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateSize = () => {
      const computed = window.getComputedStyle(container)
      const size = parseFloat(computed.fontSize)
      setFontSize(Math.round(size * 1.2))
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
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // ── Gyroscope handler ──────────────────────────────
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma || 0
      const beta = e.beta || 0
      gyroRef.current = {
        x: Math.max(0, Math.min(1, (gamma + 45) / 90)),
        y: Math.max(0, Math.min(1, (beta - 15 + 45) / 90))
      }
    }

    // ── Scroll handler (active on ALL devices) ────────
    const handleScroll = () => {
      const rect = canvas.getBoundingClientRect()
      const viewH = window.innerHeight
      scrollRef.current = Math.max(0, Math.min(1,
        1 - (rect.top + rect.height / 2) / viewH
      ))
    }

    // Start gyro listeners (mobile only)
    if (isMobile) {
      if (typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
        window.addEventListener('deviceorientation', handleOrientation)
      }
    }

    // Scroll active on ALL devices
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    const render = () => {
      const time = (performance.now() - startTime) / 1000
      const target = mouseRef.current
      const sm = smoothMouseRef.current

      // Silky-smooth mouse interpolation
      sm.x = lerp(sm.x, target.x, 0.07)
      sm.y = lerp(sm.y, target.y, 0.07)

      // Smooth gyro interpolation
      const sg = smoothGyroRef.current
      sg.x = lerp(sg.x, gyroRef.current.x, 0.06)
      sg.y = lerp(sg.y, gyroRef.current.y, 0.06)

      // Smooth scroll
      smoothScrollRef.current = lerp(smoothScrollRef.current, scrollRef.current, 0.08)

      // Smooth hover transition
      hoverRef.current = lerp(hoverRef.current, isHoveringRef.current ? 1 : 0, 0.05)
      const h = hoverRef.current

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      // ── MOUSE: always active, hover amplifies ──────
      // Base ambient tracking + hover boost
      const mx = (sm.x - 0.5) * (18 + h * 45)
      const my = (sm.y - 0.5) * (10 + h * 25)

      // ── GYRO: always active on mobile, strong ──────
      const gx = (sg.x - 0.5) * 60
      const gy = (sg.y - 0.5) * 40

      // ── SCROLL: always active on all devices, strong ──
      const sy = (smoothScrollRef.current - 0.5) * 45

      // Combined motion magnitude (for effect scaling)
      const gyroMotion = (Math.abs(sg.x - 0.5) + Math.abs(sg.y - 0.5)) * 2
      const scrollMotion = Math.abs(smoothScrollRef.current - 0.5) * 2

      // Combined interaction input
      const ix = mx + gx
      const iy = my + gy + sy

      // Unified input position (0-1) for angle calcs
      const inputX = isMobile ? sg.x : sm.x
      const inputY = isMobile ? sg.y : sm.y

      // Organic time curves
      const s1 = Math.sin(time * 1.1)
      const c1 = Math.cos(time * 0.85)
      const s2 = Math.sin(time * 1.7 + 1.2)
      const c2 = Math.cos(time * 2.0 + 0.5)

      // Slow breathing
      const breath = 0.5 + 0.5 * Math.sin(time * 0.7)

      // Shared liquid displacement
      const dx = s1 * 1.2 * (1 + h * 0.8) + ix * 0.08
      const dy = c1 * 0.8 * (1 + h * 0.8) + iy * 0.08

      ctx.font = font
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // ═══════════════════════════════════════════════════
      // LAYER 0: Multi-color ambient glow
      // ═══════════════════════════════════════════════════
      ctx.save()
      ctx.shadowColor = `rgba(130, 80, 230, ${0.35 + h * 0.2 + s1 * 0.06 + breath * 0.05 + gyroMotion * 0.12 + scrollMotion * 0.08})`
      ctx.shadowBlur = 55 + h * 25 + s1 * 8 + breath * 8
      ctx.shadowOffsetX = ix * 0.15
      ctx.shadowOffsetY = iy * 0.1
      ctx.fillStyle = 'rgba(0,0,0,0)'
      ctx.fillText(children, cx, cy)
      ctx.shadowColor = `rgba(30, 160, 255, ${0.2 + h * 0.15 + c1 * 0.05 + breath * 0.04})`
      ctx.shadowBlur = 70 + h * 30 + c1 * 10 + breath * 6
      ctx.fillText(children, cx, cy)
      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 1: Deep shadow
      // ═══════════════════════════════════════════════════
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowBlur = 25
      ctx.shadowOffsetX = 3 + s1 * 0.4 + ix * 0.05
      ctx.shadowOffsetY = 4.5 + c1 * 0.4 + iy * 0.04
      ctx.fillStyle = 'rgba(8, 4, 25, 0.18)'
      ctx.fillText(children, cx + 2, cy + 2)
      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 1.5: Glass thickness edge
      // ═══════════════════════════════════════════════════
      ctx.save()
      ctx.fillStyle = 'rgba(100, 80, 160, 0.1)'
      ctx.fillText(children, cx + 1.5 + dx * 0.4, cy + 1.8 + dy * 0.4)
      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 2: Chromatic aberration (behind glass)
      // Strong color fringe visible through translucent glass
      // ═══════════════════════════════════════════════════
      const caBase = 3 + h * 5 + gyroMotion * 4 + scrollMotion * 2.5 + Math.abs(s1) * 1.5
      const caAng = time * 0.25 + (inputX - 0.5) * 0.8

      ctx.globalCompositeOperation = 'screen'

      // Red channel
      ctx.fillStyle = `rgba(255, 30, 70, ${0.4 + h * 0.2 + gyroMotion * 0.1})`
      ctx.fillText(children,
        cx + Math.cos(caAng) * caBase + ix * 0.3,
        cy + Math.sin(caAng) * caBase * 0.45 + iy * 0.15
      )

      // Blue channel
      ctx.fillStyle = `rgba(30, 80, 255, ${0.4 + h * 0.2 + gyroMotion * 0.1})`
      ctx.fillText(children,
        cx + Math.cos(caAng + Math.PI) * caBase - ix * 0.3,
        cy + Math.sin(caAng + Math.PI) * caBase * 0.45 - iy * 0.15
      )

      // Green channel
      ctx.fillStyle = `rgba(30, 255, 100, ${0.2 + h * 0.12})`
      ctx.fillText(children,
        cx + Math.cos(caAng + Math.PI * 0.5) * caBase * 0.4,
        cy + Math.sin(caAng + Math.PI * 0.5) * caBase * 0.3
      )

      // Cyan accent
      ctx.fillStyle = `rgba(0, 200, 255, ${0.18 + h * 0.12})`
      ctx.fillText(children,
        cx + Math.cos(caAng + Math.PI * 1.15) * caBase * 0.55,
        cy + Math.sin(caAng + Math.PI * 1.15) * caBase * 0.35
      )

      ctx.globalCompositeOperation = 'source-over'

      // ═══════════════════════════════════════════════════
      // LAYER 3: Glass body — TRANSLUCENT
      // Reduced opacity so chromatic aberration and layers
      // beneath are visible through the glass
      // ═══════════════════════════════════════════════════
      const ga = time * 0.12
      const glassGrad = ctx.createLinearGradient(
        cx + Math.cos(ga) * 280, cy + Math.sin(ga) * 60,
        cx - Math.cos(ga) * 280, cy - Math.sin(ga) * 60
      )
      glassGrad.addColorStop(0, 'rgba(255,255,255,0.62)')
      glassGrad.addColorStop(0.18, 'rgba(238,242,255,0.55)')
      glassGrad.addColorStop(0.35, 'rgba(255,255,255,0.62)')
      glassGrad.addColorStop(0.5, 'rgba(242,238,255,0.52)')
      glassGrad.addColorStop(0.65, 'rgba(255,255,255,0.62)')
      glassGrad.addColorStop(0.82, 'rgba(238,245,255,0.55)')
      glassGrad.addColorStop(1, 'rgba(255,255,255,0.62)')

      ctx.save()
      ctx.shadowColor = `rgba(140,100,255,${0.4 + h * 0.25 + s1 * 0.06})`
      ctx.shadowBlur = 28 + h * 18 + s1 * 4
      ctx.fillStyle = glassGrad
      ctx.fillText(children, cx + dx, cy + dy)
      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 3.5: Chromatic fringe ON TOP of glass
      // Subtle color edges visible on the glass surface
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'screen'

      const caTop = caBase * 0.6
      ctx.fillStyle = `rgba(255, 50, 90, ${0.12 + h * 0.1 + gyroMotion * 0.06})`
      ctx.fillText(children,
        cx + Math.cos(caAng + 0.3) * caTop + ix * 0.15,
        cy + Math.sin(caAng + 0.3) * caTop * 0.4 + iy * 0.08
      )

      ctx.fillStyle = `rgba(50, 100, 255, ${0.12 + h * 0.1 + gyroMotion * 0.06})`
      ctx.fillText(children,
        cx + Math.cos(caAng + Math.PI + 0.3) * caTop - ix * 0.15,
        cy + Math.sin(caAng + Math.PI + 0.3) * caTop * 0.4 - iy * 0.08
      )

      ctx.globalCompositeOperation = 'source-over'

      // ═══════════════════════════════════════════════════
      // LAYER 4: Caustic light patterns
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'overlay'

      const k1x = cx + Math.sin(time * 0.45) * 220 + ix * 2
      const k1y = cy + Math.cos(time * 0.3) * 25 + iy * 0.8
      const k1 = ctx.createRadialGradient(k1x, k1y, 0, k1x, k1y, 140 + s2 * 15)
      k1.addColorStop(0, `rgba(255,255,255,${0.8 + s1 * 0.08})`)
      k1.addColorStop(0.15, `rgba(255,252,245,${0.45 + c1 * 0.06})`)
      k1.addColorStop(0.45, 'rgba(255,255,255,0.12)')
      k1.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = k1
      ctx.fillText(children, cx + dx, cy + dy)

      const k2x = cx + Math.cos(time * 0.38 + 2.2) * 190 - ix * 1.2
      const k2y = cy + Math.sin(time * 0.5 + 0.8) * 20 - iy * 0.5
      const k2 = ctx.createRadialGradient(k2x, k2y, 0, k2x, k2y, 100)
      k2.addColorStop(0, `rgba(220,240,255,${0.55 + c2 * 0.08})`)
      k2.addColorStop(0.3, 'rgba(220,240,255,0.15)')
      k2.addColorStop(1, 'rgba(220,240,255,0)')
      ctx.fillStyle = k2
      ctx.fillText(children, cx + dx, cy + dy)

      const k3x = cx + Math.sin(time * 1.1 + 4) * 110 + ix * 0.5
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
      // ═══════════════════════════════════════════════════
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      const topRim = ctx.createLinearGradient(cx, cy - fontSize * 0.46, cx, cy - fontSize * 0.04)
      topRim.addColorStop(0, `rgba(255,255,255,${0.85 + s1 * 0.08})`)
      topRim.addColorStop(0.25, `rgba(255,255,255,${0.25 + c1 * 0.06})`)
      topRim.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = topRim
      ctx.fillText(children, cx + dx * 0.4, cy + dy * 0.25 - 1)

      const btmRim = ctx.createLinearGradient(cx, cy + fontSize * 0.46, cx, cy + fontSize * 0.08)
      btmRim.addColorStop(0, `rgba(190,210,255,${0.25 + c1 * 0.04})`)
      btmRim.addColorStop(0.35, 'rgba(190,210,255,0.04)')
      btmRim.addColorStop(1, 'rgba(190,210,255,0)')
      ctx.fillStyle = btmRim
      ctx.fillText(children, cx + dx * 0.4, cy + dy * 0.25 + 1)

      ctx.restore()

      // ═══════════════════════════════════════════════════
      // LAYER 6: Specular highlights
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'screen'

      const p1x = cx + Math.sin(time * 0.65) * 130 + ix * 1.8
      const p1y = cy - 3 + Math.cos(time * 0.45) * 7 + iy * 0.5
      const g1 = ctx.createRadialGradient(p1x, p1y, 0, p1x, p1y, 48 + h * 8)
      g1.addColorStop(0, `rgba(255,255,255,${0.92 + h * 0.08})`)
      g1.addColorStop(0.12, `rgba(255,255,255,${0.55 + h * 0.1})`)
      g1.addColorStop(0.35, 'rgba(255,255,255,0.12)')
      g1.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g1
      ctx.fillText(children, cx, cy)

      const p2x = cx + Math.cos(time * 0.5 + 1.8) * 170 - ix * 0.8
      const p2y = cy + 2 + Math.sin(time * 0.6) * 5
      const g2 = ctx.createRadialGradient(p2x, p2y, 0, p2x, p2y, 32)
      g2.addColorStop(0, 'rgba(195,225,255,0.75)')
      g2.addColorStop(0.25, 'rgba(195,225,255,0.2)')
      g2.addColorStop(1, 'rgba(195,225,255,0)')
      ctx.fillStyle = g2
      ctx.fillText(children, cx, cy)

      const p3x = cx + Math.sin(time * 1.05 + 3.2) * 90 + ix * 0.3
      const p3y = cy - 5 + Math.cos(time * 1.3) * 3
      const g3 = ctx.createRadialGradient(p3x, p3y, 0, p3x, p3y, 18)
      g3.addColorStop(0, 'rgba(255,255,255,1)')
      g3.addColorStop(0.15, 'rgba(255,255,255,0.55)')
      g3.addColorStop(0.45, 'rgba(255,255,255,0.08)')
      g3.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g3
      ctx.fillText(children, cx, cy)

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
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'overlay'

      const iP = time * 0.18 + (inputX - 0.5) * 2.5
      const iG = ctx.createLinearGradient(
        cx - 320 + Math.sin(iP) * 120, cy - 15,
        cx + 320 + Math.sin(iP) * 120, cy + 15
      )
      const iA = 0.12 + h * 0.2 + Math.abs(s2) * 0.05 + gyroMotion * 0.08
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
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'soft-light'

      const bY = cy + Math.sin(time * 0.55) * fontSize * 0.18 + iy * 0.3
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
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'screen'

      const streakPhase = Math.sin(time * 0.35)
      const streakX = cx + streakPhase * (width * 0.55)
      const halfW = 28 + h * 8
      const streakIntensity = 0.6 + Math.abs(Math.cos(time * 0.35)) * 0.4

      const sG = ctx.createLinearGradient(streakX - halfW, cy, streakX + halfW, cy)
      const sA = (0.22 + h * 0.25) * streakIntensity
      sG.addColorStop(0, 'rgba(255,255,255,0)')
      sG.addColorStop(0.3, `rgba(255,250,240,${sA * 0.3})`)
      sG.addColorStop(0.48, `rgba(255,255,255,${sA})`)
      sG.addColorStop(0.52, `rgba(255,255,255,${sA})`)
      sG.addColorStop(0.7, `rgba(240,250,255,${sA * 0.3})`)
      sG.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = sG
      ctx.fillText(children, cx, cy)

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

      // ═══════════════════════════════════════════════════
      // EDGE FADE MASK
      // ═══════════════════════════════════════════════════
      ctx.globalCompositeOperation = 'destination-in'

      const hFade = ctx.createLinearGradient(0, 0, width, 0)
      hFade.addColorStop(0, 'rgba(0,0,0,0)')
      hFade.addColorStop(0.07, 'rgba(0,0,0,1)')
      hFade.addColorStop(0.93, 'rgba(0,0,0,1)')
      hFade.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = hFade
      ctx.fillRect(0, 0, width, height)

      const vFade = ctx.createLinearGradient(0, 0, 0, height)
      vFade.addColorStop(0, 'rgba(0,0,0,0)')
      vFade.addColorStop(0.08, 'rgba(0,0,0,1)')
      vFade.addColorStop(0.88, 'rgba(0,0,0,1)')
      vFade.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = vFade
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'source-over'

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    // ── Event handlers ───────────────────────────────────

    // WINDOW-level mouse tracking — always active on desktop
    // Effect responds to mouse anywhere on the page
    const handleWindowMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
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
    }
    const handleTouchStart = () => {
      isHoveringRef.current = true
      // Request iOS gyroscope permission on first touch
      if (!gyroRequestedRef.current && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        gyroRequestedRef.current = true
        ;(DeviceOrientationEvent as any).requestPermission()
          .then((p: string) => {
            if (p === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation)
            }
          })
          .catch(() => {})
      }
    }
    const handleTouchEnd = () => {
      isHoveringRef.current = false
    }

    window.addEventListener('mousemove', handleWindowMouseMove)
    canvas.addEventListener('mouseenter', handleEnter)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('mousemove', handleWindowMouseMove)
      canvas.removeEventListener('mouseenter', handleEnter)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('scroll', handleScroll)
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
