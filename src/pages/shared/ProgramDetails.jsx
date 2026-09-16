import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock3, GraduationCap, Landmark } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { programs, schools } from '../../lib/data'

export default function ProgramDetails({ portal = 'admin' }) {
  const { id } = useParams()
  const program = programs.find((p) => String(p.id) === id) || programs[0]
  const school = schools.find((s) => s.id === program.schoolId)
  const canEdit = portal === 'admin'
  const backTo =
    portal === 'admin' ? '/admin/programs' :
    portal === 'consultant' ? '/consultant/programs' :
    `/student/schools/${program.schoolId}`

  return (
    <DashboardShell role={portal} title="Program Details">
      <Link to={backTo} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
        <ArrowLeft size={15} /> {portal === 'student' ? 'Back to school' : 'Back to programs'}
      </Link>
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{program.degreeLevel}</p>
            <h1 className="mt-1 font-display text-xl font-bold text-ink-900 sm:text-2xl">{program.name}</h1>
            <p className="mt-1 text-sm text-ink-500">{program.school}</p>
          </div>
          {canEdit && <Button variant="secondary">Edit program</Button>}
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-700">{program.overview}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500"><Landmark size={13} /> Tuition</p>
            <p className="mt-1 font-display text-lg font-bold text-ink-900">{program.tuition}</p>
          </Card>
          <Card className="p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500"><Clock3 size={13} /> Duration</p>
            <p className="mt-1 font-display text-lg font-bold text-ink-900">{program.duration}</p>
          </Card>
          <Card className="p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500"><GraduationCap size={13} /> Degree</p>
            <p className="mt-1 font-display text-lg font-bold text-ink-900">{program.degreeLevel}</p>
          </Card>
        </div>

        {school && (
          <div className="mt-6 rounded-xl2 bg-ink-900/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Offered by</p>
            <p className="mt-1 font-display text-base font-semibold text-ink-900">{school.flag} {school.name}</p>
            <p className="text-sm text-ink-500">{school.country} · {school.schoolType} · {school.accreditationStatus}</p>
            <Link to={`/${portal}/schools/${school.id}`}>
              <Button size="sm" variant="secondary" className="mt-3">View school details</Button>
            </Link>
          </div>
        )}
      </Card>
    </DashboardShell>
  )
}
