import React, { useState } from 'react'
import { UploadCloud, FileText, CheckCircle2, Clock } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import { documents } from '../../lib/data'

const categories = ['All', 'Passport', 'COE', 'Visa', 'Transcript', 'Medical']

export default function Documents() {
  const [filter, setFilter] = useState('All')
  const [dragOver, setDragOver] = useState(false)
  const filtered = documents.filter((d) => filter === 'All' || d.category === filter)

  return (
    <DashboardShell role="student" title="Documents">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false) }}
        className={`mb-6 flex flex-col items-center justify-center rounded-xl3 border-2 border-dashed p-10 text-center transition ${
          dragOver ? 'border-primary-500 bg-primary-50' : 'border-ink-300/60 bg-white'
        }`}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <UploadCloud size={22} />
        </div>
        <p className="text-sm font-semibold text-ink-900">Drag & drop your files here</p>
        <p className="mt-1 text-xs text-ink-500">PDF, JPG or PNG, up to 10MB</p>
        <button className="mt-4 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">Browse Files</button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c} onClick={() => setFilter(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === c ? 'bg-primary-600 text-white' : 'bg-white text-ink-700 border border-ink-300/60'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => (
          <Card key={doc.id} hover className="p-5">
            <div className="mb-3 flex h-24 w-full items-center justify-center rounded-xl bg-ink-900/[0.03] text-ink-300">
              <FileText size={30} />
            </div>
            <p className="truncate text-sm font-semibold text-ink-900">{doc.name}</p>
            <p className="mt-0.5 text-xs text-ink-500">{doc.category} · {doc.size} · {doc.date}</p>
            <div className="mt-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                doc.status === 'Verified' ? 'bg-success-50 text-success-500' : 'bg-amber-50 text-amber-700'
              }`}>
                {doc.status === 'Verified' ? <CheckCircle2 size={12} /> : <Clock size={12} />} {doc.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
