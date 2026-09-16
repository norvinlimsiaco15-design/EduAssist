import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock3, XCircle, Receipt } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { getSession, clearSession } from '../../lib/accounts'

export default function AwaitingApproval() {
  const navigate = useNavigate()
  const session = getSession()
  const rejected = session?.accountStatus === 'rejected'

  return (
    <DashboardShell role="student" title={rejected ? 'Account rejected' : 'Awaiting approval'}>
      <div className="mx-auto max-w-lg">
        <Card className="p-8 text-center">
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${rejected ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
            {rejected ? <XCircle size={28} /> : <Clock3 size={28} />}
          </div>
          <h2 className="font-display text-xl font-bold text-ink-900">
            {rejected ? 'Your account was not approved' : 'Your account is awaiting approval'}
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            {rejected
              ? 'A consultant reviewed your registration and could not activate this account. Please contact EduAssist support or register with a different email.'
              : 'Your visa processing fee has been received. A consultant or administrator will review your account before you can access the student portal.'}
          </p>

          {session?.paymentReference && (
            <div className="mt-5 rounded-xl2 bg-ink-900/[0.03] p-4 text-left text-sm">
              <p className="flex items-center gap-2 font-semibold text-ink-900"><Receipt size={15} /> Payment receipt</p>
              <p className="mt-2 text-ink-700">Reference: <span className="font-semibold">{session.paymentReference}</span></p>
              <p className="text-ink-500">Paid on {session.paymentDate || '—'}</p>
              <p className="text-ink-500">Status: {session.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}</p>
            </div>
          )}

          <Button
            variant="secondary"
            className="mt-6 w-full justify-center"
            onClick={() => { clearSession(); navigate('/login') }}
          >
            Back to sign in
          </Button>
        </Card>
      </div>
    </DashboardShell>
  )
}
