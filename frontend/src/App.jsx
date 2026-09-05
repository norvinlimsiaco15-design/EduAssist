import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import HealthCheck from './pages/HealthCheck'
import Login from './pages/Login'
import Register from './pages/Register'
import ComingSoon from './pages/ComingSoon'
import StudentDashboard from './pages/student/StudentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'

function RootRedirect() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/health" element={<HealthCheck />} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout variant="student" />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="countries" element={<ComingSoon title="Study Destinations" description="Browse countries and their details — coming in Phase 3." />} />
        <Route path="schools" element={<ComingSoon title="Partner Schools" description="Browse partner schools — coming in Phase 3." />} />
        <Route path="programs" element={<ComingSoon title="Programs" description="Browse educational programs — coming in Phase 3." />} />
        <Route path="calculator" element={<ComingSoon title="Cost Calculator" description="Estimate study-abroad costs — coming in Phase 4." />} />
        <Route path="converter" element={<ComingSoon title="Currency Converter" description="Convert foreign currency to PHP — coming in Phase 5." />} />
        <Route path="applications" element={<ComingSoon title="My Applications" description="Track your application status — coming in Phase 6." />} />
        <Route path="financial-assistance" element={<ComingSoon title="Financial Assistance" description="Scholarship and installment information — coming in Phase 7." />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <DashboardLayout variant="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<ComingSoon title="Student Records" description="Manage student accounts — coming in Phase 3." />} />
        <Route path="countries" element={<ComingSoon title="Manage Countries" description="Add, edit, and delete countries — coming in Phase 3." />} />
        <Route path="schools" element={<ComingSoon title="Manage Schools" description="Add, edit, and delete schools — coming in Phase 3." />} />
        <Route path="programs" element={<ComingSoon title="Manage Programs" description="Add, edit, and delete programs — coming in Phase 3." />} />
        <Route path="applications" element={<ComingSoon title="Manage Applications" description="View and update application statuses — coming in Phase 6." />} />
      </Route>

      <Route path="*" element={<RootRedirect />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
