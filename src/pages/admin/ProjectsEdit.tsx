import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { ProjectItem } from '../../types/content'

/**
 * Edycja listy projektów – dodawanie, edycja, usuwanie.
 */
export default function AdminProjectsEdit() {
  const [list, setList] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    technologies: '',
    repoUrl: '',
    demoUrl: '',
    image: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const load = () => {
    if (!supabase) return
    supabase
      .from('content')
      .select('value')
      .eq('key', 'projects')
      .maybeSingle()
      .then(({ data }) => {
        setList((data?.value as ProjectItem[]) ?? [])
        setLoading(false)
      })
  }

  useEffect(() => {
    load()
  }, [])

  const startAdd = () => {
    setEditingId(null)
    setForm({
      id: '',
      title: '',
      description: '',
      technologies: '',
      repoUrl: '',
      demoUrl: '',
      image: '',
    })
  }

  const startEdit = (p: ProjectItem) => {
    setEditingId(p.id)
    setForm({
      id: p.id,
      title: p.title,
      description: p.description,
      technologies: (p.technologies ?? []).join(', '),
      repoUrl: p.repoUrl ?? '',
      demoUrl: p.demoUrl ?? '',
      image: p.image ?? '',
    })
  }

  const saveRow = async () => {
    if (!supabase) return
    setSaving(true)
    setMessage(null)
    const id = form.id.trim() || crypto.randomUUID().slice(0, 8)
    const techs = form.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    const newItem: ProjectItem = {
      id,
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: techs,
      repoUrl: form.repoUrl.trim() || null,
      demoUrl: form.demoUrl.trim() || null,
      image: form.image.trim() || null,
    }
    let newList: ProjectItem[]
    if (editingId) {
      newList = list.map((p) => (p.id === editingId ? newItem : p))
      if (editingId !== id) newList = newList.filter((p) => p.id !== editingId)
    } else {
      newList = [...list.filter((p) => p.id !== id), newItem]
    }
    const { error } = await supabase.from('content').upsert({ key: 'projects', value: newList }, { onConflict: 'key' })
    setSaving(false)
    setMessage(error ? error.message : 'Zapisano.')
    if (!error) {
      load()
      setEditingId(null)
      startAdd()
    }
  }

  const deleteRow = async (id: string) => {
    if (!supabase || !confirm('Usunąć ten projekt?')) return
    const newList = list.filter((p) => p.id !== id)
    await supabase.from('content').upsert({ key: 'projects', value: newList }, { onConflict: 'key' })
    load()
    if (editingId === id) setEditingId(null)
  }

  if (loading) return <p className="text-[var(--color-muted)]">Ładowanie…</p>

  return (
    <>
      <Link to="/admin" className="text-sm text-[var(--color-accent)] hover:underline mb-6 inline-block">
        ← Panel admina
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">Projekty</h1>

      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
            {editingId ? 'Edycja projektu' : 'Nowy projekt'}
          </h2>
          <div className="grid gap-3 max-w-xl">
            <input
              placeholder="ID (np. msflow)"
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              placeholder="Tytuł"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <textarea
              placeholder="Opis"
              rows={2}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              placeholder="Technologie (oddzielone przecinkami)"
              value={form.technologies}
              onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              placeholder="URL repozytorium"
              value={form.repoUrl}
              onChange={(e) => setForm((f) => ({ ...f, repoUrl: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              placeholder="URL demo"
              value={form.demoUrl}
              onChange={(e) => setForm((f) => ({ ...f, demoUrl: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              placeholder="URL obrazka"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={saveRow}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium disabled:opacity-50"
              >
                {saving ? 'Zapisywanie…' : editingId ? 'Zapisz zmiany' : 'Dodaj'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={startAdd}
                  className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text)]"
                >
                  Anuluj
                </button>
              )}
            </div>
          </div>
        </div>

        <ul className="space-y-2">
          {list.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
            >
              <span className="font-medium text-[var(--color-text)]">{p.title}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="text-sm text-[var(--color-accent)] hover:underline"
                >
                  Edytuj
                </button>
                <button
                  type="button"
                  onClick={() => deleteRow(p.id)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
        {!editingId && (
          <button
            type="button"
            onClick={startAdd}
            className="px-4 py-2 rounded-lg border border-dashed border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
          >
            + Dodaj projekt
          </button>
        )}
      </div>
      {message && <p className="mt-4 text-sm text-[var(--color-muted)]">{message}</p>}
    </>
  )
}
