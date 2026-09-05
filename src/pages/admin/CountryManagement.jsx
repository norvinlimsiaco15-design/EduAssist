import React, { useState } from 'react'
import { Plus, Pencil } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { Input, Select } from '../../components/ui/Misc'
import { countries } from '../../lib/data'

export default function CountryManagement() {
  const [addOpen, setAddOpen] = useState(false)
  return (
    <DashboardShell role="admin" title="Country Management">
      <div className="mb-5 flex justify-end">
        <Button icon={Plus} onClick={() => setAddOpen(true)}>Add Country</Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => (
          <Card key={c.code} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">{c.name}</p>
                  <p className="text-xs text-ink-500">Currency: {c.currency}</p>
                </div>
              </div>
              <button className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Pencil size={15} /></button>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-ink-900/[0.03] px-3.5 py-2.5 text-sm">
              <span className="text-ink-500">Partner Schools</span>
              <span className="font-semibold text-ink-900">{c.schools}</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Country"
        footer={<><Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button><Button onClick={() => setAddOpen(false)}>Add Country</Button></>}>
        <div className="space-y-4">
          <Input label="Country Name" placeholder="e.g. Ireland" />
          <Select label="Currency"><option>USD</option><option>EUR</option><option>GBP</option><option>AUD</option><option>CAD</option></Select>
          <Input label="Tuition Range" placeholder="e.g. $12,000–24,000/yr" />
        </div>
      </Modal>
    </DashboardShell>
  )
}
