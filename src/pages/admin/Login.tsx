import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

/**
 * Logowanie do panelu admina (e-mail + hasło, Supabase Auth).
 */
export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-sm mx-auto py-12">
        <p className="text-[var(--color-muted)] mb-4">
          Supabase nie jest skonfigurowane. Dodaj VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY do pliku .env (wzór: .env.example).
        </p>
        <a href="/" className="text-[var(--color-accent)] hover:underline">Wróć na stronę</a>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error: err } = await supabase!.auth.signInWithPassword({ email, password })
      if (err) {
        setError(err.message)
        setLoading(false)
        return
      }
      navigate('/admin', { replace: true })
    } catch {
      setError('Wystąpił błąd.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto py-12">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">Logowanie do panelu admina</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Hasło
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium disabled:opacity-50"
        >
          {loading ? 'Logowanie…' : 'Zaloguj'}
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--color-muted)]">
        Konto admina zakładasz w Supabase (Authentication → Users → Add user).
      </p>
    </div>
  )
}
