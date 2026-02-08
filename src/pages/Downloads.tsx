import { motion } from 'framer-motion'
import downloadsData from '../data/downloads.json'

/** Typ pojedynczego wpisu z downloads.json */
type DownloadItem = {
  id: string
  name: string
  version: string
  description: string
  fileUrl: string
  fileSize: string
  date: string
}

/**
 * Strona Pobieralnia – karty aplikacji z przyciskiem Pobierz (link do pliku).
 */
export default function Downloads() {
  const items = downloadsData as DownloadItem[]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Pobieralnia
      </motion.h1>

      <ul className="grid sm:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 flex flex-col"
          >
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-1">{item.name}</h2>
            <p className="text-[var(--color-muted)] text-sm mb-2">Wersja {item.version} · {item.date}</p>
            <p className="text-[var(--color-muted)] text-sm mb-4 flex-1">{item.description}</p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-[var(--color-muted)]">Rozmiar: {item.fileSize}</span>
              <a
                href={item.fileUrl}
                download
                className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Pobierz
              </a>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
