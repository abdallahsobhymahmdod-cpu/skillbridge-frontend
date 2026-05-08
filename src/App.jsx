import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import PublicLayout from '@/layouts/PublicLayout'
import AppLayout from '@/layouts/AppLayout'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from '@/routes/ProtectedRoute'
import Home from '@/pages/public/Home'
import About from '@/pages/public/About'
import ExploreSkills from '@/pages/public/ExploreSkills'
import HowItWorks from '@/pages/public/HowItWorks'
import Contact from '@/pages/public/Contact'
import FAQ from '@/pages/public/FAQ'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Dashboard from '@/pages/user/Dashboard'
import MySkills from '@/pages/user/MySkills'
import Matches from '@/pages/user/Matches'
import Sessions from '@/pages/user/Sessions'
import Chat from '@/pages/user/Chat'
import Reviews from '@/pages/user/Reviews'
import Profile from '@/pages/user/Profile'
import Settings from '@/pages/user/Settings'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminSkills from '@/pages/admin/AdminSkills'
import AdminMatches from '@/pages/admin/AdminMatches'
import AdminSessions from '@/pages/admin/AdminSessions'
import AdminReports from '@/pages/admin/AdminReports'
import AdminSettings from '@/pages/admin/AdminSettings'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<ExploreSkills />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute allowedRoles={['user','admin']}><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skills" element={<MySkills />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="matches" element={<AdminMatches />} />
          <Route path="sessions" element={<AdminSessions />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
