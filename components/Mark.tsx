import { markBlades } from '@/lib/mark'

interface MarkProps {
  className?: string
  title?: string
}

/**
 * The aperture mark. Blades pivot on their outer apex via the `--aperture` CSS variable, so a parent
 * can open or close the iris (e.g. `.group:hover .mark { --aperture: 14deg }`).
 */
export default function Mark({ className = '', title }: MarkProps) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={`mark ${className}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      {markBlades.map((blade, i) => (
        <path
          key={i}
          d={blade.d}
          className="mark-blade"
          style={{ transformOrigin: `${blade.pivot[0]}px ${blade.pivot[1]}px` }}
        />
      ))}
    </svg>
  )
}
