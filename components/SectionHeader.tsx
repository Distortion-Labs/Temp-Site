interface SectionHeaderProps {
  index: string
  label: string
  title: React.ReactNode
  id?: string
  className?: string
}

/** Section opener: monospace index on the left, display heading on the right. */
export default function SectionHeader({ index, label, title, id, className = '' }: SectionHeaderProps) {
  return (
    <div className={`grid gap-y-5 sm:grid-cols-12 sm:gap-x-6 ${className}`}>
      <p className="label text-muted sm:col-span-3 sm:pt-3">
        ({index}) {label}
      </p>
      <h2 id={id} className="text-display font-medium text-balance sm:col-span-9" style={{ fontVariationSettings: "'wdth' 112" }}>
        {title}
      </h2>
    </div>
  )
}
