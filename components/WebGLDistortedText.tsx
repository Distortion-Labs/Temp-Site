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

    // Set canvas size with device pixel ratio
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

      // Clear
      ctx.clearRect(0, 0, width, height)

      // Calculate distortion parameters
      const baseOffset = 3 + Math.sin(time * 2) * 2
      const hoverMultiplier = isHovering ? 1.5 : 1

      // Mouse influence
      const mouseDist = Math.sqrt(
        Math.pow((mouse.x - 0.5) * 2, 2) +
        Math.pow((mouse.y - 0.5) * 2, 2)
      )
      const mouseEffect = isHovering ? (1 - Math.min(mouseDist, 1)) * 10 : 0

      // Wave offsets
      const waveX = Math.sin(time * 3) * 2 * hoverMultiplier
      const waveY = Math.cos(time * 2.5) * 1.5 * hoverMultiplier

      // Chromatic aberration offsets
      const redOffsetX = -baseOffset - mouseEffect * (mouse.x - 0.5)
      const redOffsetY = -baseOffset * 0.5 + waveY
      const blueOffsetX = baseOffset + mouseEffect * (mouse.x - 0.5)
      const blueOffsetY = baseOffset * 0.5 - waveY
      const greenOffsetX = waveX + mouseEffect * (mouse.y - 0.5) * 0.5
      const greenOffsetY = Math.sin(time * 4) * 1

      // Text settings
      ctx.font = `bold ${fontSize}px "Outfit", system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const centerX = width / 2
      const centerY = height / 2

      // Draw layers with blend modes
      ctx.globalCompositeOperation = 'screen'

      // Red/magenta channel
      ctx.fillStyle = `rgba(255, 0, 100, ${0.6 + (isHovering ? 0.2 : 0)})`
      ctx.fillText(children, centerX + redOffsetX, centerY + redOffsetY)

      // Cyan channel
      ctx.fillStyle = `rgba(0, 255, 255, ${0.6 + (isHovering ? 0.2 : 0)})`
      ctx.fillText(children, centerX + blueOffsetX, centerY + blueOffsetY)

      // Green channel (subtle)
      ctx.fillStyle = `rgba(0, 255, 128, ${0.3 + (isHovering ? 0.15 : 0)})`
      ctx.fillText(children, centerX + greenOffsetX, centerY + greenOffsetY)

      // Main white text with slight movement
      ctx.globalCompositeOperation = 'source-over'
      const mainOffsetX = Math.sin(time * 1.5) * 1
      const mainOffsetY = Math.cos(time * 1.8) * 0.5

      // Glow effect
      ctx.shadowColor = 'rgba(168, 85, 247, 0.8)'
      ctx.shadowBlur = 20 + (isHovering ? 15 : 0)
      ctx.fillStyle = 'white'
      ctx.fillText(children, centerX + mainOffsetX, centerY + mainOffsetY)

      // Reset shadow
      ctx.shadowBlur = 0

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
