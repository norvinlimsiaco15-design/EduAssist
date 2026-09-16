import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import StudentGate from './components/layout/StudentGate.jsx'

import StudentDashboard from './pages/student/Dashboard.jsx'
import Countries from './pages/student/Countries.jsx'
import PartnerSchools from './pages/student/PartnerSchools.jsx'
import SchoolDetails from './pages/student/SchoolDetails.jsx'
import CostCalculator from './pages/student/CostCalculator.jsx'
import CurrencyConverter from './pages/student/CurrencyConverter.jsx'
import Applications from './pages/student/Applications.jsx'
import Documents from './pages/student/Documents.jsx'
import Profile from './pages/student/Profile.jsx'
import Payment from './pages/student/Payment.jsx'
import AwaitingApproval from './pages/student/AwaitingApproval.jsx'

import ConsultantDashboard from './pages/consultant/Dashboard.jsx'
import StudentManagement from './pages/consultant/StudentManagement.jsx'
import ApplicationReview from './pages/consultant/ApplicationReview.jsx'
import Reports from './pages/consultant/Reports.jsx'
import AccountApprovals from './pages/shared/AccountApprovals.jsx'
import ProgramDetails from './pages/shared/ProgramDetails.jsx'

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
      <Route path="/register" element={<Register />} />

      {/* Student */}
      <Route element={<StudentGate />}>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/countries" element={<Countries />} />
        <Route path="/student/schools" element={<PartnerSchools />} />
        <Route path="/student/schools/:id" element={<SchoolDetails />} />
        <Route path="/student/programs/:id" element={<ProgramDetails portal="student" />} />
        <Route path="/student/cost-calculator" element={<CostCalculator />} />
        <Route path="/student/currency" element={<CurrencyConverter />} />
        <Route path="/student/applications" element={<Applications />} />
        <Route path="/student/documents" element={<Documents />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/payment" element={<Payment />} />
        <Route path="/student/awaiting-approval" element={<AwaitingApproval />} />
      </Route>

      {/* Consultant */}
      <Route path="/consultant" element={<ConsultantDashboard />} />
      <Route path="/consultant/students" element={<StudentManagement />} />
      <Route path="/consultant/applications" element={<ApplicationReview />} />
      <Route path="/consultant/approvals" element={<AccountApprovals portal="consultant" />} />
      <Route path="/consultant/schools" element={<SchoolManagement portal="consultant" />} />
      <Route path="/consultant/schools/:id" element={<SchoolDetails portal="consultant" />} />
      <Route path="/consultant/programs" element={<ProgramManagement portal="consultant" />} />
      <Route path="/consultant/programs/:id" element={<ProgramDetails portal="consultant" />} />
      <Route path="/consultant/reports" element={<Reports />} />
      <Route path="/consultant/cost-management" element={<CostCalculator portal="consultant" />} />
      <Route path="/consultant/settings" element={<SystemSettings portal="consultant" />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/approvals" element={<AccountApprovals portal="admin" />} />
      <Route path="/admin/countries" element={<CountryManagement />} />
      <Route path="/admin/schools" element={<SchoolManagement />} />
      <Route path="/admin/schools/:id" element={<SchoolDetails portal="admin" />} />
      <Route path="/admin/programs" element={<ProgramManagement />} />
      <Route path="/admin/programs/:id" element={<ProgramDetails portal="admin" />} />
      <Route path="/admin/exchange-rates" element={<CurrencyConverter portal="admin" />} />
      <Route path="/admin/logs" element={<SystemSettings portal="admin" logsView />} />
      <Route path="/admin/settings" element={<SystemSettings portal="admin" />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
