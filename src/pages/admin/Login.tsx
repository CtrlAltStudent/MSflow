import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

/**
 * Logowanie i rejestracja do panelu admina (e-mail + hasło, Supabase Auth).
 */
export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
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
    setSuccess(null)
    setLoading(true)
    try {
      if (isRegister) {
        const { data, error: err } = await supabase!.auth.signUp({ email, password })
        if (err) {
          setError(err.message)
          setLoading(false)
          return
        }
        if (data.session) {
          navigate('/admin', { replace: true })
          return
        }
        setSuccess('Konto utworzone. Zaloguj się poniżej (jeśli włączono potwierdzenie e-mail, najpierw potwierdź link z maila).')
        setIsRegister(false)
      } else {
        const { error: err } = await supabase!.auth.signInWithPassword({ email, password })
        if (err) {
          setError(err.message)
          setLoading(false)
          return
        }
        navigate('/admin', { replace: true })
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Wystąpił błąd.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-sm mx-auto py-12">
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">
        {isRegister ? 'Rejestracja konta admina' : 'Logowanie do panelu admina'}
      </h1>
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
            minLength={6}
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-green-400">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium disabled:opacity-50"
        >
          {loading
            ? isRegister
              ? 'Rejestracja…'
              : 'Logowanie…'
            : isRegister
              ? 'Zarejestruj'
              : 'Zaloguj'}
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--color-muted)]">
        {isRegister ? (
          <>
            Masz już konto?{' '}
            <button type="button" onClick={() => { setIsRegister(false); setError(null); setSuccess(null); }} className="text-[var(--color-accent)] hover:underline">
              Zaloguj się
            </button>
          </>
        ) : (
          <>
            Nie masz konta?{' '}
            <button type="button" onClick={() => { setIsRegister(true); setError(null); setSuccess(null); }} className="text-[var(--color-accent)] hover:underline">
              Zarejestruj konto admina
            </button>
          </>
        )}
      </p>
      <p className="mt-2 text-xs text-[var(--color-muted)]">
        Jeśli widzisz „Failed to fetch”, sprawdź w .env poprawność VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY (Supabase → Project Settings → API) i zrestartuj serwer (npm run dev).
      </p>
    </div>
  )
}
