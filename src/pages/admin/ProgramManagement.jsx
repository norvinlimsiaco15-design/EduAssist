import React, { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, FilterX } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { EmptyState, Select } from '../../components/ui/Misc'
import { programs as allPrograms, schools, degreeLevels, tuitionRanges } from '../../lib/data'

const emptyFilters = { school: 'All', degreeLevel: 'All', tuitionRange: 'any' }

export default function ProgramManagement({ portal = 'admin' }) {
  const canEdit = portal === 'admin'
  const [filters, setFilters] = useState(emptyFilters)

  const filtered = useMemo(() => {
    const range = tuitionRanges.find((r) => r.id === filters.tuitionRange) || tuitionRanges[0]
    return allPrograms.filter((p) => {
      const matchSchool = filters.school === 'All' || p.school === filters.school
      const matchDegree = filters.degreeLevel === 'All' || p.degreeLevel === filters.degreeLevel
      const matchTuition = range.id === 'any' || (p.tuitionUSD >= range.min && p.tuitionUSD <= range.max)
      return matchSchool && matchDegree && matchTuition
    })
  }, [filters])

  return (
    <DashboardShell role={portal} title={canEdit ? 'Program Management' : 'Programs'}>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <Card className="flex flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-end">
          <div className="grid flex-1 gap-3 sm:grid-cols-3">
            <Select label="School" value={filters.school} onChange={(e) => setFilters((f) => ({ ...f, school: e.target.value }))}>
              <option>All</option>
              {schools.map((s) => <option key={s.id}>{s.name}</option>)}
            </Select>
            <Select label="Degree Level" value={filters.degreeLevel} onChange={(e) => setFilters((f) => ({ ...f, degreeLevel: e.target.value }))}>
              <option>All</option>
              {degreeLevels.map((d) => <option key={d}>{d}</option>)}
            </Select>
            <Select label="Tuition Range" value={filters.tuitionRange} onChange={(e) => setFilters((f) => ({ ...f, tuitionRange: e.target.value }))}>
              {tuitionRanges.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </Select>
          </div>
          <Button variant="ghost" icon={FilterX} onClick={() => setFilters(emptyFilters)}>Clear Filters</Button>
        </Card>
        {canEdit && <Button icon={Plus}>Add Program</Button>}
      </div>

      {filtered.length === 0 ? (
        <Card className="p-4">
          <EmptyState title="No programs match these filters" description="Try another school, degree level, or tuition range, or clear filters to see the full catalogue." />
        </Card>
      ) : (
        <Card className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-900/5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="pb-3 pr-4">Program</th>
                  <th className="pb-3 pr-4">School</th>
                  <th className="pb-3 pr-4">Degree</th>
                  <th className="pb-3 pr-4">Tuition</th>
                  <th className="pb-3 pr-4">Duration</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.015]">
                    <td className="py-3.5 pr-4 font-medium text-ink-900">{p.name}</td>
                    <td className="py-3.5 pr-4 text-ink-700">{p.school}</td>
                    <td className="py-3.5 pr-4 text-ink-700">{p.degreeLevel}</td>
                    <td className="py-3.5 pr-4 text-ink-700">{p.tuition}</td>
                    <td className="py-3.5 pr-4 text-ink-500">{p.duration}</td>
                    <td className="py-3.5">
                      <div className="flex gap-1.5">
                        <Link to={`/${portal}/programs/${p.id}`} className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Eye size={15} /></Link>
                        {canEdit && (
                          <>
                            <button className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Pencil size={15} /></button>
                            <button className="rounded-lg p-1.5 text-ink-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </DashboardShell>
  )
}
