import React, { useMemo, useState } from 'react'
import { CheckCircle2, XCircle, Clock3 } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Badge } from '../../components/ui/Misc'
import { accountStatusLabels } from '../../lib/data'
import { getAccounts, updateAccount } from '../../lib/accounts'

export default function AccountApprovals({ portal = 'consultant' }) {
  const [tick, setTick] = useState(0)
  const accounts = useMemo(() => getAccounts(), [tick])
  const queue = accounts.filter((a) => a.role === 'Student' && ['pending_approval', 'pending_payment', 'rejected'].includes(a.accountStatus))
  const pending = queue.filter((a) => a.accountStatus === 'pending_approval')

  const decide = (id, accountStatus) => {
    updateAccount(id, { accountStatus })
    setTick((n) => n + 1)
  }

  return (
    <DashboardShell role={portal} title="Account Approvals">
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-medium text-ink-500">Awaiting decision</p>
          <p className="mt-1 font-display text-2xl font-bold text-ink-900">{pending.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-ink-500">Pending payment</p>
          <p className="mt-1 font-display text-2xl font-bold text-ink-900">{queue.filter((a) => a.accountStatus === 'pending_payment').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-ink-500">Rejected</p>
          <p className="mt-1 font-display text-2xl font-bold text-ink-900">{queue.filter((a) => a.accountStatus === 'rejected').length}</p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-900/5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="pb-3 pr-4">Student</th>
                <th className="pb-3 pr-4">Payment</th>
                <th className="pb-3 pr-4">Account</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queue.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-sm text-ink-500">No accounts in the approval queue.</td>
                </tr>
              )}
              {queue.map((a) => (
                <tr key={a.id} className="border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.015]">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">{a.avatar}</div>
                      <div>
                        <p className="font-medium text-ink-900">{a.name}</p>
                        <p className="text-xs text-ink-500">{a.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-ink-700">
                    <p className="font-medium">{a.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}</p>
                    {a.paymentReference && <p className="text-xs text-ink-500">{a.paymentReference} · {a.paymentDate}</p>}
                  </td>
                  <td className="py-3.5 pr-4">
                    <Badge status={a.accountStatus}>{accountStatusLabels[a.accountStatus]}</Badge>
                  </td>
                  <td className="py-3.5">
                    {a.accountStatus === 'pending_approval' ? (
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="success" icon={CheckCircle2} onClick={() => decide(a.id, 'active')}>Approve</Button>
                        <Button size="sm" variant="danger" icon={XCircle} onClick={() => decide(a.id, 'rejected')}>Reject</Button>
                      </div>
                    ) : a.accountStatus === 'pending_payment' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500"><Clock3 size={14} /> Waiting for payment</span>
                    ) : (
                      <Button size="sm" variant="secondary" onClick={() => decide(a.id, 'active')}>Reactivate</Button>
                    )}
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
