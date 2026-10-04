interface SectionHeadingProps {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  accent?: 'cyan' | 'primary'
  /** Heading level; page heroes use h1, sections use h2. */
  as?: 'h1' | 'h2'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  accent = 'cyan',
  as: Heading = 'h2',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <span
        className={`inline-block px-3 py-1.5 mb-4 text-xs sm:text-sm font-medium rounded-full glass-subtle ${
          accent === 'cyan' ? 'text-cyan-400' : 'text-primary-400'
        }`}
      >
        {eyebrow}
      </span>
      <Heading
        className={`font-display font-bold text-white mb-4 text-balance ${
          Heading === 'h1' ? 'text-display-lg' : 'text-display-md'
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">{description}</p>
      )}
    </div>
  )
}
