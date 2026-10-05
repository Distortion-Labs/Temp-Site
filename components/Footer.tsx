import { Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { mainNav, siteConfig } from '@/lib/site'

const footerLinks = [...mainNav, { name: 'Privacy', href: '/privacy' }]

const socialLinks = [
  { name: 'GitHub', icon: Github, href: siteConfig.links.github },
  { name: 'Twitter', icon: Twitter, href: siteConfig.links.twitter },
]

export default function Footer() {
  return (
    // Background continues the bottom edge of GradientSection so the two read as one surface
    <footer className="relative py-12 sm:py-16 safe-bottom bg-[#0d0618]">
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="container-main relative">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-6 group">
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
          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
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
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
