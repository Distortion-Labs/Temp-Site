interface BrowserFrameProps {
  url: string
  children: React.ReactNode
  className?: string
  /** Visual theme of the window chrome. */
  tone?: 'light' | 'dark'
}

/** Minimal browser window used to stage product mockups. */
export default function BrowserFrame({ url, children, className = '', tone = 'light' }: BrowserFrameProps) {
  const dark = tone === 'dark'
  return (
    <div
      className={`overflow-hidden rounded-[14px] border shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_60px_-28px_rgba(17,17,16,0.35)] ${
        dark ? 'border-[#222] bg-[#0a0a0a]' : 'border-line bg-paper-raised'
      } ${className}`}
    >
      <div
        className={`flex h-10 items-center gap-3 border-b px-4 ${dark ? 'border-[#1d1d1d] bg-[#101010]' : 'border-line bg-paper-sunk/60'}`}
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-2.5 w-2.5 rounded-full ${dark ? 'bg-[#2a2a2a]' : 'bg-line-strong/70'}`} />
          ))}
        </div>
        <div
          className={`label mx-auto flex h-6 w-full max-w-[22rem] items-center justify-center rounded-md px-3 ${
            dark ? 'bg-[#181818] text-[#777]' : 'bg-paper-raised text-muted'
          }`}
        >
          {url}
        </div>
        <div className="w-[42px]" />
      </div>
      {children}
    </div>
  )
}
