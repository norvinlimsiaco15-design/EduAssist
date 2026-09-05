import React from 'react'
import { Users, ClipboardList, Clock3, CheckCircle2, Plus, FileCheck2, MessageSquare } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { AnimatedCounter } from '../../components/ui/Misc'
import { students } from '../../lib/data'

const stats = [
  { label: 'Total Students', value: 48, icon: Users, color: 'bg-primary-50 text-primary-600' },
  { label: 'Active Applications', value: 26, icon: ClipboardList, color: 'bg-accent-50 text-accent-600' },
  { label: 'Pending Reviews', value: 7, icon: Clock3, color: 'bg-amber-50 text-amber-700' },
  { label: 'Approved Applications', value: 33, icon: CheckCircle2, color: 'bg-success-50 text-success-500' },
]

const columns = [
  { title: 'New', color: 'border-ink-300', items: [students[3]] },
  { title: 'Reviewing', color: 'border-primary-400', items: [students[0], students[4]] },
  { title: 'COE', color: 'border-amber-400', items: [students[2]] },
  { title: 'Lodged', color: 'border-violet-400', items: [students[1]] },
  { title: 'Completed', color: 'border-success-500', items: [students[5]] },
]

const activity = [
  { name: 'Maria Santos', action: 'submitted her COE document', time: '12m ago' },
  { name: 'Jared Cruz', action: 'signed the enrollment contract', time: '1h ago' },
  { name: 'Kim De Leon', action: 'requested a document revision', time: '3h ago' },
]

export default function ConsultantDashboard() {
  return (
    <DashboardShell role="consultant" title="Good morning, Carla">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={i} className="p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}><s.icon size={19} /></div>
            <p className="text-xs font-medium text-ink-500">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink-900"><AnimatedCounter value={s.value} /></p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-ink-900">Application Pipeline</h3>
          <Button size="sm" icon={Plus}>New Application</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {columns.map((col) => (
            <div key={col.title} className="w-64 shrink-0">
              <div className={`mb-3 flex items-center justify-between border-b-2 pb-2 ${col.color}`}>
                <p className="text-sm font-semibold text-ink-900">{col.title}</p>
                <span className="rounded-full bg-ink-900/5 px-2 py-0.5 text-xs font-semibold text-ink-700">{col.items.length}</span>
              </div>
              <div className="space-y-3">
                {col.items.map((s) => (
                  <div key={s.id} className="cursor-pointer rounded-xl2 border border-ink-900/5 bg-white p-3.5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">{s.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{s.name}</p>
                        <p className="text-xs text-ink-500">{s.flag} {s.country}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-ink-500">{s.program}</p>
                  </div>
                ))}
                {col.items.length === 0 && (
                  <div className="rounded-xl2 border border-dashed border-ink-300/50 p-4 text-center text-xs text-ink-500">No students</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Student Activity Feed</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600"><MessageSquare size={14} /></div>
                <div>
                  <p className="text-sm text-ink-900"><span className="font-semibold">{a.name}</span> {a.action}</p>
                  <p className="text-xs text-ink-500">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Pending Document Review</h3>
          <div className="space-y-3">
            {[['Medical_Exam_Result.pdf', 'Paolo Bautista'], ['COE_Melbourne_2026.pdf', 'Maria Santos']].map(([doc, student], i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-ink-900/[0.03] p-3">
                <FileCheck2 size={16} className="shrink-0 text-amber-600" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-ink-900">{doc}</p>
                  <p className="text-[11px] text-ink-500">{student}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardShell>
  )
}
