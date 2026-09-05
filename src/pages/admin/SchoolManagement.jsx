import React, { useState } from 'react'
import { Plus, Search, Pencil } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { Input, Select } from '../../components/ui/Misc'
import { schools } from '../../lib/data'

export default function SchoolManagement() {
  const [query, setQuery] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const filtered = schools.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <DashboardShell role="admin" title="School Management">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search schools..."
            className="w-full rounded-xl border border-ink-300/60 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          />
        </div>
        <Button icon={Plus} onClick={() => setAddOpen(true)}>Add School</Button>
      </div>

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
                <button className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Pencil size={15} /></button>
              </div>
              <p className="mt-3 text-sm"><span className="text-ink-500">Tuition: </span><span className="font-semibold text-ink-900">{s.tuition}</span></p>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Partner School"
        footer={<><Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button><Button onClick={() => setAddOpen(false)}>Add School</Button></>}>
        <div className="space-y-4">
          <Input label="School Name" placeholder="e.g. University of Sydney" />
          <Select label="Country"><option>Australia</option><option>Canada</option><option>Germany</option><option>United Kingdom</option></Select>
          <Input label="Tuition (per year)" placeholder="e.g. $30,000" />
        </div>
      </Modal>
    </DashboardShell>
  )
}
