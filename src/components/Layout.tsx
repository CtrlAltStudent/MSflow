import { Outlet } from 'react-router-dom'
import Nav from './Nav'

/**
 * Główny layout – nawigacja + zawartość stron (Outlet).
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
