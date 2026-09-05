import React from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, CheckCircle2 } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { schools } from '../../lib/data'

const requirements = [
  'Completed application form', 'Certified transcript of records', 'Valid passport (6+ months validity)',
  'English proficiency test (IELTS/TOEFL)', 'Statement of purpose', 'Proof of financial capacity',
]

export default function SchoolDetails() {
  const { id } = useParams()
  const school = schools.find((s) => String(s.id) === id) || schools[0]

  return (
    <DashboardShell role="student" title="School Details">
      <Card className="overflow-hidden p-0">
        <div className="h-56 w-full bg-cover bg-center sm:h-72" style={{ backgroundImage: `url(${school.image})` }} />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-2xl">{school.logo}</div>
              <div>
                <h1 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">{school.name}</h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500"><MapPin size={14} /> {school.flag} {school.country}</p>
              </div>
            </div>
            <Button size="lg">Apply Now</Button>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-700">
            {school.name} is one of EduAssist's leading partner institutions in {school.country}, known for strong graduate outcomes
            and a diverse international student community. Students benefit from dedicated visa support, on-campus housing
            assistance, and career pathway programs across our supported programs.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Card className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Tuition</p>
              <p className="mt-1 font-display text-xl font-bold text-ink-900">{school.tuition}</p>
            </Card>
            <Card className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Estimated Living Expenses</p>
              <p className="mt-1 font-display text-xl font-bold text-ink-900">$1,200–1,800/mo</p>
            </Card>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-ink-900">Programs offered</p>
            <div className="flex flex-wrap gap-2">
              {school.programs.map((p) => (
                <span key={p} className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700">{p}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 h-48 w-full rounded-xl2 bg-ink-900/5 flex items-center justify-center text-sm text-ink-500">
            Map placeholder — {school.country}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-ink-900">Application requirements</p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-ink-700">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success-500" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </DashboardShell>
  )
}
