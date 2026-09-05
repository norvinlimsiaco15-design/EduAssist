import React from 'react'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import { timelineStages } from '../../lib/data'

const apps = [
  { school: 'University of Melbourne', program: 'BS Information Technology', flag: '🇦🇺', currentStage: 2, eta: 'Oct 15, 2026' },
  { school: 'University of Toronto', program: 'BS Nursing', flag: '🇨🇦', currentStage: 0, eta: 'Dec 2, 2026' },
]

export default function Applications() {
  return (
    <DashboardShell role="student" title="My Applications">
      <div className="space-y-6">
        {apps.map((app, idx) => (
          <Card key={idx} className="p-6 sm:p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-ink-900">{app.flag} {app.school}</h3>
                <p className="text-sm text-ink-500">{app.program}</p>
              </div>
              <div className="rounded-xl bg-accent-50 px-3.5 py-2 text-xs font-semibold text-accent-600">
                Est. completion: {app.eta}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-ink-900/8 sm:left-[17px]" />
              <div className="space-y-6">
                {timelineStages.map((stage, i) => {
                  const done = i < app.currentStage
                  const active = i === app.currentStage
                  return (
                    <div key={stage} className="relative flex items-start gap-4">
                      <div className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        done ? 'bg-success-500 text-white' : active ? 'bg-primary-600 text-white ring-4 ring-primary-100' : 'bg-white border-2 border-ink-300/60 text-ink-500'
                      }`}>
                        {done ? <CheckCircle2 size={16} /> : active ? <Clock size={15} /> : <Circle size={13} />}
                      </div>
                      <div className="pt-1">
                        <p className={`text-sm font-semibold ${done || active ? 'text-ink-900' : 'text-ink-500'}`}>{stage}</p>
                        {active && <p className="text-xs text-primary-600">In progress</p>}
                        {done && <p className="text-xs text-success-500">Completed</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
