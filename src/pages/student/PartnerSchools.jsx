import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Select } from '../../components/ui/Misc'
import { schools, countries } from '../../lib/data'

export default function PartnerSchools({ portal = 'student' }) {
  const [country, setCountry] = useState('All')
  const filtered = schools.filter((s) => country === 'All' || s.country === country)

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
          <Select label="Program"><option>All Programs</option><option>Business</option><option>Engineering</option><option>IT</option></Select>
          <Select label="Tuition range"><option>Any</option><option>Under $15,000/yr</option><option>$15,000–30,000/yr</option><option>$30,000+/yr</option></Select>
        </div>
      </Card>

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
    </DashboardShell>
  )
}
