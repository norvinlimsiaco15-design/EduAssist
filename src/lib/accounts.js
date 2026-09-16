import { students as seedStudents, users as seedUsers } from './data'

const ACCOUNTS_KEY = 'eduassist_accounts_v1'
const SESSION_KEY = 'eduassist_session_v1'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function displayStatus(accountStatus) {
  if (accountStatus === 'pending_payment') return 'Pending Payment'
  if (accountStatus === 'pending_approval') return 'Pending Approval'
  if (accountStatus === 'rejected') return 'Rejected'
  return 'Active'
}

function seedAccounts() {
  const byEmail = new Map()
  seedUsers.forEach((u) => {
    const student = seedStudents.find((s) => s.email === u.email)
    byEmail.set(u.email, {
      ...u,
      avatar: student?.avatar || initials(u.name),
      country: student?.country || null,
      flag: student?.flag || null,
      program: student?.program || null,
      applicationStatus: student?.status || null,
      accountStatus: u.accountStatus || 'active',
      paymentStatus: u.paymentStatus || (u.role === 'Student' ? 'unpaid' : 'n/a'),
      paymentDate: u.paymentDate ?? null,
      paymentReference: u.paymentReference ?? null,
    })
  })
  seedStudents.forEach((s) => {
    if (byEmail.has(s.email)) return
    byEmail.set(s.email, {
      id: 100 + s.id,
      name: s.name,
      email: s.email,
      role: 'Student',
      status: displayStatus(s.accountStatus),
      avatar: s.avatar,
      country: s.country,
      flag: s.flag,
      program: s.program,
      applicationStatus: s.status,
      accountStatus: s.accountStatus,
      paymentStatus: s.paymentStatus,
      paymentDate: s.paymentDate,
      paymentReference: s.paymentReference,
    })
  })
  return Array.from(byEmail.values())
}

export function getAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  const seeded = seedAccounts()
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(seeded))
  return seeded
}

export function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  return accounts
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setSession(account) {
  if (!account) {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(account))
  return account
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function findAccountByEmail(email) {
  return getAccounts().find((a) => a.email.toLowerCase() === email.toLowerCase())
}

export function findAccountByRole(roleLabel) {
  return getAccounts().find((a) => a.role === roleLabel)
}

export function registerStudent({ name, email }) {
  const accounts = getAccounts()
  if (accounts.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email already exists.')
  }
  const nextId = Math.max(0, ...accounts.map((a) => a.id)) + 1
  const account = {
    id: nextId,
    name,
    email,
    role: 'Student',
    status: 'Pending Payment',
    avatar: initials(name),
    country: null,
    flag: null,
    program: null,
    applicationStatus: null,
    accountStatus: 'pending_payment',
    paymentStatus: 'unpaid',
    paymentDate: null,
    paymentReference: null,
  }
  saveAccounts([...accounts, account])
  setSession(account)
  return account
}

export function updateAccount(id, patch) {
  const accounts = getAccounts().map((a) => {
    if (a.id !== id) return a
    const next = { ...a, ...patch }
    if (patch.accountStatus) next.status = displayStatus(patch.accountStatus)
    return next
  })
  saveAccounts(accounts)
  const updated = accounts.find((a) => a.id === id)
  const session = getSession()
  if (session?.id === id) setSession(updated)
  return updated
}

export function completeVisaPayment(id) {
  const ref = `EA-PAY-${Math.floor(100000 + Math.random() * 900000)}`
  const paidOn = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  return updateAccount(id, {
    paymentStatus: 'paid',
    paymentDate: paidOn,
    paymentReference: ref,
    accountStatus: 'pending_approval',
    status: 'Pending Approval',
  })
}

export function loginDemoRole(role) {
  const map = {
    student: 'Student',
    consultant: 'Consultant',
    admin: 'Administrator',
  }
  const preferred = {
    student: 'maria.santos@email.com',
    consultant: 'carla.dizon@eduassist.ph',
    admin: 'admin@eduassist.ph',
  }
  const accounts = getAccounts()
  const account =
    accounts.find((a) => a.email === preferred[role]) ||
    accounts.find((a) => a.role === map[role] && a.accountStatus === 'active')
  if (account) setSession(account)
  return account
}

export function pendingApprovals() {
  return getAccounts().filter((a) => a.role === 'Student' && a.accountStatus === 'pending_approval')
}
