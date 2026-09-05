import React, { useState } from 'react'
import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Select } from '../../components/ui/Misc'
import { timelineStages } from '../../lib/data'

const docs = [
  { name: 'Passport_Santos_M.pdf', status: 'Verified' },
  { name: 'COE_Melbourne_2026.pdf', status: 'Pending Review' },
  { name: 'Transcript_of_Records.pdf', status: 'Verified' },
]

export default function ApplicationReview() {
  const [notes, setNotes] = useState('')
  return (
    <DashboardShell role="consultant" title="Application Review — Maria Santos">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 font-display font-bold text-primary-700">MS</div>
              <div>
                <h3 className="font-display text-base font-semibold text-ink-900">Maria Santos</h3>
                <p className="text-sm text-ink-500">University of Melbourne · BS Information Technology</p>
              </div>
            </div>
            <Select label="Application Status" defaultValue="COE Processing">
              {timelineStages.slice(0, 5).map((s) => <option key={s}>{s}</option>)}
            </Select>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Submitted Documents</h3>
            <div className="space-y-3">
              {docs.map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-xl bg-ink-900/[0.03] p-3.5">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-ink-500" />
                    <span className="text-sm font-medium text-ink-900">{d.name}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    d.status === 'Verified' ? 'bg-success-50 text-success-500' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {d.status === 'Verified' ? <CheckCircle2 size={12} /> : <Clock size={12} />} {d.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-3 font-display text-base font-semibold text-ink-900">Internal Notes</h3>
            <textarea
              value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Add a note for your team..."
              className="w-full rounded-xl border border-ink-300/60 bg-white p-3.5 text-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            />
            <div className="mt-3 flex justify-end"><Button size="sm">Save Note</Button></div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Timeline</h3>
            <div className="space-y-3">
              {timelineStages.slice(0, 3).map((s, i) => (
                <div key={s} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 size={16} className={i < 2 ? 'text-success-500' : 'text-primary-600'} />
                  <span className={i < 2 ? 'text-ink-900' : 'font-semibold text-ink-900'}>{s}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 space-y-3">
            <Button variant="success" icon={CheckCircle2} className="w-full justify-center">Approve</Button>
            <Button variant="danger" icon={XCircle} className="w-full justify-center">Request Revision</Button>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
