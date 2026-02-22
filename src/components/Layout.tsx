import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from './Nav'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'
import PageBackground from './PageBackground'

/** Czas przejścia między stronami (spójność z planem) */
const transitionDuration = 0.25

/**
 * Główny layout – nawigacja + zawartość + stopka z płynnym przejściem (AnimatePresence).
 */
export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <ScrollProgress />
      <Nav />
      <main className="flex-1 overflow-x-hidden relative">
        {location.pathname !== '/' && <PageBackground />}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: transitionDuration, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
