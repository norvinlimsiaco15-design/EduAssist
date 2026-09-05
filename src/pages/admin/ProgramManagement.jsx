import React from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const programs = [
  { name: 'BS Information Technology', school: 'University of Melbourne', tuition: '$32,000/yr', duration: '4 years' },
  { name: 'BS Nursing', school: 'University of Toronto', tuition: '$28,500/yr', duration: '4 years' },
  { name: 'MS Data Science', school: 'TU Munich', tuition: '$2,500/yr', duration: '2 years' },
  { name: 'BS Architecture', school: 'University of Auckland', tuition: '$26,000/yr', duration: '5 years' },
  { name: 'BA Economics', school: 'University of Manchester', tuition: '£24,000/yr', duration: '3 years' },
  { name: 'BA International Relations', school: 'IE University', tuition: '€13,200/yr', duration: '4 years' },
]

export default function ProgramManagement() {
  return (
    <DashboardShell role="admin" title="Program Management">
      <div className="mb-5 flex justify-end">
        <Button icon={Plus}>Add Program</Button>
      </div>
      <Card className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-900/5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="pb-3 pr-4">Program</th><th className="pb-3 pr-4">School</th>
                <th className="pb-3 pr-4">Tuition</th><th className="pb-3 pr-4">Duration</th><th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p, i) => (
                <tr key={i} className="border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.015]">
                  <td className="py-3.5 pr-4 font-medium text-ink-900">{p.name}</td>
                  <td className="py-3.5 pr-4 text-ink-700">{p.school}</td>
                  <td className="py-3.5 pr-4 text-ink-700">{p.tuition}</td>
                  <td className="py-3.5 pr-4 text-ink-500">{p.duration}</td>
                  <td className="py-3.5">
                    <div className="flex gap-1.5">
                      <button className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Pencil size={15} /></button>
                      <button className="rounded-lg p-1.5 text-ink-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardShell>
  )
}
