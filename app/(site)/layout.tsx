import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary-600 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
    </>
  )
}
