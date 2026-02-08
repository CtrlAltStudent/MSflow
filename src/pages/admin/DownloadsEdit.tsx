import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { DownloadItem } from '../../types/content'

const BUCKET = 'downloads'

/**
 * Edycja Pobieralni – dodawanie, edycja, usuwanie; upload pliku do Storage.
 */
export default function AdminDownloadsEdit() {
  const [list, setList] = useState<DownloadItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    id: '',
    name: '',
    version: '',
    description: '',
    fileUrl: '',
    fileSize: '',
    date: '',
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const load = () => {
    if (!supabase) return
    supabase
      .from('content')
      .select('value')
      .eq('key', 'downloads')
      .maybeSingle()
      .then(({ data }) => {
        setList((data?.value as DownloadItem[]) ?? [])
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
      name: '',
      version: '',
      description: '',
      fileUrl: '',
      fileSize: '',
      date: new Date().toISOString().slice(0, 10),
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const startEdit = (d: DownloadItem) => {
    setEditingId(d.id)
    setForm({
      id: d.id,
      name: d.name,
      version: d.version,
      description: d.description,
      fileUrl: d.fileUrl,
      fileSize: d.fileSize,
      date: d.date,
    })
  }

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!supabase) return null
    setUploading(true)
    const name = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from(BUCKET).upload(name, file, { upsert: true })
    setUploading(false)
    if (error) {
      setMessage(error.message)
      return null
    }
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
    return urlData.publicUrl
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadFile(file)
    if (url) {
      setForm((f) => ({
        ...f,
        fileUrl: url,
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
      }))
    }
  }

  const saveRow = async () => {
    if (!supabase) return
    setSaving(true)
    setMessage(null)
    const id = form.id.trim() || crypto.randomUUID().slice(0, 8)
    const newItem: DownloadItem = {
      id,
      name: form.name.trim(),
      version: form.version.trim() || '1.0.0',
      description: form.description.trim(),
      fileUrl: form.fileUrl.trim(),
      fileSize: form.fileSize.trim() || '—',
      date: form.date.trim() || new Date().toISOString().slice(0, 10),
    }
    let newList: DownloadItem[]
    if (editingId) {
      newList = list.map((p) => (p.id === editingId ? newItem : p))
      if (editingId !== id) newList = newList.filter((p) => p.id !== editingId)
    } else {
      newList = [...list.filter((p) => p.id !== id), newItem]
    }
    const { error } = await supabase.from('content').upsert({ key: 'downloads', value: newList }, { onConflict: 'key' })
    setSaving(false)
    setMessage(error ? error.message : 'Zapisano.')
    if (!error) {
      load()
      setEditingId(null)
      startAdd()
    }
  }

  const deleteRow = async (id: string) => {
    if (!supabase || !confirm('Usunąć tę pozycję?')) return
    const newList = list.filter((p) => p.id !== id)
    await supabase.from('content').upsert({ key: 'downloads', value: newList }, { onConflict: 'key' })
    load()
    if (editingId === id) setEditingId(null)
  }

  if (loading) return <p className="text-[var(--color-muted)]">Ładowanie…</p>

  return (
    <>
      <Link to="/admin" className="text-sm text-[var(--color-accent)] hover:underline mb-6 inline-block">
        ← Panel admina
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">Pobieralnia</h1>

      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">
            {editingId ? 'Edycja pozycji' : 'Nowa pozycja'}
          </h2>
          <div className="grid gap-3 max-w-xl">
            <input
              placeholder="ID"
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              placeholder="Nazwa"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              placeholder="Wersja"
              value={form.version}
              onChange={(e) => setForm((f) => ({ ...f, version: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <textarea
              placeholder="Opis"
              rows={2}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <div>
              <label className="block text-sm text-[var(--color-muted)] mb-1">Plik do pobrania</label>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
                className="block w-full text-sm text-[var(--color-muted)]"
              />
              {uploading && <span className="text-sm text-[var(--color-muted)]">Wgrywanie…</span>}
            </div>
            <input
              placeholder="URL pliku (lub po uploadzie wypełni się automatycznie)"
              value={form.fileUrl}
              onChange={(e) => setForm((f) => ({ ...f, fileUrl: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              placeholder="Rozmiar (np. 2.5 MB)"
              value={form.fileSize}
              onChange={(e) => setForm((f) => ({ ...f, fileSize: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
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
          {list.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
            >
              <span className="font-medium text-[var(--color-text)]">{d.name}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(d)}
                  className="text-sm text-[var(--color-accent)] hover:underline"
                >
                  Edytuj
                </button>
                <button
                  type="button"
                  onClick={() => deleteRow(d.id)}
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
            + Dodaj pozycję
          </button>
        )}
      </div>
      {message && <p className="mt-4 text-sm text-[var(--color-muted)]">{message}</p>}
    </>
  )
}
