import { Users, School, BookOpen, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminDashboard() {
  const { user } = useAuth()

  const stats = [
    { label: 'Total Students', value: '—', icon: Users, color: 'text-blue-600 bg-blue-100' },
    { label: 'Total Schools', value: '—', icon: School, color: 'text-indigo-600 bg-indigo-100' },
    { label: 'Total Programs', value: '—', icon: BookOpen, color: 'text-violet-600 bg-violet-100' },
    { label: 'Active Applications', value: '—', icon: FileText, color: 'text-emerald-600 bg-emerald-100' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome, {user?.full_name}. Manage students, destinations, and applications.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-3">Consultant Tools</h2>
        <p className="text-sm text-gray-500">
          Full management features for countries, schools, programs, and application statuses
          will be available in Phase 3 and Phase 6.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-800">Manage Destinations</p>
            <p className="text-gray-500 mt-1">Add, edit, and delete countries, schools, and programs.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-800">Update Applications</p>
            <p className="text-gray-500 mt-1">Track and update student application statuses.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
