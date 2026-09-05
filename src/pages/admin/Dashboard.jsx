import React from 'react'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Users, GraduationCap, Briefcase, ClipboardList, ShieldCheck, UserPlus, Globe2 } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import { AnimatedCounter, Badge } from '../../components/ui/Misc'
import { monthlyApplications } from '../../lib/data'

const stats = [
  { label: 'Total Users', value: 214, icon: Users, color: 'bg-primary-50 text-primary-600' },
  { label: 'Students', value: 168, icon: GraduationCap, color: 'bg-accent-50 text-accent-600' },
  { label: 'Consultants', value: 22, icon: Briefcase, color: 'bg-violet-50 text-violet-600' },
  { label: 'Applications', value: 96, icon: ClipboardList, color: 'bg-success-50 text-success-500' },
]

const activity = [
  { icon: UserPlus, text: 'New consultant Renz Aquino was added', time: '18m ago' },
  { icon: ShieldCheck, text: 'Role permissions updated for Consultants', time: '2h ago' },
  { icon: Globe2, text: 'South Korea marked as a new destination', time: 'Yesterday' },
  { icon: ClipboardList, text: '5 applications moved to COE Processing', time: 'Yesterday' },
]

export default function AdminDashboard() {
  return (
    <DashboardShell role="admin" title="System Overview">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={i} className="p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}><s.icon size={19} /></div>
            <p className="text-xs font-medium text-ink-500">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink-900"><AnimatedCounter value={s.value} /></p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-5 font-display text-base font-semibold text-ink-900">Platform Growth — Applications</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyApplications}>
                <CartesianGrid stroke="#EEF2F7" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Recent Activity</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600"><a.icon size={14} /></div>
                <div>
                  <p className="text-sm text-ink-900">{a.text}</p>
                  <p className="text-xs text-ink-500">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h3 className="mb-4 font-display text-base font-semibold text-ink-900">System Status</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[['API Uptime', '99.98%'], ['Avg. Response Time', '112ms'], ['Active Sessions', '37']].map(([l, v]) => (
            <div key={l} className="rounded-xl2 bg-ink-900/[0.03] p-4">
              <p className="text-xs font-medium text-ink-500">{l}</p>
              <p className="mt-1 font-display text-xl font-bold text-ink-900">{v}</p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardShell>
  )
}
