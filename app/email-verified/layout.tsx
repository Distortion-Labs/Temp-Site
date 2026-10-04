import type { Metadata } from 'next'

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: 'Email Verified',
  robots: { index: false, follow: false },
}

export default function EmailVerifiedLayout({ children }: { children: React.ReactNode }) {
  return children
}
