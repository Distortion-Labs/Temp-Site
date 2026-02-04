'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface DistortedTextProps {
  children: string
  className?: string
}

export default function DistortedText({ children, className = '' }: DistortedTextProps) {
  const [isClient, setIsClient] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 100 })
  const [fontSize, setFontSize] = useState(48)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get the computed font size from parent
  useEffect(() => {
    if (containerRef.current && isClient) {
      const computed = window.getComputedStyle(containerRef.current)
      const size = parseFloat(computed.fontSize)
      setFontSize(size)
    }
  }, [isClient])

  // Measure the text size after render
  useEffect(() => {
    if (textRef.current && isClient) {
      const bbox = textRef.current.getBBox()
      setDimensions({
        width: Math.ceil(bbox.width + 80),
        height: Math.ceil(bbox.height + 50)
      })
    }
  }, [isClient, children, fontSize])

  // Handle mouse movement for interactive displacement
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }, [])

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    setMousePos({ x: 0.5, y: 0.5 })
  }

  // Calculate displacement based on mouse position
  const baseScale = isHovering ? 28 : 20
  const mouseInfluence = isHovering ? 20 : 0
  const displacementScale = baseScale + (mousePos.x - 0.5) * mouseInfluence

  // Chromatic aberration offsets based on mouse
  const redOffset = isHovering ? (mousePos.x - 0.5) * -12 : -3
  const cyanOffset = isHovering ? (mousePos.x - 0.5) * 12 : 3
  const greenOffsetY = isHovering ? (mousePos.y - 0.5) * 6 : 1

  // Dynamic turbulence frequency based on mouse Y
  const baseFreqX = 0.012 + (isHovering ? (mousePos.y - 0.5) * 0.01 : 0)
  const baseFreqY = 0.015 + (isHovering ? (mousePos.x - 0.5) * 0.01 : 0)

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ lineHeight: 1, fontSize: 'inherit' }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="overflow-visible distorted-svg cursor-crosshair"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          maxWidth: `${dimensions.width}px`,
        }}
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          {/* Main distortion filter */}
          <filter id="distort-main" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${baseFreqX} ${baseFreqY}`}
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Chromatic aberration filters - separate for each color channel */}
          <filter id="distort-red" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${baseFreqX * 1.1} ${baseFreqY}`}
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementScale * 1.2}
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>

          <filter id="distort-cyan" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${baseFreqX} ${baseFreqY * 1.1}`}
              numOctaves="2"
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementScale * 1.1}
              xChannelSelector="G"
              yChannelSelector="R"
            />
          </filter>

          {/* Glow filter */}
          <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Red channel - chromatic aberration */}
        <text
          x={40 + redOffset}
          y={dimensions.height * 0.7}
          fill="#ff0040"
          filter="url(#distort-red)"
          opacity={isHovering ? 0.8 : 0.6}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 700,
            mixBlendMode: 'screen',
          }}
        >
          {children}
        </text>

        {/* Cyan channel - chromatic aberration */}
        <text
          x={40 + cyanOffset}
          y={dimensions.height * 0.7}
          fill="#00ffff"
          filter="url(#distort-cyan)"
          opacity={isHovering ? 0.8 : 0.6}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 700,
            mixBlendMode: 'screen',
          }}
        >
          {children}
        </text>

        {/* Green channel - subtle */}
        <text
          x={40}
          y={dimensions.height * 0.7 + greenOffsetY}
          fill="#00ff80"
          filter="url(#distort-main)"
          opacity={isHovering ? 0.5 : 0.3}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 700,
            mixBlendMode: 'screen',
          }}
        >
          {children}
        </text>

        {/* Main white text with distortion */}
        <text
          ref={textRef}
          x={40}
          y={dimensions.height * 0.7}
          fill="white"
          filter="url(#distort-main)"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 700,
          }}
        >
          {children}
        </text>
      </svg>
    </span>
  )
}
