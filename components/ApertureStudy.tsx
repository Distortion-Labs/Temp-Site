'use client'

import { useState } from 'react'
import Image from 'next/image'
import { markBlades, MARK_RADIUS } from '@/lib/mark'

const INNER = 0.405 * MARK_RADIUS // radius of the inner tips

/** The mark, its construction, and a slider that opens and closes the aperture. */
export default function ApertureStudy() {
  const [aperture, setAperture] = useState(0)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <figure>
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-md bg-night">
          <Image src="/logo.png" alt="The original glass render of the Distortion Labs mark" width={900} height={900} className="h-[78%] w-[78%] object-contain" />
        </div>
        <figcaption className="label mt-3 flex justify-between text-muted">
          <span>A — Original render</span>
          <span>Glass, raster</span>
        </figcaption>
      </figure>

      <figure>
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-md border border-line bg-paper-raised">
          <svg viewBox="-112 -112 224 224" className="h-[86%] w-[86%]" aria-label={`The vector mark with its construction guides, aperture ${aperture} degrees`} role="img">
            {/* Construction */}
            <g fill="none" stroke="#BDBCB5" strokeWidth={0.35}>
              <circle r={MARK_RADIUS} />
              <circle r={INNER} strokeDasharray="1.5 1.5" />
              {Array.from({ length: 12 }, (_, i) => {
                const t = ((i * 30 - 80) * Math.PI) / 180
                return <line key={i} x1={0} y1={0} x2={+(108 * Math.cos(t)).toFixed(2)} y2={+(108 * Math.sin(t)).toFixed(2)} />
              })}
            </g>
            <g style={{ ['--aperture' as string]: `${aperture}deg` }} fill="#111110">
              {markBlades.map((blade, i) => (
                <path
                  key={i}
                  d={blade.d}
                  className="mark-blade"
                  fillOpacity={i === 0 ? 1 : 0.9}
                  style={{ transformOrigin: `${blade.pivot[0]}px ${blade.pivot[1]}px`, transitionDuration: '0.25s' }}
                />
              ))}
            </g>
            {/* Pivot of the first blade */}
            <circle cx={markBlades[0].pivot[0]} cy={markBlades[0].pivot[1]} r={2.2} fill="none" stroke="#111110" strokeWidth={0.6} />
            <text x={markBlades[0].pivot[0] + 5} y={markBlades[0].pivot[1] - 4} fontSize={5.5} fill="#6B6A65" fontFamily="var(--font-mono)">
              pivot
            </text>
            <text x={-108} y={-104} fontSize={5.5} fill="#6B6A65" fontFamily="var(--font-mono)">
              12 × 30°
            </text>
          </svg>
        </div>
        <figcaption className="label mt-3 flex justify-between text-muted">
          <span>B — Construction</span>
          <span>12 blades, vector</span>
        </figcaption>
      </figure>

      <div className="lg:col-span-2">
        <label htmlFor="aperture" className="label flex justify-between text-muted">
          <span>Open</span>
          <span className="text-ink">Aperture {aperture > 0 ? `+${aperture}` : aperture}°</span>
          <span>Stopped down</span>
        </label>
        <input
          id="aperture"
          type="range"
          min={-20}
          max={24}
          step={1}
          value={aperture}
          onChange={(e) => setAperture(Number(e.target.value))}
          className="mt-3 w-full accent-ink"
        />
      </div>
    </div>
  )
}
