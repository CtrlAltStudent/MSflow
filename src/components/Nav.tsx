import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const linki = [
  { to: '/', label: 'Start' },
  { to: '/o-mnie', label: 'O mnie' },
  { to: '/projekty', label: 'Projekty' },
  { to: '/pobieralnia', label: 'Pobieralnia' },
  { to: '/o-mnie#kontakt', label: 'Kontakt' },
] as const

/**
 * Nawigacja główna – linki do sekcji, aktywny stan.
 */
export default function Nav() {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        <Link to="/" className="text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
          Blackframe
        </Link>
        <ul className="flex gap-1 sm:gap-4">
          {linki.map(({ to, label }) => {
            const active =
              to === '/o-mnie#kontakt'
                ? location.pathname === '/o-mnie' && location.hash === '#kontakt'
                : to === '/o-mnie'
                  ? location.pathname === '/o-mnie' && location.hash !== '#kontakt'
                  : location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <li key={to}>
                <motion.div whileHover={{ y: -2 }} className="relative">
                  <Link
                    to={to}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors block ${
                      active ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-0 rounded-md bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </Link>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
