'use client'

import { Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Distortion-Labs' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="relative py-12 sm:py-16 safe-bottom overflow-hidden">
      {/* Static gradient background with grain */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e] via-[#0d0618] to-[var(--void)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_80%,rgba(79,43,110,0.25)_0%,transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Top fade into previous section */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--void)] to-transparent pointer-events-none" />

      <div className="container-main relative">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2.5 mb-6 group"
          >
            <div className="relative w-9 h-9 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Distortion Labs"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display text-lg font-semibold text-white tracking-tight">
              Distortion<span className="text-primary-400">Labs</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-3 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/15 hover:scale-110 transition-all duration-300"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-white/30">
            &copy; {new Date().getFullYear()} Distortion Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
