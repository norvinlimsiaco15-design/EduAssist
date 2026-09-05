import React from 'react'
import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import { statusColors } from '../../lib/data'

export function Badge({ status, children }) {
  const cls = statusColors[status] || 'bg-ink-900/5 text-ink-700 border-ink-300/40'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cls}`}>
      {children || status}
    </span>
  )
}

export function ProgressBar({ value, colorClass = 'bg-primary-600' }) {
  return (
    <div className="h-2 w-full rounded-full bg-ink-900/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full rounded-full ${colorClass}`}
      />
    </div>
  )
}

export function Input({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>}
      <input
        className={`w-full rounded-xl border border-ink-300/60 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500/70 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 ${className}`}
        {...props}
      />
    </label>
  )
}

export function Select({ label, className = '', children, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>}
      <select
        className={`w-full rounded-xl border border-ink-300/60 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}

export function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const [display, setDisplay] = React.useState(0)
  React.useEffect(() => {
    let raf
    let cancelled = false
    const start = performance.now()
    const duration = 900
    const tick = (now) => {
      if (cancelled) return
      const progress = Math.min(Math.max((now - start) / duration, 0), 1)
      setDisplay(Math.round(progress * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [value])
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-ink-900/8 ${className}`} />
}

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        <Icon size={26} />
      </div>
      <h3 className="text-base font-semibold text-ink-900">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function Toast({ message, type = 'success', onClose }) {
  const colors = {
    success: 'bg-success-500',
    error: 'bg-red-500',
    info: 'bg-primary-600',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-medium text-white shadow-lift ${colors[type]}`}
    >
      {message}
      {onClose && (
        <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
      )}
    </motion.div>
  )
}
