/**
 * The Distortion Labs mark: twelve identical blades arranged like a camera aperture.
 *
 * It's a rationalised version of the original glass render. Each blade is a four-point shard whose
 * trailing edge runs parallel to the previous blade's leading edge, so every gap has the same width.
 * Coordinates are unit-radius, rotated into place around the origin.
 */
const BLADE: [number, number][] = [
  [0.7834, -0.1621], // trailing outer corner
  [0.9699, 0.0169], // outer apex (pivot for the aperture animation)
  [0.851, 0.1809], // leading outer corner
  [0.2634, 0.3051], // inner tip
]
const BLADES = 12
const BASE_ROTATION = -80
export const MARK_RADIUS = 98

function rotate([x, y]: [number, number], degrees: number): [number, number] {
  const t = (degrees * Math.PI) / 180
  return [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)]
}

const round = (n: number) => Math.round(n * 100) / 100

export interface Blade {
  d: string
  /** Pivot (outer apex) in the -100..100 viewBox. */
  pivot: [number, number]
}

export const markBlades: Blade[] = Array.from({ length: BLADES }, (_, i) => {
  const angle = BASE_ROTATION + (i * 360) / BLADES
  const points = BLADE.map((p) => rotate(p, angle).map((v) => round(v * MARK_RADIUS)) as [number, number])
  return {
    d: `M${points.map((p) => p.join(' ')).join('L')}Z`,
    pivot: points[1],
  }
})

/** All blades as a single path, for static renders (icons, OG image). */
export const markPath = markBlades.map((b) => b.d).join('')
