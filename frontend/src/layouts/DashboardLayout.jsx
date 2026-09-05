import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  LayoutDashboard,
  Globe,
  School,
  BookOpen,
  Calculator,
  DollarSign,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
  HandCoins,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const studentLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/countries', label: 'Countries', icon: Globe },
  { to: '/dashboard/schools', label: 'Schools', icon: School },
  { to: '/dashboard/programs', label: 'Programs', icon: BookOpen },
  { to: '/dashboard/calculator', label: 'Cost Calculator', icon: Calculator },
  { to: '/dashboard/converter', label: 'Currency Converter', icon: DollarSign },
  { to: '/dashboard/applications', label: 'My Applications', icon: FileText },
  { to: '/dashboard/financial-assistance', label: 'Financial Assistance', icon: HandCoins },
]

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/countries', label: 'Countries', icon: Globe },
  { to: '/admin/schools', label: 'Schools', icon: School },
  { to: '/admin/programs', label: 'Programs', icon: BookOpen },
  { to: '/admin/applications', label: 'Applications', icon: FileText },
]

function SidebarLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 hover:bg-primary-50 hover:text-primary-700'
        }`
      }
    >
      <Icon className="w-5 h-5 shrink-0" />
      {label}
    </NavLink>
  )
}

export default function DashboardLayout({ variant = 'student' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const links = variant === 'admin' ? adminLinks : studentLinks

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-700">
            <GraduationCap className="w-7 h-7" />
            <span className="font-bold text-lg">EduAssist</span>
          </div>
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            <span className="inline-block mt-1 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full capitalize">
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-8 flex items-center gap-4">
          <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <p className="text-sm text-gray-500">
              {variant === 'admin' ? 'Consultant Portal' : 'Student Portal'}
            </p>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
