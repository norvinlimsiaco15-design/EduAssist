import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Globe2, Wallet, Clock3, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import { Badge, AnimatedCounter, ProgressBar } from '../../components/ui/Misc'
import { applications, timelineStages } from '../../lib/data'
import { getSession } from '../../lib/accounts'

const stats = [
  { label: 'Applications', value: 3, icon: FileText, color: 'bg-primary-50 text-primary-600' },
  { label: 'Countries Explored', value: 5, icon: Globe2, color: 'bg-accent-50 text-accent-600' },
  { label: 'Estimated Budget', value: 1842300, prefix: '₱', icon: Wallet, color: 'bg-success-50 text-success-500' },
  { label: 'Current Status', value: 68, suffix: '%', icon: Clock3, color: 'bg-violet-50 text-violet-600', sub: 'COE Processing' },
]

export default function StudentDashboard() {
  const currentStageIndex = 2
  const firstName = (getSession()?.name || 'Maria').split(' ')[0]
  return (
    <DashboardShell role="student" title={`Welcome back, ${firstName} 👋`}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={i} className="p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon size={19} />
            </div>
            <p className="text-xs font-medium text-ink-500">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink-900">
              <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            {s.sub && <p className="mt-0.5 text-xs text-ink-500">{s.sub}</p>}
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-ink-900">Recent Applications</h3>
            <Link to="/student/applications" className="flex items-center gap-1 text-sm font-semibold text-primary-600">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-900/5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="pb-3 pr-4">School</th>
                  <th className="pb-3 pr-4">Country</th>
                  <th className="pb-3 pr-4">Program</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 4).map((a) => (
                  <tr key={a.id} className="border-b border-ink-900/5 last:border-0">
                    <td className="py-3.5 pr-4 font-medium text-ink-900">{a.school}</td>
                    <td className="py-3.5 pr-4 text-ink-700">{a.flag} {a.country}</td>
                    <td className="py-3.5 pr-4 text-ink-500">{a.program}</td>
                    <td className="py-3.5"><Badge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-5 font-display text-base font-semibold text-ink-900">Application Progress</h3>
          <p className="mb-4 text-sm text-ink-500">University of Melbourne — BS Information Technology</p>
          <div className="space-y-4">
            {timelineStages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i < currentStageIndex ? 'bg-success-500 text-white' :
                  i === currentStageIndex ? 'bg-primary-600 text-white' : 'bg-ink-900/5 text-ink-500'
                }`}>
                  {i < currentStageIndex ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${i <= currentStageIndex ? 'text-ink-900' : 'text-ink-500'}`}>{stage}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <ProgressBar value={((currentStageIndex + 1) / timelineStages.length) * 100} />
          </div>
        </Card>
      </div>
    </DashboardShell>
  )
}
