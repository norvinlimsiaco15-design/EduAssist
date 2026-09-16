import React, { useMemo, useState } from 'react'
import { Plus, Pencil, FilterX } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { EmptyState, Input, Select, Badge } from '../../components/ui/Misc'
import { countries as allCountries, continents } from '../../lib/data'

const emptyFilters = { region: 'All', status: 'All' }

export default function CountryManagement() {
  const [addOpen, setAddOpen] = useState(false)
  const [filters, setFilters] = useState(emptyFilters)

  const filtered = useMemo(() => allCountries.filter((c) => {
    const matchRegion = filters.region === 'All' || c.region === filters.region
    const matchStatus = filters.status === 'All' || c.status === filters.status
    return matchRegion && matchStatus
  }), [filters])

  return (
    <DashboardShell role="admin" title="Country Management">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <Card className="flex flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-end">
          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            <Select label="Region / Continent" value={filters.region} onChange={(e) => setFilters((f) => ({ ...f, region: e.target.value }))}>
              <option>All</option>
              {continents.map((r) => <option key={r}>{r}</option>)}
            </Select>
            <Select label="Status" value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </Select>
          </div>
          <Button variant="ghost" icon={FilterX} onClick={() => setFilters(emptyFilters)}>Clear Filters</Button>
        </Card>
        <Button icon={Plus} onClick={() => setAddOpen(true)}>Add Country</Button>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-4">
          <EmptyState title="No countries match these filters" description="Clear filters or choose a different region and status combination." />
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Card key={c.code} className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <p className="font-display text-sm font-semibold text-ink-900">{c.name}</p>
                    <p className="text-xs text-ink-500">{c.region} · Currency: {c.currency}</p>
                  </div>
                </div>
                <button className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Pencil size={15} /></button>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-ink-900/[0.03] px-3.5 py-2.5 text-sm">
                <span className="text-ink-500">Partner Schools</span>
                <span className="font-semibold text-ink-900">{c.schools}</span>
              </div>
              <div className="mt-3">
                <Badge status={c.status}>{c.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Country"
        footer={<><Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button><Button onClick={() => setAddOpen(false)}>Add Country</Button></>}>
        <div className="space-y-4">
          <Input label="Country Name" placeholder="e.g. Ireland" />
          <Select label="Region / Continent">{continents.map((r) => <option key={r}>{r}</option>)}</Select>
          <Select label="Status"><option>Active</option><option>Inactive</option></Select>
          <Select label="Currency"><option>USD</option><option>EUR</option><option>GBP</option><option>AUD</option><option>CAD</option></Select>
          <Input label="Tuition Range" placeholder="e.g. $12,000–24,000/yr" />
        </div>
      </Modal>
    </DashboardShell>
  )
}
