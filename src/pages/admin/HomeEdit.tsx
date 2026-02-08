import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { HomeContent } from '../../types/content'

/**
 * Edycja treści strony głównej (tagline, greeting, subtitle).
 */
export default function AdminHomeEdit() {
  const [tagline, setTagline] = useState('')
  const [greeting, setGreeting] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('content')
      .select('value')
      .eq('key', 'home')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          const v = data.value as HomeContent
          setTagline(v.tagline ?? '')
          setGreeting(v.greeting ?? '')
          setSubtitle(v.subtitle ?? '')
        }
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setSaving(true)
    setMessage(null)
    const value: HomeContent = {
      tagline: tagline || undefined,
      greeting: greeting || undefined,
      subtitle: subtitle || undefined,
    }
    const { error } = await supabase.from('content').upsert({ key: 'home', value }, { onConflict: 'key' })
    setSaving(false)
    setMessage(error ? error.message : 'Zapisano.')
  }

  return (
    <>
      <Link to="/admin" className="text-sm text-[var(--color-accent)] hover:underline mb-6 inline-block">
        ← Panel admina
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">Strona główna</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Tagline (np. msflow.pl)
          </label>
          <input
            id="tagline"
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="greeting" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Powitanie (nad tytułem Blackframe; np. „Cześć, jestem Jan” – jeśli puste, używane jest imię z O mnie)
          </label>
          <input
            id="greeting"
            type="text"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            placeholder="Cześć, jestem..."
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Opis (pod tytułem Blackframe)
          </label>
          <textarea
            id="subtitle"
            rows={3}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        {message && <p className="text-sm text-[var(--color-muted)]">{message}</p>}
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium disabled:opacity-50"
        >
          {saving ? 'Zapisywanie…' : 'Zapisz'}
        </button>
      </form>
    </>
  )
}
