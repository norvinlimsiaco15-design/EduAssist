import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'

import StudentDashboard from './pages/student/Dashboard.jsx'
import Countries from './pages/student/Countries.jsx'
import PartnerSchools from './pages/student/PartnerSchools.jsx'
import SchoolDetails from './pages/student/SchoolDetails.jsx'
import CostCalculator from './pages/student/CostCalculator.jsx'
import CurrencyConverter from './pages/student/CurrencyConverter.jsx'
import Applications from './pages/student/Applications.jsx'
import Documents from './pages/student/Documents.jsx'
import Profile from './pages/student/Profile.jsx'

import ConsultantDashboard from './pages/consultant/Dashboard.jsx'
import StudentManagement from './pages/consultant/StudentManagement.jsx'
import ApplicationReview from './pages/consultant/ApplicationReview.jsx'
import Reports from './pages/consultant/Reports.jsx'

import AdminDashboard from './pages/admin/Dashboard.jsx'
import UserManagement from './pages/admin/UserManagement.jsx'
import CountryManagement from './pages/admin/CountryManagement.jsx'
import SchoolManagement from './pages/admin/SchoolManagement.jsx'
import ProgramManagement from './pages/admin/ProgramManagement.jsx'
import SystemSettings from './pages/admin/SystemSettings.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Student */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/countries" element={<Countries />} />
      <Route path="/student/schools" element={<PartnerSchools />} />
      <Route path="/student/schools/:id" element={<SchoolDetails />} />
      <Route path="/student/cost-calculator" element={<CostCalculator />} />
      <Route path="/student/currency" element={<CurrencyConverter />} />
      <Route path="/student/applications" element={<Applications />} />
      <Route path="/student/documents" element={<Documents />} />
      <Route path="/student/profile" element={<Profile />} />

      {/* Consultant */}
      <Route path="/consultant" element={<ConsultantDashboard />} />
      <Route path="/consultant/students" element={<StudentManagement />} />
      <Route path="/consultant/applications" element={<ApplicationReview />} />
      <Route path="/consultant/schools" element={<PartnerSchools portal="consultant" />} />
      <Route path="/consultant/reports" element={<Reports />} />
      <Route path="/consultant/cost-management" element={<CostCalculator portal="consultant" />} />
      <Route path="/consultant/settings" element={<SystemSettings portal="consultant" />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/roles" element={<UserManagement roleView />} />
      <Route path="/admin/countries" element={<CountryManagement />} />
      <Route path="/admin/schools" element={<SchoolManagement />} />
      <Route path="/admin/programs" element={<ProgramManagement />} />
      <Route path="/admin/exchange-rates" element={<CurrencyConverter portal="admin" />} />
      <Route path="/admin/logs" element={<SystemSettings portal="admin" logsView />} />
      <Route path="/admin/settings" element={<SystemSettings portal="admin" />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
