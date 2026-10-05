import type { Metadata } from 'next'
import Link from 'next/link'
import Mark from '@/components/Mark'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Email verified',
  robots: { index: false, follow: false },
}

// Landing page for email verification links. Standalone: no site header or footer.
export default function EmailVerified() {
  return (
    <main className="container-site grid min-h-[100dvh] place-items-center py-16">
      <div className="w-full max-w-md animate-rise text-center">
        <Mark className="mark-open mx-auto h-16 w-16" />
        <p className="label mt-10 text-muted">(Confirmed)</p>
        <h1 className="mt-4 text-title font-medium" style={{ fontVariationSettings: "'wdth' 112" }}>
          Email verified.
        </h1>
        <p className="mx-auto mt-4 max-w-[34ch] text-small text-muted">
          Your email address is confirmed and your account is ready. You can close this tab and head back to the app.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="btn btn-solid">
            Go to homepage
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="btn">
            Get help
          </a>
        </div>
        <p className="label mt-16 text-muted">{siteConfig.name}</p>
      </div>
    </main>
  )
}
