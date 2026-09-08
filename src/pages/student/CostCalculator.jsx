import React, { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import { Input, Select, AnimatedCounter } from '../../components/ui/Misc'
import { countries, schools } from '../../lib/data'

const FX_TO_PHP = { AUD: 41.2, CAD: 41.8, EUR: 63.8, NZD: 35.9, GBP: 74.6, USD: 58.9, SGD: 43.7, KRW: 0.043 }
const COLORS = ['#2563EB', '#60A5FA', '#F59E0B', '#16A34A', '#8B5CF6', '#F97316']

export default function CostCalculator({ portal = 'student' }) {
  const [destination, setDestination] = useState('Australia')
  const [schoolId, setSchoolId] = useState(() => schools.find((s) => s.country === 'Australia')?.id ?? schools[0].id)
  const [program, setProgram] = useState(() => {
    const school = schools.find((s) => s.country === 'Australia') || schools[0]
    return school.programs[0]
  })
  const [tuition, setTuition] = useState(24000)
  const [living, setLiving] = useState(14400)
  const [processing, setProcessing] = useState(650)
  const [visa, setVisa] = useState(710)
  const [medical, setMedical] = useState(300)
  const [other, setOther] = useState(500)

  const schoolsInCountry = useMemo(
    () => schools.filter((s) => s.country === destination),
    [destination],
  )
  const selectedSchool = schoolsInCountry.find((s) => s.id === schoolId) || schoolsInCountry[0]
  const programs = selectedSchool?.programs ?? []

  const onDestinationChange = (name) => {
    setDestination(name)
    const nextSchools = schools.filter((s) => s.country === name)
    const nextSchool = nextSchools[0]
    setSchoolId(nextSchool?.id)
    setProgram(nextSchool?.programs[0] || '')
  }

  const onSchoolChange = (id) => {
    const nextId = Number(id)
    setSchoolId(nextId)
    const nextSchool = schools.find((s) => s.id === nextId)
    setProgram(nextSchool?.programs[0] || '')
  }

  const currency = countries.find((c) => c.name === destination)?.currency || 'AUD'
  const rate = FX_TO_PHP[currency] || 40

  const breakdown = useMemo(() => ([
    { name: 'Tuition', value: Number(tuition) || 0 },
    { name: 'Living', value: Number(living) || 0 },
    { name: 'Processing', value: Number(processing) || 0 },
    { name: 'Visa', value: Number(visa) || 0 },
    { name: 'Medical', value: Number(medical) || 0 },
    { name: 'Other', value: Number(other) || 0 },
  ]), [tuition, living, processing, visa, medical, other])

  const total = breakdown.reduce((sum, b) => sum + b.value, 0)
  const totalPHP = Math.round(total * rate)

  return (
    <DashboardShell role={portal} title="Cost Computation">
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-3">
          <h3 className="mb-5 font-display text-base font-semibold text-ink-900">Trip Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Destination" value={destination} onChange={(e) => onDestinationChange(e.target.value)}>
              {countries.map((c) => <option key={c.code}>{c.name}</option>)}
            </Select>
            <Select label="School" value={selectedSchool?.id ?? ''} onChange={(e) => onSchoolChange(e.target.value)}>
              {schoolsInCountry.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Select>
            <Select label="Program" className="sm:col-span-2" value={program} onChange={(e) => setProgram(e.target.value)}>
              {programs.map((p) => <option key={p}>{p}</option>)}
            </Select>
          </div>

          <h3 className="mb-4 mt-7 font-display text-base font-semibold text-ink-900">Expense Breakdown ({currency})</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label={`Tuition (${currency})`} type="number" value={tuition} onChange={(e) => setTuition(e.target.value)} />
            <Input label={`Living expenses (${currency})`} type="number" value={living} onChange={(e) => setLiving(e.target.value)} />
            <Input label={`Processing fee (${currency})`} type="number" value={processing} onChange={(e) => setProcessing(e.target.value)} />
            <Input label={`Visa fee (${currency})`} type="number" value={visa} onChange={(e) => setVisa(e.target.value)} />
            <Input label={`Medical fee (${currency})`} type="number" value={medical} onChange={(e) => setMedical(e.target.value)} />
            <Input label={`Other expenses (${currency})`} type="number" value={other} onChange={(e) => setOther(e.target.value)} />
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2 h-fit lg:sticky lg:top-24">
          <h3 className="mb-1 font-display text-base font-semibold text-ink-900">Estimated Total</h3>
          <p className="mb-5 text-xs text-ink-500">{destination} · {currency}</p>

          <div className="mx-auto h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={breakdown} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {breakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `${currency} ${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {breakdown.map((b, i) => (
              <div key={b.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-700">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  {b.name}
                </span>
                <span className="font-medium text-ink-900">{currency} {b.value.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl2 bg-primary-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary-700">Total ({currency})</span>
              <span className="font-display text-lg font-bold text-primary-700">
                {currency} <AnimatedCounter value={total} />
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-primary-600/10 pt-2">
              <span className="text-sm font-medium text-primary-700">Estimated (PHP)</span>
              <span className="font-display text-xl font-bold text-primary-700">
                ₱<AnimatedCounter value={totalPHP} />
              </span>
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-ink-500">Exchange rate: 1 {currency} ≈ ₱{rate}</p>
        </Card>
      </div>
    </DashboardShell>
  )
}
