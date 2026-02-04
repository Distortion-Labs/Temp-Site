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
  const isHoveringRef = useRef(false)

  useEffect(() => {
    if (containerRef.current) {
      const computed = window.getComputedStyle(containerRef.current)
      const size = parseFloat(computed.fontSize)
      setFontSize(Math.round(size * 1.4))
    }
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

    let startTime = performance.now()

    const render = () => {
      const time = (performance.now() - startTime) / 1000
      const mouse = mouseRef.current
      const isHovering = isHoveringRef.current

      ctx.clearRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2

      // Hover multiplier
      const hoverMult = isHovering ? 1.5 : 1

      // Mouse influence
      const mouseOffsetX = (mouse.x - 0.5) * 20 * (isHovering ? 1 : 0)
      const mouseOffsetY = (mouse.y - 0.5) * 10 * (isHovering ? 1 : 0)

      // Liquid wave distortion
      const wave1 = Math.sin(time * 2) * 3 * hoverMult
      const wave2 = Math.cos(time * 1.7) * 2 * hoverMult
      const wave3 = Math.sin(time * 3.2) * 1.5 * hoverMult

      // Text settings
      ctx.font = `bold ${fontSize}px "Outfit", system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // === LAYER 1: Deep shadow/depth ===
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowBlur = 30
      ctx.shadowOffsetX = 5
      ctx.shadowOffsetY = 5
      ctx.fillStyle = 'rgba(20, 10, 40, 0.3)'
      ctx.fillText(children, centerX + 3, centerY + 3)
      ctx.restore()

      // === LAYER 2: Chromatic aberration (background) ===
      ctx.globalCompositeOperation = 'screen'

      // Red channel - liquid offset
      const redX = -4 + wave1 - mouseOffsetX * 0.5
      const redY = -2 + wave2
      ctx.fillStyle = `rgba(255, 50, 100, ${0.5 + (isHovering ? 0.2 : 0)})`
      ctx.fillText(children, centerX + redX, centerY + redY)

      // Cyan channel
      const cyanX = 4 - wave1 + mouseOffsetX * 0.5
      const cyanY = 2 - wave2
      ctx.fillStyle = `rgba(0, 220, 255, ${0.5 + (isHovering ? 0.2 : 0)})`
      ctx.fillText(children, centerX + cyanX, centerY + cyanY)

      // Green/yellow channel (subtle)
      ctx.fillStyle = `rgba(100, 255, 150, ${0.25 + (isHovering ? 0.1 : 0)})`
      ctx.fillText(children, centerX + wave3, centerY + Math.sin(time * 2.5) * 1)

      ctx.globalCompositeOperation = 'source-over'

      // === LAYER 3: Glass base with gradient ===
      const gradient = ctx.createLinearGradient(
        centerX - 200, centerY - 50,
        centerX + 200, centerY + 50
      )
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
      gradient.addColorStop(0.3, 'rgba(220, 230, 255, 0.9)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)')
      gradient.addColorStop(0.7, 'rgba(230, 220, 255, 0.9)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)')

      // Outer glow
      ctx.save()
      ctx.shadowColor = 'rgba(150, 100, 255, 0.6)'
      ctx.shadowBlur = 25 + Math.sin(time * 2) * 5 + (isHovering ? 15 : 0)
      ctx.fillStyle = gradient
      ctx.fillText(children, centerX + wave1 * 0.3 + mouseOffsetX * 0.1, centerY + wave2 * 0.2 + mouseOffsetY * 0.1)
      ctx.restore()

      // === LAYER 4: Light reflections (moving highlights) ===
      ctx.globalCompositeOperation = 'overlay'

      // Primary light reflection - moves across text
      const lightX = Math.sin(time * 0.8) * 150 + mouseOffsetX * 2
      const lightY = Math.cos(time * 0.6) * 20 + mouseOffsetY

      const lightGradient = ctx.createRadialGradient(
        centerX + lightX, centerY + lightY - 10, 0,
        centerX + lightX, centerY + lightY - 10, 120
      )
      lightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      lightGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)')
      lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = lightGradient
      ctx.fillText(children, centerX + wave1 * 0.3, centerY + wave2 * 0.2)

      // Secondary light (opposite movement)
      const light2X = Math.cos(time * 0.7) * 100 - mouseOffsetX
      const light2Y = Math.sin(time * 0.9) * 15

      const lightGradient2 = ctx.createRadialGradient(
        centerX + light2X, centerY + light2Y + 5, 0,
        centerX + light2X, centerY + light2Y + 5, 80
      )
      lightGradient2.addColorStop(0, 'rgba(200, 220, 255, 0.7)')
      lightGradient2.addColorStop(0.5, 'rgba(200, 220, 255, 0.2)')
      lightGradient2.addColorStop(1, 'rgba(200, 220, 255, 0)')

      ctx.fillStyle = lightGradient2
      ctx.fillText(children, centerX + wave1 * 0.3, centerY + wave2 * 0.2)

      ctx.globalCompositeOperation = 'source-over'

      // === LAYER 5: Top highlight edge (glass rim light) ===
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      // Top edge highlight
      const edgeGradient = ctx.createLinearGradient(
        centerX, centerY - fontSize * 0.4,
        centerX, centerY - fontSize * 0.1
      )
      edgeGradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 + Math.sin(time * 3) * 0.2})`)
      edgeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = edgeGradient
      ctx.fillText(children, centerX + wave1 * 0.2, centerY + wave2 * 0.15 - 1)
      ctx.restore()

      // === LAYER 6: Specular highlights (bright spots) ===
      ctx.globalCompositeOperation = 'screen'

      // Animated specular spots
      const specTime = time * 1.5
      const spec1X = Math.sin(specTime) * 80 + mouseOffsetX
      const spec2X = Math.cos(specTime * 0.8) * 120 - mouseOffsetX * 0.5
      const spec3X = Math.sin(specTime * 1.2 + 2) * 60

      // Bright specular highlight 1
      const specGrad1 = ctx.createRadialGradient(
        centerX + spec1X, centerY - 5, 0,
        centerX + spec1X, centerY - 5, 40
      )
      specGrad1.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      specGrad1.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)')
      specGrad1.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = specGrad1
      ctx.fillText(children, centerX, centerY)

      // Specular 2
      const specGrad2 = ctx.createRadialGradient(
        centerX + spec2X, centerY + 3, 0,
        centerX + spec2X, centerY + 3, 30
      )
      specGrad2.addColorStop(0, 'rgba(220, 240, 255, 0.7)')
      specGrad2.addColorStop(1, 'rgba(220, 240, 255, 0)')
      ctx.fillStyle = specGrad2
      ctx.fillText(children, centerX, centerY)

      // Small bright spot
      const specGrad3 = ctx.createRadialGradient(
        centerX + spec3X, centerY - 8, 0,
        centerX + spec3X, centerY - 8, 20
      )
      specGrad3.addColorStop(0, 'rgba(255, 255, 255, 1)')
      specGrad3.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)')
      specGrad3.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = specGrad3
      ctx.fillText(children, centerX, centerY)

      ctx.globalCompositeOperation = 'source-over'

      // === LAYER 7: Rainbow refraction edge ===
      if (isHovering) {
        ctx.globalCompositeOperation = 'overlay'
        const rainbowGrad = ctx.createLinearGradient(
          centerX - 200 + Math.sin(time) * 50,
          centerY,
          centerX + 200 + Math.sin(time) * 50,
          centerY
        )
        rainbowGrad.addColorStop(0, 'rgba(255, 0, 100, 0.3)')
        rainbowGrad.addColorStop(0.25, 'rgba(255, 200, 0, 0.3)')
        rainbowGrad.addColorStop(0.5, 'rgba(0, 255, 100, 0.3)')
        rainbowGrad.addColorStop(0.75, 'rgba(0, 200, 255, 0.3)')
        rainbowGrad.addColorStop(1, 'rgba(200, 0, 255, 0.3)')
        ctx.fillStyle = rainbowGrad
        ctx.fillText(children, centerX, centerY)
        ctx.globalCompositeOperation = 'source-over'
      }

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    // Event handlers
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
      const touch = e.touches[0]
      mouseRef.current = {
        x: (touch.clientX - rect.left) / rect.width,
        y: (touch.clientY - rect.top) / rect.height
      }
      isHoveringRef.current = true
    }

    const handleMouseEnter = () => { isHoveringRef.current = true }
    const handleMouseLeave = () => {
      isHoveringRef.current = false
      mouseRef.current = { x: 0.5, y: 0.5 }
    }
    const handleTouchEnd = () => {
      isHoveringRef.current = false
      mouseRef.current = { x: 0.5, y: 0.5 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchstart', handleMouseEnter)
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      cancelAnimationFrame(animationRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleMouseEnter)
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
          height: `${Math.max(fontSize * 1.6, 80)}px`,
          display: 'block'
        }}
      />
    </div>
  )
}
