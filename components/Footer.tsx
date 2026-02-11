'use client'

import { Zap, Github, Twitter } from 'lucide-react'
import Link from 'next/link'

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
    <footer className="relative py-12 sm:py-16 safe-bottom bg-transparent">
      <div className="container-main">
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-cyan-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
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
                className="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300"
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
