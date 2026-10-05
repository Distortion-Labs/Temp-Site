interface PageIntroProps {
  label: string
  title: React.ReactNode
  children?: React.ReactNode
}

/** Opening block for inner pages: monospace label, display headline, optional lede. */
export default function PageIntro({ label, title, children }: PageIntroProps) {
  return (
    <section className="container-site pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+6rem)]">
      <div className="grid gap-y-6 sm:grid-cols-12 sm:gap-x-6">
        <p className="label animate-rise text-muted sm:col-span-3 sm:pt-4">({label})</p>
        <div className="sm:col-span-9">
          <h1 className="animate-rise text-display font-medium text-balance" style={{ fontVariationSettings: "'wdth' 112" }}>
            {title}
          </h1>
          {children && <div className="mt-8 max-w-[44ch] animate-rise text-lead text-pretty [animation-delay:120ms]">{children}</div>}
        </div>
      </div>
    </section>
  )
}
