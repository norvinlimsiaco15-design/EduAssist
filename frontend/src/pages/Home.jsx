import { GraduationCap, Globe, Calculator, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    { icon: Globe, title: 'Study Destinations', desc: 'Browse countries and partner schools worldwide' },
    { icon: Calculator, title: 'Cost Calculator', desc: 'Estimate tuition, living costs, and total expenses' },
    { icon: FileText, title: 'Application Tracking', desc: 'Monitor your study-abroad application status' },
    { icon: GraduationCap, title: 'Programs', desc: 'Explore educational programs at partner institutions' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <GraduationCap className="w-8 h-8" />
          <span className="text-xl font-bold">EduAssist</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-white/90 hover:text-white text-sm font-medium px-4 py-2">
            Sign In
          </Link>
          <Link to="/register" className="bg-white text-primary-700 hover:bg-primary-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Register
          </Link>
        </div>
      </nav>

      <header className="container mx-auto px-6 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Student Study-Abroad Assistance
        </h1>
        <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
          Your centralized platform for browsing destinations, estimating costs,
          converting currencies, and tracking applications.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link to="/register" className="bg-white text-primary-700 hover:bg-primary-50 font-medium px-6 py-3 rounded-lg transition-colors">
            Get Started
          </Link>
          <Link to="/login" className="border border-white/40 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors">
            Sign In
          </Link>
        </div>
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Phase 2 — Authentication Complete
        </div>
      </header>

      <section className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
