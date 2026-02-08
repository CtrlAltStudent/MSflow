import { Link } from 'react-router-dom'

/**
 * Stopka – nazwa, domena, delikatna linia akcentu.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]/50 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <Link to="/" className="text-[var(--color-text)] font-semibold hover:text-[var(--color-accent)] transition-colors">
          Blackframe
        </Link>
        <span className="text-sm text-[var(--color-muted)]">
          msflow.pl · {year}
        </span>
      </div>
    </footer>
  )
}
