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
  const [dimensions, setDimensions] = useState({ width: 700, height: 120 })
  const [fontSize, setFontSize] = useState(72)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get the computed font size from parent and scale it up
  useEffect(() => {
    if (containerRef.current && isClient) {
      const computed = window.getComputedStyle(containerRef.current)
      const size = parseFloat(computed.fontSize)
      // Scale up the font size by 1.15x for bigger text
      setFontSize(Math.round(size * 1.15))
    }
  }, [isClient])

  // Measure the text size after render
  useEffect(() => {
    if (textRef.current && isClient) {
      const bbox = textRef.current.getBBox()
      setDimensions({
        width: Math.ceil(bbox.width + 100),
        height: Math.ceil(bbox.height + 60)
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

  // Calculate displacement based on mouse position (adds to base animation)
  const mouseInfluenceX = isHovering ? (mousePos.x - 0.5) * 15 : 0
  const mouseInfluenceY = isHovering ? (mousePos.y - 0.5) * 10 : 0

  // Chromatic aberration offsets - always visible, stronger on hover
  const redOffset = -4 + (isHovering ? (mousePos.x - 0.5) * -10 : 0)
  const cyanOffset = 4 + (isHovering ? (mousePos.x - 0.5) * 10 : 0)
  const greenOffsetY = 2 + (isHovering ? (mousePos.y - 0.5) * 6 : 0)

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
          {/* Main distortion filter with continuous animation */}
          <filter id="distort-main" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.02"
              numOctaves="3"
              seed="5"
              result="noise"
            >
              {isClient && (
                <animate
                  attributeName="baseFrequency"
                  values="0.015 0.02;0.02 0.015;0.012 0.022;0.015 0.02"
                  dur="8s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={22 + mouseInfluenceX}
              xChannelSelector="R"
              yChannelSelector="G"
            >
              {isClient && (
                <animate
                  attributeName="scale"
                  values="18;28;20;25;18"
                  dur="6s"
                  repeatCount="indefinite"
                />
              )}
            </feDisplacementMap>
          </filter>

          {/* Red channel filter with animation */}
          <filter id="distort-red" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.02"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              {isClient && (
                <animate
                  attributeName="baseFrequency"
                  values="0.018 0.02;0.022 0.016;0.018 0.02"
                  dur="7s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={26 + mouseInfluenceX}
              xChannelSelector="R"
              yChannelSelector="B"
            >
              {isClient && (
                <animate
                  attributeName="scale"
                  values="22;32;24;28;22"
                  dur="5s"
                  repeatCount="indefinite"
                />
              )}
            </feDisplacementMap>
          </filter>

          {/* Cyan channel filter with animation */}
          <filter id="distort-cyan" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.016 0.022"
              numOctaves="2"
              seed="11"
              result="noise"
            >
              {isClient && (
                <animate
                  attributeName="baseFrequency"
                  values="0.016 0.022;0.02 0.018;0.016 0.022"
                  dur="9s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={24 + mouseInfluenceY}
              xChannelSelector="G"
              yChannelSelector="R"
            >
              {isClient && (
                <animate
                  attributeName="scale"
                  values="20;30;22;26;20"
                  dur="6.5s"
                  repeatCount="indefinite"
                />
              )}
            </feDisplacementMap>
          </filter>
        </defs>

        {/* Red channel - chromatic aberration */}
        <text
          x={50 + redOffset}
          y={dimensions.height * 0.7}
          fill="#ff0040"
          filter="url(#distort-red)"
          opacity={isHovering ? 0.85 : 0.7}
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
          x={50 + cyanOffset}
          y={dimensions.height * 0.7}
          fill="#00ffff"
          filter="url(#distort-cyan)"
          opacity={isHovering ? 0.85 : 0.7}
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
          x={50}
          y={dimensions.height * 0.7 + greenOffsetY}
          fill="#00ff80"
          filter="url(#distort-main)"
          opacity={isHovering ? 0.5 : 0.35}
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
          x={50}
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
