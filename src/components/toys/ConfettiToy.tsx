import { useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#059669', '#ea580c', '#ca8a04', '#0891b2']
const COUNT = 70

interface Piece {
  id: number
  x: number
  color: string
  size: number
  rotation: number
  duration: number
  delay: number
  drift: number
}

function createPieces(): Piece[] {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 120,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
    size: 6 + Math.random() * 8,
    rotation: (Math.random() - 0.5) * 720,
    duration: 2 + Math.random() * 1.5,
    delay: Math.random() * 0.3,
    drift: (Math.random() - 0.5) * 80,
  }))
}

/**
 * Zabawka: przycisk wystrzeliwuje confetti (DOM + Framer Motion).
 * Przy prefers-reduced-motion: mniej elementów, prostsza animacja.
 */
export default function ConfettiToy() {
  const reducedMotion = useReducedMotion()
  const [pieces, setPieces] = useState<Piece[] | null>(null)
  const [key, setKey] = useState(0)

  const fire = useCallback(() => {
    setPieces(reducedMotion ? createPieces().slice(0, 20) : createPieces())
    setKey((k) => k + 1)
    setTimeout(() => setPieces(null), 4000)
  }, [reducedMotion])

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        type="button"
        onClick={fire}
        className="px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-medium shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-[var(--color-accent)]/40 transition-shadow min-h-[44px]"
      >
        Wystrzel confetti
      </button>
      <p className="text-sm text-[var(--color-muted)]">
        Kliknij przycisk – kolorowe confetti posypie się w dół.
      </p>
      {/* Kontener względem którego leci confetti */}
      <div className="relative w-full h-64 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] overflow-hidden">
        {pieces?.map((p) => (
          <motion.div
            key={`${key}-${p.id}`}
            className="absolute left-1/2 top-0 rounded-sm will-change-transform"
            style={{
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              x: -p.size / 2,
            }}
            initial={{ y: 0, x: -p.size / 2, rotate: 0, opacity: 1 }}
            animate={{
              y: reducedMotion ? 180 : 280,
              x: -p.size / 2 + p.drift,
              rotate: reducedMotion ? 0 : p.rotation,
              opacity: 0,
            }}
            transition={{
              duration: reducedMotion ? 1.2 : p.duration,
              delay: p.delay,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>
    </div>
  )
}
