'use client'

import dynamic from 'next/dynamic'

const Silk = dynamic(() => import('./Silk'), { ssr: false })

export default function SilkSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Silk background — fixed behind all content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden -z-0" style={{ marginBottom: '-100vh' }}>
        <Silk
          speed={10.5}
          scale={0.7}
          color="#4f2b6e"
          noiseIntensity={2.6}
          rotation={3.3}
        />
        {/* Top fade from hero */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--void)] to-transparent pointer-events-none" />
      </div>

      {/* Content scrolls over the Silk background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
