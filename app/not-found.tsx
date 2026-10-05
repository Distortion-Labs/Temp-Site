import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Mark from '@/components/Mark'

export const metadata: Metadata = {
  title: 'Not found',
}

// Rendered outside the (site) layout, so it brings its own header and footer.
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container-site flex min-h-[80dvh] flex-col justify-center pb-24 pt-[calc(var(--header-h)+4rem)]">
        <div className="grid items-center gap-12 sm:grid-cols-12 sm:gap-6">
          <div className="sm:col-span-7">
            <p className="label animate-rise text-muted">(404)</p>
            <h1
              className="mt-6 animate-rise text-display font-medium text-balance [animation-delay:80ms]"
              style={{ fontVariationSettings: "'wdth' 112" }}
            >
              This page is out of focus.
            </h1>
            <p className="mt-6 max-w-[38ch] animate-rise text-lead text-muted [animation-delay:160ms]">
              It may have moved, or never existed. The rest of the site is sharp.
            </p>
            <div className="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
              <Link href="/" className="btn btn-solid">
                Back to home
              </Link>
              <Link href="/work" className="btn">
                See the work
              </Link>
            </div>
          </div>
          <div className="hidden sm:col-span-4 sm:col-start-9 sm:block">
            <Mark className="mark-open w-full blur-[6px]" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
