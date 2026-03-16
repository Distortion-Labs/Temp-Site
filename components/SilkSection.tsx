export default function SilkSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Static gradient background with grain */}
      <div className="sticky top-0 h-screen w-full overflow-hidden -z-0" style={{ marginBottom: '-100vh' }}>
        {/* Purple gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#16082a] to-[#0d0618]" />
        {/* Secondary radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(79,43,110,0.4)_0%,transparent_70%)]" />
        {/* Subtle warm accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_60%,rgba(120,50,160,0.15)_0%,transparent_60%)]" />
        {/* Static grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Top fade from hero */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--void)] to-transparent pointer-events-none" />
        {/* Bottom fade to next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--void)] to-transparent pointer-events-none" />
      </div>

      {/* Content scrolls over the background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
