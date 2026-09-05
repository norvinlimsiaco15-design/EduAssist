import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { countries } from '../../lib/data'

const regions = ['All', 'Oceania', 'North America', 'Europe', 'Asia']
const regionMap = {
  Australia: 'Oceania', 'New Zealand': 'Oceania', Canada: 'North America', 'United States': 'North America',
  Germany: 'Europe', 'United Kingdom': 'Europe', Spain: 'Europe', Malta: 'Europe',
  Singapore: 'Asia', 'South Korea': 'Asia',
}

export default function Countries() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) &&
    (region === 'All' || regionMap[c.name] === region)
  )

  return (
    <DashboardShell role="student" title="Explore Countries">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a country..."
            className="w-full rounded-xl border border-ink-300/60 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r} onClick={() => setRegion(r)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                region === r ? 'bg-primary-600 text-white' : 'bg-white text-ink-700 border border-ink-300/60 hover:border-primary-400'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.code} hover className="overflow-hidden p-0">
            <div className="relative h-36 w-full bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }}>
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-lg leading-none">{c.flag}</span>
              <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink-900">{c.schools} schools</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-base font-semibold text-ink-900">{c.name}</h3>
              <p className="text-xs text-ink-500">Currency: {c.currency}</p>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-ink-500">Tuition</span><span className="font-medium text-ink-900">{c.tuition}</span></div>
                <div className="flex justify-between"><span className="text-ink-500">Living</span><span className="font-medium text-ink-900">{c.living}</span></div>
              </div>
              <Link to="/student/schools">
                <Button size="sm" variant="secondary" className="mt-4 w-full justify-center" icon={ArrowRight}>Explore</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
