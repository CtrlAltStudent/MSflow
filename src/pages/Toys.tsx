import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ConfettiToy from '../components/toys/ConfettiToy'
import CursorTrail from '../components/toys/CursorTrail'
import GradientClock from '../components/toys/GradientClock'
import MemoryGame from '../components/toys/MemoryGame'

export type ToyId = 'confetti' | 'cursor-trail' | 'gradient-clock' | 'memory' | null

const toys: { id: ToyId; title: string; description: string; icon: string }[] = [
  { id: 'confetti', title: 'Confetti', description: 'Wystrzel kolorowe confetti.', icon: '🎉' },
  { id: 'cursor-trail', title: 'Ślad kursora', description: 'Ruch myszy zostawia ślad (desktop).', icon: '✨' },
  { id: 'gradient-clock', title: 'Zegar gradientowy', description: 'Zegar z tłem zmieniającym się w czasie.', icon: '🕐' },
  { id: 'memory', title: 'Memory', description: 'Klasyczna gra w pary – znajdź pasujące karty.', icon: '🃏' },
]

/**
 * Strona Zabawki – eksperymentalne efekty wizualne i minigry.
 */
export default function Toys() {
  const [selectedToy, setSelectedToy] = useState<ToyId>(null)

  const renderToy = () => {
    switch (selectedToy) {
      case 'confetti':
        return <ConfettiToy />
      case 'cursor-trail':
        return <CursorTrail />
      case 'gradient-clock':
        return <GradientClock />
      case 'memory':
        return <MemoryGame />
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20">
      <motion.header
        className="mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-2 section-title-accent">
          Zabawki
        </h1>
        <p className="text-[var(--color-muted)] max-w-2xl">
          Eksperymentalne efekty wizualne i minigry. Kliknij kartę, żeby uruchomić.
        </p>
      </motion.header>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {toys.map(({ id, title, description, icon }) => (
          <motion.button
            key={id}
            type="button"
            onClick={() => setSelectedToy(id)}
            className="text-left p-5 sm:p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-[var(--color-accent)]/10 transition-all border-l-4 border-l-[var(--color-accent)]/50"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <span className="text-3xl mb-3 block" aria-hidden>{icon}</span>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-1">{title}</h2>
            <p className="text-sm text-[var(--color-muted)]">{description}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Modal / overlay z wybraną zabawką */}
      <AnimatePresence>
        {selectedToy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedToy(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.25 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <h2 className="text-xl font-semibold text-[var(--color-text)]">
                  {toys.find((t) => t.id === selectedToy)?.title ?? ''}
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedToy(null)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-border)]/50 hover:text-[var(--color-text)] transition-colors"
                  aria-label="Zamknij"
                >
                  <span className="text-2xl leading-none">×</span>
                </button>
              </div>
              <div className="p-4 sm:p-6">{renderToy()}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
