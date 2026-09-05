import React from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import { AnimatedCounter } from '../../components/ui/Misc'
import { monthlyApplications, countryDistribution } from '../../lib/data'

const statusBreakdown = [
  { status: 'Contract', count: 9 }, { status: 'Documents', count: 14 },
  { status: 'COE', count: 11 }, { status: 'Lodged', count: 7 }, { status: 'Completed', count: 22 },
]

export default function Reports() {
  return (
    <DashboardShell role="consultant" title="Reports & Analytics">
      <div className="grid gap-5 sm:grid-cols-3">
        {[['Total Students', 63], ['Avg. Processing Days', 42], ['Approval Rate', 94]].map(([label, val], i) => (
          <Card key={i} className="p-5">
            <p className="text-xs font-medium text-ink-500">{label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink-900"><AnimatedCounter value={val} suffix={label.includes('Rate') ? '%' : ''} /></p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-5 font-display text-base font-semibold text-ink-900">Monthly Applications</h3>
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
          <h3 className="mb-5 font-display text-base font-semibold text-ink-900">Applications by Status</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusBreakdown}>
                <CartesianGrid stroke="#EEF2F7" vertical={false} />
                <XAxis dataKey="status" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#60A5FA" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-5 font-display text-base font-semibold text-ink-900">Country Distribution</h3>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="h-56 w-56 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={countryDistribution} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={2}>
                    {countryDistribution.map((c, i) => <Cell key={i} fill={c.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3">
              {countryDistribution.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  <span className="text-ink-700">{c.name}</span>
                  <span className="ml-auto font-semibold text-ink-900">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  )
}
