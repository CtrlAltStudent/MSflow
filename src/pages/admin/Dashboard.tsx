import { Link } from 'react-router-dom'

const sections = [
  { to: '/admin/o-mnie', label: 'O mnie', desc: 'Bio, avatar, kontakt' },
  { to: '/admin/projekty', label: 'Projekty', desc: 'Lista projektów' },
  { to: '/admin/pobieralnia', label: 'Pobieralnia', desc: 'Pliki do pobrania' },
  { to: '/admin/strona-glowna', label: 'Strona główna', desc: 'Tagline i opis' },
] as const

/**
 * Dashboard panelu admina – linki do edycji sekcji.
 */
export default function AdminDashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-8">Panel admina</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map(({ to, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="block p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 transition-colors"
          >
            <h2 className="text-lg font-semibold text-[var(--color-text)]">{label}</h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
