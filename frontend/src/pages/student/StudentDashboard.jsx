import { Globe, FileText, Calculator, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const quickLinks = [
  { to: '/dashboard/countries', icon: Globe, label: 'Browse Countries', desc: 'Explore study destinations' },
  { to: '/dashboard/calculator', icon: Calculator, label: 'Cost Calculator', desc: 'Estimate total expenses' },
  { to: '/dashboard/applications', icon: FileText, label: 'My Applications', desc: 'Track application status' },
  { to: '/dashboard/programs', icon: BookOpen, label: 'Programs', desc: 'View available programs' },
]

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.full_name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-500 mt-1">
          Your study-abroad journey starts here. Explore destinations and track your progress.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Countries Available', value: '10', color: 'bg-blue-500' },
          { label: 'Partner Schools', value: '—', color: 'bg-indigo-500' },
          { label: 'Programs', value: '—', color: 'bg-violet-500' },
          { label: 'Application Status', value: 'No application', color: 'bg-emerald-500' },
        ].map((card) => (
          <div key={card.label} className="card flex items-center gap-4">
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
              {card.value === '—' ? '?' : card.value.charAt(0)}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(({ to, icon: Icon, label, desc }) => (
            <Link key={to} to={to} className="card hover:shadow-md hover:border-primary-200 transition-all group">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-200 transition-colors">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-medium text-gray-900">{label}</h3>
              <p className="text-sm text-gray-500 mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="card bg-primary-50 border-primary-100">
        <h2 className="font-semibold text-primary-900 mb-2">Recent Updates</h2>
        <ul className="text-sm text-primary-800 space-y-2">
          <li>• Phase 2 complete — you can now register and log in securely.</li>
          <li>• Country, school, and program browsing coming in Phase 3.</li>
          <li>• Cost calculator and currency converter coming in Phases 4–5.</li>
        </ul>
      </div>
    </div>
  )
}
