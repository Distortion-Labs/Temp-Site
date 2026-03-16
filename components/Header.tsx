'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0)

      // Active section detection
      const sections = ['products', 'about', 'contact']
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 safe-top"
    >
      <div className={`transition-all duration-500 ${isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-5'}`}>
        <div className="container-main">
          <nav className="relative flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-500 overflow-hidden">
            {/* Glass backdrop - CSS-based for performance */}
            {isScrolled && (
              <div
                className="glass-frosted absolute inset-0 rounded-2xl pointer-events-none"
                style={{ zIndex: 0 }}
              />
            )}

            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-2.5 sm:gap-3 group relative z-10"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Distortion Labs"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <span className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight">
                Distortion<span className="text-primary-400">Labs</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 relative z-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative px-4 lg:px-5 py-2.5 text-sm font-medium transition-colors duration-300 group ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    {link.name}
                    <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full transition-all duration-300 ${isActive ? 'w-2/3' : 'w-0 group-hover:w-2/3'}`} />
                  </button>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block relative z-10">
              <button
                onClick={() => scrollToSection('#products')}
                className="btn-glass px-5 lg:px-6 py-2.5 text-sm font-medium text-white rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                View Products
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl glass text-white z-10"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Scroll progress bar - bottom of nav */}
            {isScrolled && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.03] z-10">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-cyan-500"
                  style={{ width: `${scrollProgress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-void/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden absolute top-full left-0 right-0 px-5 pb-5"
            >
              <div className="glass-frosted rounded-2xl p-2 mt-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    onClick={() => scrollToSection(link.href)}
                    className="w-full px-4 py-4 text-left text-base font-medium text-white/80 hover:text-white active:bg-white/5 rounded-xl transition-colors duration-200"
                  >
                    {link.name}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="p-2 pt-0"
                >
                  <button
                    onClick={() => scrollToSection('#products')}
                    className="w-full btn-glass px-4 py-4 text-center text-base font-medium text-white rounded-xl cursor-pointer"
                  >
                    View Products
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
