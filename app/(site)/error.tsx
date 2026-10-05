'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="container-site flex min-h-[75dvh] flex-col justify-center pb-24 pt-[calc(var(--header-h)+4rem)]">
      <p className="label text-muted">(Error)</p>
      <h1 className="mt-6 max-w-[16ch] text-display font-medium text-balance" style={{ fontVariationSettings: "'wdth' 112" }}>
        Something went wrong.
      </h1>
      <p className="mt-6 max-w-[38ch] text-lead text-muted">An unexpected error stopped this page from loading. Trying again usually fixes it.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-solid">
          Try again
        </button>
        <Link href="/" className="btn">
          Back to home
        </Link>
      </div>
    </section>
  )
}
