import { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

/**
 * Layout panelu admina – pasek z linkiem na stronę i wylogowaniem; chroni trasy (wymaga logowania).
 */
export default function AdminLayout() {
  const [checking, setChecking] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setChecking(false)
      setAuthenticated(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session)
      setChecking(false)
      if (!session) navigate('/admin/login', { replace: true })
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session)
      if (!session) navigate('/admin/login', { replace: true })
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <p className="text-[var(--color-muted)]">Ładowanie…</p>
      </div>
    )
  }

  if (!authenticated) return null

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-muted)]">Panel admina</span>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-[var(--color-accent)] hover:underline">
              Wróć na stronę
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
