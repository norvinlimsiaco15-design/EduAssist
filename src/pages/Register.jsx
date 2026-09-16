import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Eye, EyeOff, CreditCard, CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Logo from '../components/brand/Logo.jsx'

const STEPS = ['Account', 'Payment', 'Confirmation']

export default function Register() {
  const [step, setStep] = useState('form')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const stepIndex = step === 'form' ? 0 : step === 'payment' ? 1 : 2

  const submitAccount = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setStep('payment')
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
          <div className="mb-5 flex w-full items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
                <div className={`h-1.5 w-full rounded-full ${i <= stepIndex ? 'bg-accent-400' : 'bg-white/25'}`} />
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${i <= stepIndex ? 'text-white' : 'text-primary-100/70'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div key="form" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              <div className="mb-6 text-center">
                <h1 className="font-display text-2xl font-bold text-white">Create your student account</h1>
                <p className="mt-1 text-sm text-primary-50">Sign up, pay the visa processing fee, then wait for consultant approval.</p>
              </div>

              {error && (
                <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-white">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={submitAccount} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white">Full name</label>
                  <input
                    required value={form.name} onChange={set('name')} placeholder="Juan Dela Cruz"
                    className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:ring-4 focus:ring-white/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white">Email</label>
                  <input
                    type="email" required value={form.email} onChange={set('email')} placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:ring-4 focus:ring-white/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'} required minLength={6} value={form.password} onChange={set('password')} placeholder="At least 6 characters"
                      className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 pr-11 text-sm text-ink-900 outline-none focus:ring-4 focus:ring-white/30"
                    />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500">
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white">Confirm password</label>
                  <input
                    type={showPassword ? 'text' : 'password'} required value={form.confirm} onChange={set('confirm')} placeholder="Re-enter password"
                    className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm text-ink-900 outline-none focus:ring-4 focus:ring-white/30"
                  />
                </div>
                <Button type="submit" size="lg" variant="accent" className="w-full justify-center">
                  Continue to Payment
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-primary-50">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-white hover:underline">Sign in</Link>
              </p>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div key="payment" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              <div className="mb-6 text-center">
                <h1 className="font-display text-2xl font-bold text-white">Visa Processing Fee Payment</h1>
                <p className="mt-1 text-sm text-primary-50">Pay the one-time processing fee to submit your registration.</p>
              </div>

              <div className="mb-5 rounded-2xl bg-white/15 px-5 py-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-50">Amount due</p>
                <p className="mt-1 font-display text-3xl font-bold text-white">₱500</p>
              </div>

              <form
                onSubmit={(e) => { e.preventDefault(); setStep('success') }}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white">Card number</label>
                  <input
                    placeholder="ACCT-000015"
                    className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:ring-4 focus:ring-white/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white">Expiry</label>
                    <input
                      placeholder="MM / YY"
                      className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:ring-4 focus:ring-white/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white">CVV</label>
                    <input
                      placeholder="123"
                      className="w-full rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 outline-none focus:ring-4 focus:ring-white/30"
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" variant="accent" className="w-full justify-center" icon={CreditCard}>
                  Pay Now
                </Button>
                <button type="button" onClick={() => setStep('form')} className="w-full text-center text-sm font-semibold text-white/80 hover:text-white">
                  Back to account details
                </button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white">
                <CheckCircle2 size={32} />
              </div>
              <h1 className="font-display text-2xl font-bold text-white">Payment Successful — Awaiting Account Approval</h1>
              <p className="mt-3 text-sm leading-relaxed text-primary-50">
                Your ₱500 visa processing fee has been received. A consultant will review your account before you can access the student portal.
              </p>
              <Link to="/login" className="mt-6 block">
                <Button size="lg" variant="accent" className="w-full justify-center">Back to sign in</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
