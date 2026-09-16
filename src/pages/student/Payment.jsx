import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, ShieldCheck, Loader2 } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Misc'
import { VISA_PROCESSING_FEE_PHP } from '../../lib/data'
import { completeVisaPayment, getSession } from '../../lib/accounts'

export default function Payment() {
  const navigate = useNavigate()
  const session = getSession()
  const [method, setMethod] = useState('card')
  const [wallet, setWallet] = useState('GCash')
  const [loading, setLoading] = useState(false)

  const pay = (e) => {
    e.preventDefault()
    const account = getSession()
    if (!account) {
      navigate('/register', { replace: true })
      return
    }
    setLoading(true)
    setTimeout(() => {
      completeVisaPayment(account.id)
      setLoading(false)
      navigate('/student/awaiting-approval', { replace: true })
    }, 900)
  }

  return (
    <DashboardShell role="student" title="Visa Processing Fee Payment">
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden p-0">
          <div className="bg-primary-600 px-6 py-6 text-white sm:px-8">
            <p className="text-sm text-primary-100">One-time processing fee</p>
            <p className="mt-1 font-display text-3xl font-bold">₱{VISA_PROCESSING_FEE_PHP.toLocaleString()}</p>
            <p className="mt-2 text-sm text-primary-50">Required before a consultant can review and activate your student portal.</p>
          </div>

          <form onSubmit={pay} className="space-y-6 p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  method === 'card' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-ink-300/60 text-ink-700 hover:bg-ink-900/5'
                }`}
              >
                <CreditCard size={16} /> Card
              </button>
              <button
                type="button"
                onClick={() => setMethod('ewallet')}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  method === 'ewallet' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-ink-300/60 text-ink-700 hover:bg-ink-900/5'
                }`}
              >
                <Smartphone size={16} /> E-wallet
              </button>
            </div>

            {method === 'card' ? (
              <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:grid-cols-2">
                <Input label="Name on card" className="sm:col-span-2" defaultValue={session?.name || ''} placeholder="JUAN DELA CRUZ" required />
                <Input label="Card number" className="sm:col-span-2" placeholder="4242 4242 4242 4242" required />
                <Input label="Expiry" placeholder="12 / 28" required />
                <Input label="CVV" placeholder="123" required />
              </motion.div>
            ) : (
              <motion.div key="wallet" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {['GCash', 'Maya'].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWallet(w)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                        wallet === w ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-ink-300/60 text-ink-700'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
                <Input label={`${wallet} mobile number`} placeholder="09XXXXXXXXX" required />
              </motion.div>
            )}

            <div className="flex items-start gap-2 rounded-xl bg-ink-900/[0.03] p-3.5 text-xs text-ink-500">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-primary-600" />
              Demo checkout only — no payment is processed. Pay Now simulates a successful ₱{VISA_PROCESSING_FEE_PHP} visa processing fee.
            </div>

            <Button type="submit" size="lg" className="w-full justify-center" disabled={loading}>
              {loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : `Pay Now — ₱${VISA_PROCESSING_FEE_PHP}`}
            </Button>
          </form>
        </Card>
      </div>
    </DashboardShell>
  )
}
