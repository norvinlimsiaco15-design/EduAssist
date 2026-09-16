import React from 'react'
import { Download } from 'lucide-react'
import Button from '../ui/Button'

export default function ReportExport({ title, periodStart, periodEnd, children }) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {title && <p className="text-sm font-semibold text-ink-900">{title}</p>}
          <p className="text-xs text-ink-500">Report generated on: September 16, 2026</p>
          {periodStart && periodEnd && (
            <p className="text-xs text-ink-500">Reporting period: {periodStart} – {periodEnd}</p>
          )}
        </div>
        <Button type="button" size="sm" variant="secondary" icon={Download}>
          Download as PDF
        </Button>
      </div>
      <div className="rounded-xl3 bg-surface p-1">
        {children}
      </div>
    </div>
  )
}
