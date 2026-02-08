import { motion } from 'framer-motion'

/**
 * Strona O mnie – bio, zdjęcie/avatar, umiejętności, kontakt.
 */
export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        O mnie
      </motion.h1>

      <motion.section
        className="flex flex-col sm:flex-row gap-8 items-start mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Placeholder na avatar – możesz podmienić na zdjęcie */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] text-4xl shrink-0">
          ?
        </div>
        <div>
          <p className="text-[var(--color-muted)] leading-relaxed mb-4">
            Tutaj możesz dodać krótkie bio: kim jesteś, czym się zajmujesz i co Cię inspiruje.
          </p>
          <p className="text-[var(--color-muted)] leading-relaxed">
            Umiejętności, technologie i doświadczenie – kilka zdań lub lista.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Kontakt</h2>
        <ul className="space-y-2 text-[var(--color-muted)]">
          <li>
            <a href="mailto:twoj@email.pl" className="text-[var(--color-accent)] hover:underline">
              twoj@email.pl
            </a>
          </li>
          <li>
            <a href="https://github.com/CtrlAltStudent" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">
              GitHub
            </a>
          </li>
          <li>
            <a href="#" className="text-[var(--color-accent)] hover:underline">
              LinkedIn (opcjonalnie)
            </a>
          </li>
        </ul>
      </motion.section>
    </div>
  )
}
