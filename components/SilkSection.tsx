'use client'

import dynamic from 'next/dynamic'

const Silk = dynamic(() => import('./Silk'), { ssr: false })

export default function SilkSection() {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] -mt-1 -mb-1 overflow-hidden">
      <div className="absolute inset-0">
        <Silk
          speed={10.5}
          scale={0.7}
          color="#4f2b6e"
          noiseIntensity={2.6}
          rotation={3.3}
        />
      </div>
      {/* Top fade into hero */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--void)] to-transparent pointer-events-none" />
      {/* Bottom fade into products */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--void)] to-transparent pointer-events-none" />
    </div>
  )
}
