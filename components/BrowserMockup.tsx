/** Stylised browser window showing multi-term highlights, used to illustrate Multi-Finder Pro. */
export default function BrowserMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden border border-white/[0.08] ${className}`} aria-hidden="true">
      <div className="bg-white/[0.03] px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 mx-4 h-6 rounded bg-white/[0.04] flex items-center px-3">
          <span className="text-[10px] text-white/20 font-mono">example.com</span>
        </div>
      </div>
      <div className="p-6 sm:p-8 bg-white/[0.02] space-y-3">
        <div className="h-3 bg-white/[0.04] rounded w-full" />
        <div className="h-3 bg-white/[0.04] rounded w-4/5" />
        <div className="flex gap-1 items-center">
          <div className="h-3 bg-white/[0.04] rounded w-16" />
          <span className="px-1.5 py-0.5 text-[9px] rounded bg-cyan-500/20 text-cyan-400 font-mono animate-pulse">match 1</span>
          <div className="h-3 bg-white/[0.04] rounded w-24" />
          <span className="px-1.5 py-0.5 text-[9px] rounded bg-primary-500/20 text-primary-400 font-mono animate-pulse [animation-delay:0.5s]">match 2</span>
          <div className="h-3 bg-white/[0.04] rounded w-12" />
        </div>
        <div className="h-3 bg-white/[0.04] rounded w-11/12" />
        <div className="flex gap-1 items-center">
          <div className="h-3 bg-white/[0.04] rounded w-20" />
          <span className="px-1.5 py-0.5 text-[9px] rounded bg-rose-500/20 text-rose-400 font-mono animate-pulse [animation-delay:1s]">match 3</span>
          <div className="h-3 bg-white/[0.04] rounded w-32" />
        </div>
        <div className="h-3 bg-white/[0.04] rounded w-3/4" />
      </div>
    </div>
  )
}
