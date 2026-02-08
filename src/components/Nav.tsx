import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const linki = [
  { to: '/', label: 'Start' },
  { to: '/o-mnie', label: 'O mnie' },
  { to: '/projekty', label: 'Projekty' },
  { to: '/pobieralnia', label: 'Pobieralnia' },
  { to: '/o-mnie#kontakt', label: 'Kontakt' },
] as const

/**
 * Nawigacja – desktop: linki w linii; mobile: hamburger i rozwijane menu (pro-uzytkownik).
 */
export default function Nav() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (to: string) =>
    to === '/o-mnie#kontakt'
      ? location.pathname === '/o-mnie' && location.hash === '#kontakt'
      : to === '/o-mnie'
        ? location.pathname === '/o-mnie' && location.hash !== '#kontakt'
        : location.pathname === to || (to !== '/' && location.pathname.startsWith(to))

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16 min-h-[44px] sm:min-h-0">
        <Link
          to="/"
          className="text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-2"
        >
          Blackframe
        </Link>

        {/* Desktop: linki w linii */}
        <ul className="hidden sm:flex gap-1 md:gap-4">
          {linki.map(({ to, label }) => (
            <li key={to}>
              <motion.div whileHover={{ y: -2 }} className="relative">
                <Link
                  to={to}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors block min-touch sm:min-h-0 sm:min-w-0 ${
                    isActive(to) ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {label}
                  {isActive(to) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-0 rounded-md bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>

        {/* Mobile: przycisk hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="sm:hidden min-touch flex flex-col justify-center gap-1.5 w-11 h-11 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-border)]/50 transition-colors"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        >
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </div>

      {/* Mobile: rozwijane menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <ul className="px-4 py-3 flex flex-col gap-0">
              {linki.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 px-3 rounded-lg text-base font-medium min-touch flex items-center ${
                      isActive(to) ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'text-[var(--color-text)]'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
