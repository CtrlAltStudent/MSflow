import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { AboutContent } from '../../types/content'

/**
 * Edycja O mnie – name, role, location, experienceYears, openToWork, skills, bio, avatar, kontakt.
 */
export default function AdminAboutEdit() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [experienceYears, setExperienceYears] = useState('')
  const [openToWork, setOpenToWork] = useState(false)
  const [skillsText, setSkillsText] = useState('')
  const [bio, setBio] = useState('')
  const [bioShort, setBioShort] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [email, setEmail] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('content')
      .select('value')
      .eq('key', 'about')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) {
          const v = data.value as AboutContent
          setName(v.name ?? '')
          setRole(v.role ?? '')
          setLocation(v.location ?? '')
          setExperienceYears(v.experienceYears ?? '')
          setOpenToWork(v.openToWork ?? false)
          setSkillsText((v.skills ?? []).join(', '))
          setBio(v.bio ?? '')
          setBioShort(v.bioShort ?? '')
          setAvatarUrl(v.avatarUrl ?? '')
          setEmail(v.email ?? '')
          setGithubUrl(v.githubUrl ?? '')
          setLinkedinUrl(v.linkedinUrl ?? '')
        }
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setSaving(true)
    setMessage(null)
    const skills = skillsText.split(',').map((s) => s.trim()).filter(Boolean)
    const value: AboutContent = {
      name: name || undefined,
      role: role || undefined,
      location: location || undefined,
      experienceYears: experienceYears || undefined,
      openToWork: openToWork || undefined,
      skills: skills.length ? skills : undefined,
      bio: bio || undefined,
      bioShort: bioShort || undefined,
      avatarUrl: avatarUrl || undefined,
      email: email || undefined,
      githubUrl: githubUrl || undefined,
      linkedinUrl: linkedinUrl || undefined,
    }
    const { error } = await supabase.from('content').upsert({ key: 'about', value }, { onConflict: 'key' })
    setSaving(false)
    setMessage(error ? error.message : 'Zapisano.')
  }

  return (
    <>
      <Link to="/admin" className="text-sm text-[var(--color-accent)] hover:underline mb-6 inline-block">
        ← Panel admina
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">O mnie</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Imię i nazwisko
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jan Kowalski"
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Rola / tytuł (np. Developer, Full‑stack developer)
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Developer"
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Lokalizacja (np. Polska)
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Polska"
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="experienceYears" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Lata doświadczenia (np. 5 lub 5+)
          </label>
          <input
            id="experienceYears"
            type="text"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            placeholder="5"
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="openToWork"
            type="checkbox"
            checked={openToWork}
            onChange={(e) => setOpenToWork(e.target.checked)}
            className="rounded border-[var(--color-border)]"
          />
          <label htmlFor="openToWork" className="text-sm text-[var(--color-muted)]">
            Szukam współpracy (pokazuj badge na stronie głównej)
          </label>
        </div>
        <div>
          <label htmlFor="skillsText" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Umiejętności / Experience includes (oddzielone przecinkami)
          </label>
          <input
            id="skillsText"
            type="text"
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            placeholder="React, TypeScript, Node.js"
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="bioShort" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Krótki opis (na kartę na stronie głównej)
          </label>
          <input
            id="bioShort"
            type="text"
            value={bioShort}
            onChange={(e) => setBioShort(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            Bio (pełny tekst)
          </label>
          <textarea
            id="bio"
            rows={6}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="avatarUrl" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            URL avatara (zdjęcie)
          </label>
          <input
            id="avatarUrl"
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="githubUrl" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            URL GitHub
          </label>
          <input
            id="githubUrl"
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
          />
        </div>
        <div>
          <label htmlFor="linkedinUrl" className="block text-sm font-medium text-[var(--color-muted)] mb-1">
            URL LinkedIn
          </label>
          <input
            id="linkedinUrl"
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/..."
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
