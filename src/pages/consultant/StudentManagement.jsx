import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Eye, MessageSquare, X, Mail, Phone } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Badge } from '../../components/ui/Misc'
import { students } from '../../lib/data'

export default function StudentManagement() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const filtered = students.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <DashboardShell role="consultant" title="Student Management">
      <Card className="p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students..."
              className="w-full rounded-xl border border-ink-300/60 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            />
          </div>
          <div className="flex gap-2 text-xs">
            {['All', 'Active', 'Completed'].map((f) => (
              <button key={f} className="rounded-full border border-ink-300/60 bg-white px-3 py-1.5 font-semibold text-ink-700 hover:border-primary-400">{f}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-900/5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="pb-3 pr-4">Student</th>
                <th className="pb-3 pr-4">Country</th>
                <th className="pb-3 pr-4">Program</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.015]">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">{s.avatar}</div>
                      <span className="font-medium text-ink-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-ink-700">{s.flag} {s.country}</td>
                  <td className="py-3.5 pr-4 text-ink-500">{s.program}</td>
                  <td className="py-3.5 pr-4"><Badge status={s.status} /></td>
                  <td className="py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(s)} className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Eye size={16} /></button>
                      <button className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><MessageSquare size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-ink-900/40" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white p-6 shadow-lift"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-ink-900">Student Profile</h3>
                <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 text-ink-500 hover:bg-ink-900/5"><X size={18} /></button>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 font-display text-2xl font-bold text-primary-700">{selected.avatar}</div>
                <h4 className="mt-3 font-display text-lg font-bold text-ink-900">{selected.name}</h4>
                <p className="text-sm text-ink-500">{selected.flag} {selected.country} · {selected.program}</p>
                <div className="mt-2"><Badge status={selected.status} /></div>
              </div>
              <div className="mt-6 space-y-3 rounded-xl2 bg-ink-900/[0.03] p-4 text-sm">
                <div className="flex items-center gap-2.5 text-ink-700"><Mail size={15} /> {selected.email}</div>
                <div className="flex items-center gap-2.5 text-ink-700"><Phone size={15} /> +63 917 555 0192</div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" className="flex-1 justify-center">Message</Button>
                <Button className="flex-1 justify-center">View Application</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardShell>
  )
}
