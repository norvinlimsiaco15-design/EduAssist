import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lift',
  secondary: 'bg-white text-ink-900 border border-ink-300/60 hover:border-primary-400',
  accent: 'bg-accent-500 text-white hover:bg-accent-600',
  ghost: 'bg-transparent text-ink-700 hover:bg-ink-900/5',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  success: 'bg-success-500 text-white hover:bg-green-600',
}

const sizes = {
  sm: 'text-sm px-3.5 py-1.5 rounded-xl',
  md: 'text-sm px-5 py-2.5 rounded-xl',
  lg: 'text-base px-6 py-3.5 rounded-2xl',
}

export default function Button({ variant = 'primary', size = 'md', icon: Icon, className = '', children, ...props }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={17} strokeWidth={2.2} />}
      {children}
    </motion.button>
  )
}
