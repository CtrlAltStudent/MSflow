import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Downloads from './pages/Downloads'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminAboutEdit from './pages/admin/AboutEdit'
import AdminProjectsEdit from './pages/admin/ProjectsEdit'
import AdminDownloadsEdit from './pages/admin/DownloadsEdit'
import AdminHomeEdit from './pages/admin/HomeEdit'

/**
 * Aplikacja Blackframe / msflow.pl – routing stron publicznych i panelu admina.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="o-mnie" element={<About />} />
          <Route path="projekty" element={<Projects />} />
          <Route path="pobieralnia" element={<Downloads />} />
        </Route>
        <Route path="admin">
          <Route path="login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="o-mnie" element={<AdminAboutEdit />} />
            <Route path="projekty" element={<AdminProjectsEdit />} />
            <Route path="pobieralnia" element={<AdminDownloadsEdit />} />
            <Route path="strona-glowna" element={<AdminHomeEdit />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
