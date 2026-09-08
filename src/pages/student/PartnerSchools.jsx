import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { EmptyState, Select } from '../../components/ui/Misc'
import { schools, countries, tuitionRanges } from '../../lib/data'

export default function PartnerSchools({ portal = 'student' }) {
  const [country, setCountry] = useState('All')
  const [program, setProgram] = useState('All Programs')
  const [tuitionRange, setTuitionRange] = useState('any')

  const programs = useMemo(
    () => [...new Set(schools.flatMap((s) => s.programs))].sort(),
    [],
  )

  const filtered = useMemo(() => {
    const range = tuitionRanges.find((r) => r.id === tuitionRange) || tuitionRanges[0]
    return schools.filter((s) => {
      const matchCountry = country === 'All' || s.country === country
      const matchProgram = program === 'All Programs' || s.programs.includes(program)
      const matchTuition =
        range.id === 'any' || (s.tuitionUSD >= range.min && s.tuitionUSD <= range.max)
      return matchCountry && matchProgram && matchTuition
    })
  }, [country, program, tuitionRange])

  return (
    <DashboardShell role={portal} title="Partner Schools">
      <Card className="mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-700">
          <Filter size={16} /> Filters
        </div>
        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          <Select label="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option>All</option>
            {countries.map((c) => <option key={c.code}>{c.name}</option>)}
          </Select>
          <Select label="Program" value={program} onChange={(e) => setProgram(e.target.value)}>
            <option>All Programs</option>
            {programs.map((p) => <option key={p}>{p}</option>)}
          </Select>
          <Select label="Tuition range" value={tuitionRange} onChange={(e) => setTuitionRange(e.target.value)}>
            {tuitionRanges.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </Select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-4">
          <EmptyState
            title="No schools match these filters"
            description="Try another country, program, or tuition range — every destination in the list now has partner schools."
          />
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <Card key={s.id} hover className="overflow-hidden p-0">
              <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }} />
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg">{s.logo}</div>
                  <div>
                    <h3 className="font-display text-sm font-semibold leading-tight text-ink-900">{s.name}</h3>
                    <p className="text-xs text-ink-500">{s.flag} {s.country}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.programs.map((p) => (
                    <span key={p} className="rounded-full bg-ink-900/5 px-2 py-0.5 text-[11px] font-medium text-ink-700">{p}</span>
                  ))}
                </div>
                <p className="mt-3 text-sm"><span className="text-ink-500">Tuition: </span><span className="font-semibold text-ink-900">{s.tuition}</span></p>
                <Link to={`/${portal}/schools/${s.id}`}>
                  <Button size="sm" className="mt-4 w-full justify-center">View Details</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
