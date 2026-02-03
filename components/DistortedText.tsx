'use client'

import { useEffect, useRef, useState } from 'react'

interface DistortedTextProps {
  children: string
  className?: string
}

export default function DistortedText({ children, className = '' }: DistortedTextProps) {
  const [isClient, setIsClient] = useState(false)
  const textRef = useRef<SVGTextElement>(null)
  const [textWidth, setTextWidth] = useState(400)
  const [textHeight, setTextHeight] = useState(80)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (textRef.current && isClient) {
      const bbox = textRef.current.getBBox()
      setTextWidth(bbox.width + 40)
      setTextHeight(bbox.height + 20)
    }
  }, [isClient, children])

  // Generate unique IDs for filters
  const filterId = 'distort-filter'
  const turbulenceId = 'turbulence'

  return (
    <span className={`inline-block align-middle ${className}`}>
      <svg
        viewBox={`0 0 ${textWidth} ${textHeight}`}
        width={textWidth}
        height={textHeight}
        className="overflow-visible distorted-svg"
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          maxWidth: '100%',
          height: 'auto'
        }}
      >
        <defs>
          {/* Turbulence filter for organic distortion */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            {/* Create organic noise pattern */}
            <feTurbulence
              id={turbulenceId}
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
          x="20"
          y={textHeight * 0.75}
          className="distorted-text-shadow"
          fill="rgba(168, 85, 247, 0.3)"
          filter={`url(#${filterId})`}
          style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 700,
          }}
        >
          {children}
        </text>

        {/* Main text with distortion */}
        <text
          ref={textRef}
          x="20"
          y={textHeight * 0.75}
          className="distorted-text-main"
          fill="url(#textGradient)"
          filter={`url(#${filterId})`}
          style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
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
