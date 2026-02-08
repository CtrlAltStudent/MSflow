import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/** Opóźnienia i warianty animacji wejścia */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Strona główna – Hero i sekcje zapraszające (O mnie, Projekty, Pobieralnia).
 */
export default function Home() {
  return (
    <>
      {/* Hero – powitanie, nazwa Blackframe */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Tło – siatka + gradient */}
        <div className="absolute inset-0 bg-[var(--color-bg)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />

        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={item}
            className="text-[var(--color-accent)] font-medium text-sm sm:text-base uppercase tracking-widest mb-4"
          >
            msflow.pl
          </motion.p>
          <motion.h1
            variants={item}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-[var(--color-text)] tracking-tight mb-6"
          >
            Blackframe
          </motion.h1>
          <motion.p
            variants={item}
            className="text-[var(--color-muted)] text-lg sm:text-xl mb-10"
          >
            Strona wizytówkowa i portfolio. Projekty, aplikacje do pobrania i więcej.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/o-mnie"
              className="px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity"
            >
              O mnie
            </Link>
            <Link
              to="/projekty"
              className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-medium hover:bg-[var(--color-surface)] transition-colors"
            >
              Projekty
            </Link>
            <Link
              to="/pobieralnia"
              className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-medium hover:bg-[var(--color-surface)] transition-colors"
            >
              Pobieralnia
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Sekcje pod Hero – krótkie zaproszenia */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-[var(--color-border)]">
        <div className="grid sm:grid-cols-3 gap-8">
          <motion.div
            className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Kim jestem</h2>
            <p className="text-[var(--color-muted)] text-sm mb-4">
              Kilka słów o mnie, umiejętnościach i kontakcie.
            </p>
            <Link to="/o-mnie" className="text-[var(--color-accent)] font-medium text-sm hover:underline">
              Przejdź do O mnie →
            </Link>
          </motion.div>
          <motion.div
            className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Projekty</h2>
            <p className="text-[var(--color-muted)] text-sm mb-4">
              Przeglądaj repozytoria, demo i opisy projektów.
            </p>
            <Link to="/projekty" className="text-[var(--color-accent)] font-medium text-sm hover:underline">
              Zobacz projekty →
            </Link>
          </motion.div>
          <motion.div
            className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Pobieralnia</h2>
            <p className="text-[var(--color-muted)] text-sm mb-4">
              Gotowe aplikacje i pliki do pobrania.
            </p>
            <Link to="/pobieralnia" className="text-[var(--color-accent)] font-medium text-sm hover:underline">
              Pobierz →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
