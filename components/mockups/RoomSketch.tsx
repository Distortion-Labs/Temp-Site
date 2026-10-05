/**
 * One-point perspective line drawing of a white-cube gallery: floor grid, skylights, paintings on
 * the side walls, light pools and a bench — after the RoomSketch on sunurai.com.
 */
const W = 400
const H = 240
const VX = 200 // vanishing point
const VY = 112
const BACK = 3 // depth of the back wall

// Project a point in room space (x: -200..200, y: -112 (ceiling)..128 (floor), depth d >= 1) to the screen.
const p = (x: number, y: number, d: number) => [+(VX + x / d).toFixed(1), +(VY + y / d).toFixed(1)] as const
const line = (a: readonly [number, number], b: readonly [number, number]) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`
const quad = (pts: (readonly [number, number])[]) => `M${pts.map((q) => q.join(' ')).join('L')}Z`

const CEIL = -112
const FLOOR = 128

function build() {
  const structure: string[] = []
  const grid: string[] = []
  const works: string[] = []
  const fills: string[] = []

  // Room edges
  for (const x of [-200, 200]) {
    structure.push(line(p(x, CEIL, 1), p(x, CEIL, BACK)), line(p(x, FLOOR, 1), p(x, FLOOR, BACK)))
  }
  structure.push(quad([p(-200, CEIL, BACK), p(200, CEIL, BACK), p(200, FLOOR, BACK), p(-200, FLOOR, BACK)]))

  // Floor boards running towards the back wall, and depth lines
  for (let x = -200; x <= 200; x += 40) grid.push(line(p(x, FLOOR, 1), p(x, FLOOR, BACK)))
  for (const d of [1.2, 1.45, 1.75, 2.15, 2.6]) grid.push(line(p(-200, FLOOR, d), p(200, FLOOR, d)))

  // Skylights
  for (const [d1, d2] of [
    [1.25, 1.55],
    [1.9, 2.3],
  ]) {
    structure.push(quad([p(-70, CEIL, d1), p(70, CEIL, d1), p(70, CEIL, d2), p(-70, CEIL, d2)]))
  }

  // Paintings on the side walls, and one on the back wall, each with a pool of light below
  for (const x of [-200, 200]) {
    for (const [d1, d2, top, bottom] of [
      [1.2, 1.55, -48, 18],
      [1.85, 2.2, -36, 6],
    ]) {
      works.push(quad([p(x, top, d1), p(x, top, d2), p(x, bottom, d2), p(x, bottom, d1)]))
      const [cx, cy] = p(x * 0.78, FLOOR, (d1 + d2) / 2)
      fills.push(`M${cx - 22} ${cy}a22 4 0 1 0 44 0a22 4 0 1 0 -44 0`)
    }
  }
  works.push(quad([p(-50, -40, BACK), p(50, -40, BACK), p(50, 20, BACK), p(-50, 20, BACK)]))

  // Bench
  const bench = [p(-36, 96, 1.55), p(36, 96, 1.55), p(36, 96, 1.7), p(-36, 96, 1.7)]
  structure.push(quad(bench), line(p(-36, 96, 1.55), p(-36, FLOOR, 1.55)), line(p(36, 96, 1.55), p(36, FLOOR, 1.55)))

  return { structure: structure.join(''), grid: grid.join(''), works: works.join(''), fills: fills.join('') }
}

const sketch = build()

export default function RoomSketch({ className = '', stroke = '#f4f1ec' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} fill="none" aria-hidden="true">
      <path d={sketch.fills} fill={stroke} fillOpacity={0.08} />
      <path d={sketch.grid} stroke={stroke} strokeOpacity={0.14} strokeWidth={0.75} />
      <path d={sketch.structure} stroke={stroke} strokeOpacity={0.4} strokeWidth={0.9} />
      <path d={sketch.works} stroke={stroke} strokeOpacity={0.62} strokeWidth={1} fill={stroke} fillOpacity={0.05} />
    </svg>
  )
}
