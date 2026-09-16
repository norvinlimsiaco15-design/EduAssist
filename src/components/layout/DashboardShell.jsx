import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Globe2, Building2, Calculator, ArrowLeftRight, FileText,
  Folder, User, Users, ClipboardList, School, BarChart3, Settings,
  ScrollText, Bell, Search, ChevronDown, Menu, X, LogOut,
} from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Logo from '../brand/Logo.jsx'
import { clearSession, getSession } from '../../lib/accounts'

const NAVS = {
  student: [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/student/countries', label: 'Countries', icon: Globe2 },
    { to: '/student/schools', label: 'Partner Schools', icon: Building2 },
    { to: '/student/cost-calculator', label: 'Total Cost of Study Calculator', icon: Calculator },
    { to: '/student/currency', label: 'Currency Converter', icon: ArrowLeftRight },
    { to: '/student/applications', label: 'My Applications', icon: FileText },
    { to: '/student/documents', label: 'Documents', icon: Folder },
    { to: '/student/profile', label: 'Profile', icon: User },
  ],
  consultant: [
    { to: '/consultant', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/consultant/students', label: 'Students', icon: Users },
    { to: '/consultant/applications', label: 'Applications', icon: ClipboardList },
    { to: '/consultant/schools', label: 'Schools', icon: School },
    { to: '/consultant/programs', label: 'Programs', icon: ClipboardList },
    { to: '/consultant/approvals', label: 'Account Approvals', icon: FileText },
    { to: '/consultant/reports', label: 'Reports', icon: BarChart3 },
    { to: '/consultant/cost-management', label: 'Total Cost of Study Calculator', icon: Calculator },
    { to: '/consultant/settings', label: 'Settings', icon: Settings },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/users', label: 'User Management', icon: Users },
    { to: '/admin/approvals', label: 'Account Approvals', icon: FileText },
    { to: '/admin/countries', label: 'Countries', icon: Globe2 },
    { to: '/admin/schools', label: 'Schools', icon: School },
    { to: '/admin/programs', label: 'Programs', icon: ClipboardList },
    { to: '/admin/exchange-rates', label: 'Exchange Rates', icon: ArrowLeftRight },
    { to: '/admin/logs', label: 'System Logs', icon: ScrollText },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ],
}

const ROLE_META = {
  student: { name: 'Maria Santos', tag: 'Student', initials: 'MS', accent: 'primary' },
  consultant: { name: 'Carla Dizon', tag: 'Consultant', initials: 'CD', accent: 'accent' },
  admin: { name: 'Admin User', tag: 'Administrator', initials: 'AU', accent: 'ink' },
}

const BOTTOM_NAV_STUDENT = [
  { to: '/student', icon: LayoutDashboard, end: true },
  { to: '/student/countries', icon: Globe2 },
  { to: '/student/cost-calculator', icon: Calculator },
  { to: '/student/applications', icon: FileText },
  { to: '/student/profile', icon: User },
]

export default function DashboardShell({ role, children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const navigate = useNavigate()
  const items = NAVS[role]
  const session = getSession()
  const meta = {
    ...ROLE_META[role],
    ...(session && session.role?.toLowerCase().startsWith(role === 'admin' ? 'admin' : role)
      ? { name: session.name, initials: session.avatar || ROLE_META[role].initials }
      : {}),
  }

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="px-4 py-5">
        <Logo
          to={`/${role}`}
          imgClassName="h-10 w-auto max-w-full object-contain object-left"
        />
        <p className="mt-1.5 px-0.5 text-[11px] font-medium text-ink-500">{meta.tag} Portal</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 scrollbar-thin">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lift'
                  : 'text-ink-700 hover:bg-ink-900/5'
              }`
            }
          >
            <item.icon size={18} strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-ink-900/5 p-4">
        <button
          onClick={() => setLogoutOpen(true)}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-ink-900/5 bg-white lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink-900/40 lg:hidden" onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lift lg:hidden"
            >
              <button onClick={() => setSidebarOpen(false)} className="absolute right-4 top-5 rounded-lg p-1.5 text-ink-500 hover:bg-ink-900/5">
                <X size={20} />
              </button>
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-ink-900/5 bg-white/80 px-4 py-3.5 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-ink-700 hover:bg-ink-900/5 lg:hidden">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-display text-lg font-bold text-ink-900 sm:text-xl">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                placeholder="Search..."
                className="w-56 rounded-xl border border-ink-300/50 bg-ink-900/[0.02] py-2 pl-9 pr-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10"
              />
            </div>
            <button className="relative rounded-xl p-2.5 text-ink-700 hover:bg-ink-900/5">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-500" />
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-2.5 hover:bg-ink-900/5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                  {meta.initials}
                </div>
                <span className="hidden text-sm font-semibold text-ink-900 sm:block">{meta.name}</span>
                <ChevronDown size={15} className="hidden text-ink-500 sm:block" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl border border-ink-900/5 bg-white p-1.5 shadow-lift"
                  >
                    {['Profile', 'Settings', 'Help'].map((label) => (
                      <button key={label} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-ink-700 hover:bg-ink-900/5">
                        {label}
                      </button>
                    ))}
                    <div className="my-1 h-px bg-ink-900/5" />
                    <button
                      onClick={() => { setProfileOpen(false); setLogoutOpen(true) }}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 lg:pb-8">{children}</main>
      </div>

      {/* Mobile bottom nav (student only) */}
      {role === 'student' && (
        <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-ink-900/5 bg-white/95 py-2 backdrop-blur-md lg:hidden">
          {BOTTOM_NAV_STUDENT.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 ${isActive ? 'text-primary-600' : 'text-ink-500'}`
              }
            >
              <item.icon size={20} />
            </NavLink>
          ))}
        </nav>
      )}

      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Log out of EduAssist?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setLogoutOpen(false)}>Cancel</Button>
            <Button variant="danger" icon={LogOut} onClick={() => { clearSession(); navigate('/login') }}>Logout</Button>
          </>
        }
      >
        <div className="flex flex-col items-center py-2 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <LogOut size={28} />
          </div>
          <p className="text-sm text-ink-500">You'll need to sign in again to access your {meta.tag.toLowerCase()} portal.</p>
        </div>
      </Modal>
    </div>
  )
}
