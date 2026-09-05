import React, { useState } from 'react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Input, Select } from '../../components/ui/Misc'

const tabs = ['General', 'Branding', 'Notifications', 'Security', 'Appearance', 'Exchange Rates', 'Backup']

const logs = [
  { time: '09:41 AM', actor: 'admin@eduassist.ph', action: 'Updated exchange rate for AUD' },
  { time: '08:15 AM', actor: 'carla.dizon@eduassist.ph', action: 'Approved application APP-2202' },
  { time: 'Yesterday', actor: 'system', action: 'Nightly backup completed successfully' },
  { time: 'Yesterday', actor: 'renz.aquino@eduassist.ph', action: 'Invited user jared.cruz@email.com' },
]

export default function SystemSettings({ portal = 'admin', logsView = false }) {
  const [tab, setTab] = useState('General')

  if (logsView) {
    return (
      <DashboardShell role={portal} title="System Logs">
        <Card className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-900/5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="pb-3 pr-4">Time</th><th className="pb-3 pr-4">Actor</th><th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} className="border-b border-ink-900/5 last:border-0">
                    <td className="py-3.5 pr-4 text-ink-500">{l.time}</td>
                    <td className="py-3.5 pr-4 font-medium text-ink-900">{l.actor}</td>
                    <td className="py-3.5 text-ink-700">{l.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell role={portal} title="Settings">
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t} onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t ? 'bg-primary-600 text-white' : 'bg-white text-ink-700 border border-ink-300/60'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="p-6 sm:p-7">
        {tab === 'General' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Platform Name" defaultValue="EduAssist" />
            <Input label="Support Email" defaultValue="support@eduassist.ph" />
            <Select label="Default Language"><option>English</option><option>Filipino</option></Select>
            <Select label="Timezone"><option>Asia/Manila (GMT+8)</option></Select>
          </div>
        )}
        {tab === 'Branding' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Primary Color" defaultValue="#2563EB" />
            <Input label="Accent Color" defaultValue="#F59E0B" />
            <div className="sm:col-span-2">
              <p className="mb-1.5 text-sm font-medium text-ink-700">Logo</p>
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-ink-300/60 text-xs text-ink-500">Upload</div>
            </div>
          </div>
        )}
        {tab === 'Notifications' && (
          <div className="space-y-4">
            {['Email notifications', 'SMS alerts for status changes', 'Weekly digest for consultants'].map((n) => (
              <label key={n} className="flex items-center justify-between rounded-xl bg-ink-900/[0.03] px-4 py-3">
                <span className="text-sm font-medium text-ink-900">{n}</span>
                <input type="checkbox" defaultChecked className="h-5 w-9 appearance-none rounded-full bg-primary-600 relative cursor-pointer" />
              </label>
            ))}
          </div>
        )}
        {tab === 'Security' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Session timeout (minutes)" type="number" defaultValue={30} />
            <Select label="Require two-factor authentication"><option>Optional</option><option>Required for Admins</option><option>Required for All</option></Select>
          </div>
        )}
        {tab === 'Appearance' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Theme"><option>Light</option><option>System</option></Select>
            <Select label="Density"><option>Comfortable</option><option>Compact</option></Select>
          </div>
        )}
        {tab === 'Exchange Rates' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Auto-update frequency" defaultValue="Every 6 hours" />
            <Select label="Source"><option>Bangko Sentral ng Pilipinas</option><option>Manual</option></Select>
          </div>
        )}
        {tab === 'Backup' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-ink-900/[0.03] px-4 py-3.5">
              <div>
                <p className="text-sm font-semibold text-ink-900">Last backup</p>
                <p className="text-xs text-ink-500">Today, 3:00 AM · 214 MB</p>
              </div>
              <Button size="sm" variant="secondary">Run Backup Now</Button>
            </div>
          </div>
        )}
        <div className="mt-7 flex justify-end gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </Card>
    </DashboardShell>
  )
}
