import React, { useState, useMemo } from 'react'
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts'
import { ArrowLeftRight, TrendingUp } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import { Select } from '../../components/ui/Misc'
import { exchangeRates } from '../../lib/data'

const currencies = Object.keys(exchangeRates)

function genHistory(rate) {
  return Array.from({ length: 14 }).map((_, i) => ({
    day: i, rate: +(rate * (1 + Math.sin(i / 2) * 0.015 + (Math.random() - 0.5) * 0.01)).toFixed(3),
  }))
}

export default function CurrencyConverter({ portal = 'student' }) {
  const [from, setFrom] = useState('AUD')
  const [amount, setAmount] = useState(1000)

  const rate = exchangeRates[from]
  const history = useMemo(() => genHistory(rate), [from])
  const converted = (Number(amount) || 0) * rate

  const swap = () => setFrom((c) => (c === 'PHP' ? 'AUD' : c))

  return (
    <DashboardShell role={portal} title="Currency Converter">
      <div className="mx-auto max-w-xl">
        <Card className="p-7">
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <Select label="From" value={from} onChange={(e) => setFrom(e.target.value)}>
              {currencies.map((c) => <option key={c}>{c}</option>)}
            </Select>
            <button onClick={swap} className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 hover:bg-primary-100">
              <ArrowLeftRight size={17} />
            </button>
            <Select label="To" defaultValue="PHP"><option>PHP</option></Select>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Amount ({from})</label>
            <input
              type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-ink-300/60 bg-white px-4 py-3 font-display text-2xl font-bold text-ink-900 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            />
          </div>

          <div className="mt-5 rounded-xl2 bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-white">
            <p className="text-xs font-medium text-primary-100">Converted amount</p>
            <p className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              ₱{converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-primary-100">
              <TrendingUp size={13} /> 1 {from} = ₱{rate.toFixed(currency_precision(rate))}
            </p>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-900">14-day trend</p>
              <span className="text-xs text-ink-500">{from} → PHP</span>
            </div>
            <div className="h-20 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                  <Line type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <div className="mt-5 grid grid-cols-4 gap-2.5 sm:grid-cols-8">
          {currencies.map((c) => (
            <button
              key={c} onClick={() => setFrom(c)}
              className={`rounded-xl border py-2 text-xs font-semibold transition ${
                from === c ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-ink-300/50 bg-white text-ink-700 hover:border-primary-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}

function currency_precision(rate) {
  return rate < 1 ? 3 : 2
}
