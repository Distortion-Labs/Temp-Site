'use client'

import { useEffect, useRef, useState } from 'react'

interface DistortedTextProps {
  children: string
  className?: string
}

export default function DistortedText({ children, className = '' }: DistortedTextProps) {
  const [isClient, setIsClient] = useState(false)
  const textRef = useRef<SVGTextElement>(null)
  const containerRef = useRef<HTMLSpanElement>(null)
  const [dimensions, setDimensions] = useState({ width: 500, height: 120 })

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Measure the text size after render
  useEffect(() => {
    if (textRef.current && isClient) {
      const bbox = textRef.current.getBBox()
      setDimensions({
        width: Math.ceil(bbox.width + 50),
        height: Math.ceil(bbox.height + 30)
      })
    }
  }, [isClient, children])

  // Generate unique IDs for filters
  const filterId = 'distort-filter'

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ lineHeight: 1 }}
    >
      <svg
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="overflow-visible distorted-svg"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          maxWidth: `${dimensions.width}px`,
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Turbulence filter for organic distortion */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            {/* Create organic noise pattern */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.02"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              {/* Animate the turbulence for living effect */}
              {isClient && (
                <animate
                  attributeName="baseFrequency"
                  values="0.015 0.02;0.02 0.015;0.015 0.02"
                  dur="8s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>

            {/* Displacement map - warps the text based on noise */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              {isClient && (
                <animate
                  attributeName="scale"
                  values="8;15;10;12;8"
                  dur="6s"
                  repeatCount="indefinite"
                />
              )}
            </feDisplacementMap>
          </filter>

          {/* Glow effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for text */}
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>

        {/* Shadow/echo layer */}
        <text
          x="25"
          y={dimensions.height * 0.72}
          fill="rgba(168, 85, 247, 0.3)"
          filter={`url(#${filterId})`}
          style={{
            fontSize: '72px',
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 700,
          }}
        >
          {children}
        </text>

        {/* Main text with distortion */}
        <text
          ref={textRef}
          x="25"
          y={dimensions.height * 0.72}
          fill="url(#textGradient)"
          filter={`url(#${filterId})`}
          style={{
            fontSize: '72px',
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
