import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ className = '', hover = false, glass = false, children, ...props }) {
  const base = glass ? 'glass border border-white/60' : 'bg-white border border-ink-900/5'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.35 }}
      className={`${base} rounded-xl3 shadow-soft ${hover ? 'hover:shadow-lift transition-shadow duration-200' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
