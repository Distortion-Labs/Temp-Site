/** Spec-sheet style definition list. */
export default function Facts({ items, className = '' }: { items: { label: string; value: string }[]; className?: string }) {
  return (
    <dl className={`border-t border-line ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3 text-small">
          <dt className="label pt-[3px] text-muted">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
