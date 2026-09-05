import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, AlertCircle, User, Briefcase, ShieldCheck } from 'lucide-react'
import Button from '../components/ui/Button'
import Logo from '../components/brand/Logo.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setError('Invalid email or password. This is a UI-only prototype — use a demo role button below instead.')
    }, 1200)
  }

  const loginAs = (role) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate(`/${role}`)
    }, 700)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 px-4 py-10">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-xl3 border border-white/30 bg-white/15 p-8 shadow-glass backdrop-blur-xl sm:p-10"
      >
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-5 w-full rounded-2xl bg-white px-6 py-5 shadow-soft">
            <Logo variant="stacked" link={false} imgClassName="mx-auto h-28 w-auto max-w-full object-contain sm:h-32" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-primary-50">Sign in to continue your study abroad journey</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-4 flex items-start gap-2.5 rounded-xl bg-red-500/15 border border-red-300/40 px-4 py-3 text-sm text-white"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Email</label>
            <input
              type="email" required placeholder="you@example.com"
              className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:ring-4 focus:ring-white/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} required placeholder="••••••••"
                className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 pr-11 text-sm text-ink-900 outline-none focus:ring-4 focus:ring-white/30"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white">
              <input type="checkbox" className="h-4 w-4 rounded border-white/40" /> Remember me
            </label>
            <a href="#" className="font-medium text-white hover:underline">Forgot password?</a>
          </div>
          <Button type="submit" size="lg" variant="accent" className="w-full justify-center" disabled={loading}>
            {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/25" />
          <span className="text-xs font-medium text-primary-50">or try a demo role</span>
          <div className="h-px flex-1 bg-white/25" />
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <button onClick={() => loginAs('student')} disabled={loading} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 py-3 text-white transition hover:bg-white/20 disabled:opacity-60">
            <User size={18} /> <span className="text-xs font-semibold">Student</span>
          </button>
          <button onClick={() => loginAs('consultant')} disabled={loading} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 py-3 text-white transition hover:bg-white/20 disabled:opacity-60">
            <Briefcase size={18} /> <span className="text-xs font-semibold">Consultant</span>
          </button>
          <button onClick={() => loginAs('admin')} disabled={loading} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 py-3 text-white transition hover:bg-white/20 disabled:opacity-60">
            <ShieldCheck size={18} /> <span className="text-xs font-semibold">Admin</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
