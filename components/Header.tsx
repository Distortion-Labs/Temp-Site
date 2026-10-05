'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav, siteConfig } from '@/lib/site'
import Mark from './Mark'

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scrolling and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled && !open ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group relative z-10 flex items-center gap-2.5"
          aria-label={`${siteConfig.name} — home`}
        >
          <Mark className="h-[22px] w-[22px] transition-transform duration-700 ease-out group-hover:rotate-[30deg]" />
          <span className="text-[15px] font-semibold tracking-[-0.015em]" style={{ fontVariationSettings: "'wdth' 112" }}>
            Distortion Labs
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {mainNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`group flex items-start gap-1 text-[15px] transition-colors ${
                isActive(item.href) ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <span className={isActive(item.href) ? 'underline decoration-1 underline-offset-[6px]' : 'link'}>{item.name}</span>
              <sup className="label mt-[-2px] text-[10px] text-muted">0{i + 1}</sup>
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn hidden !min-h-[2.25rem] !px-4 md:inline-flex">
          Start a project
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu"
          className="relative z-10 flex h-11 items-center gap-2 text-[15px] md:hidden"
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <span className="relative block h-2.5 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                open ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                open ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="menu"
        inert={!open}
        className={`fixed inset-0 z-0 flex flex-col bg-paper pt-[var(--header-h)] transition-[opacity,visibility] duration-500 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="container-site flex flex-1 flex-col justify-center gap-2 pb-16">
          {[{ name: 'Home', href: '/' }, ...mainNav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={`flex items-baseline gap-4 border-b border-line py-3 transition-[opacity,transform] duration-700 ease-out ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
            >
              <span className="label w-6 text-muted">0{i}</span>
              <span className="text-[3rem] font-medium leading-none tracking-[-0.04em]" style={{ fontVariationSettings: "'wdth' 112" }}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
        <div className="container-site label flex justify-between pb-8 text-muted safe-bottom">
          <a href={`mailto:${siteConfig.email}`} className="link">
            {siteConfig.email}
          </a>
          <span>{siteConfig.tagline}</span>
        </div>
      </div>
    </header>
  )
}
