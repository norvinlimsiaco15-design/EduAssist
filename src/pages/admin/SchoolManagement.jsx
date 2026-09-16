import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Pencil, Eye, FilterX } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { EmptyState, Input, Select } from '../../components/ui/Misc'
import { schools, countries, schoolTypes, accreditationStatuses } from '../../lib/data'

const emptyFilters = { country: 'All', schoolType: 'All', accreditationStatus: 'All' }

export default function SchoolManagement({ portal = 'admin' }) {
  const canEdit = portal === 'admin'
  const [query, setQuery] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [filters, setFilters] = useState(emptyFilters)

  const filtered = useMemo(() => schools.filter((s) => {
    const matchQuery = s.name.toLowerCase().includes(query.toLowerCase())
    const matchCountry = filters.country === 'All' || s.country === filters.country
    const matchType = filters.schoolType === 'All' || s.schoolType === filters.schoolType
    const matchAccred = filters.accreditationStatus === 'All' || s.accreditationStatus === filters.accreditationStatus
    return matchQuery && matchCountry && matchType && matchAccred
  }), [query, filters])

  return (
    <DashboardShell role={portal} title={canEdit ? 'School Management' : 'Schools'}>
      <div className="mb-5 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search schools..."
              className="w-full rounded-xl border border-ink-300/60 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            />
          </div>
          {canEdit && <Button icon={Plus} onClick={() => setAddOpen(true)}>Add School</Button>}
        </div>
        <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
          <div className="grid flex-1 gap-3 sm:grid-cols-3">
            <Select label="Country" value={filters.country} onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value }))}>
              <option>All</option>
              {countries.map((c) => <option key={c.code}>{c.name}</option>)}
            </Select>
            <Select label="School Type" value={filters.schoolType} onChange={(e) => setFilters((f) => ({ ...f, schoolType: e.target.value }))}>
              <option>All</option>
              {schoolTypes.map((t) => <option key={t}>{t}</option>)}
            </Select>
            <Select label="Accreditation Status" value={filters.accreditationStatus} onChange={(e) => setFilters((f) => ({ ...f, accreditationStatus: e.target.value }))}>
              <option>All</option>
              {accreditationStatuses.map((t) => <option key={t}>{t}</option>)}
            </Select>
          </div>
          <Button variant="ghost" icon={FilterX} onClick={() => { setFilters(emptyFilters); setQuery('') }}>Clear Filters</Button>
        </Card>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-4">
          <EmptyState title="No schools match these filters" description="Adjust country, type, or accreditation, or clear filters to see every partner school." />
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <Card key={s.id} className="overflow-hidden p-0">
              <div className="h-28 w-full bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }} />
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{s.logo}</span>
                    <div>
                      <p className="font-display text-sm font-semibold leading-tight text-ink-900">{s.name}</p>
                      <p className="text-xs text-ink-500">{s.flag} {s.country}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Link to={`/${portal}/schools/${s.id}`} className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Eye size={15} /></Link>
                    {canEdit && <button className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Pencil size={15} /></button>}
                  </div>
                </div>
                <p className="mt-3 text-xs text-ink-500">{s.schoolType} · {s.accreditationStatus}</p>
                <p className="mt-1 text-sm"><span className="text-ink-500">Tuition: </span><span className="font-semibold text-ink-900">{s.tuition}</span></p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {canEdit && (
        <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Partner School"
          footer={<><Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button><Button onClick={() => setAddOpen(false)}>Add School</Button></>}>
          <div className="space-y-4">
            <Input label="School Name" placeholder="e.g. University of Sydney" />
            <Select label="Country">{countries.map((c) => <option key={c.code}>{c.name}</option>)}</Select>
            <Select label="School Type">{schoolTypes.map((t) => <option key={t}>{t}</option>)}</Select>
            <Select label="Accreditation Status">{accreditationStatuses.map((t) => <option key={t}>{t}</option>)}</Select>
            <Input label="Tuition (per year)" placeholder="e.g. $30,000" />
          </div>
        </Modal>
      )}
    </DashboardShell>
  )
}
