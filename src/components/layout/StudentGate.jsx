import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getSession } from '../../lib/accounts'

export default function StudentGate() {
  const location = useLocation()
  const session = getSession()
  const path = location.pathname

  if (!session || session.role !== 'Student') {
    return <Outlet />
  }

  const status = session.accountStatus
  const onPayment = path === '/student/payment'
  const onAwaiting = path === '/student/awaiting-approval'

  if (status === 'pending_payment' && !onPayment) {
    return <Navigate to="/student/payment" replace />
  }
  if ((status === 'pending_approval' || status === 'rejected') && !onAwaiting) {
    return <Navigate to="/student/awaiting-approval" replace />
  }
  if (status === 'active' && (onPayment || onAwaiting)) {
    return <Navigate to="/student" replace />
  }

  return <Outlet />
}
