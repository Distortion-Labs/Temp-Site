'use client'

import { motion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  /** Element to render; use `li` when revealing list items. */
  as?: 'div' | 'li'
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  /** Viewport margin; negative values wait until the element is further into view. */
  margin?: string
}

/** Fades and slides its children in the first time they scroll into view. */
export default function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  duration = 0.6,
  x = 0,
  y = 20,
  margin = '-100px',
}: RevealProps) {
  const Component = as === 'li' ? motion.li : motion.div

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </Component>
  )
}
