import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKonamiCode } from '../hooks/useKonamiCode'

const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#059669', '#ea580c']
const COUNT = 50

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
    x: (Math.random() - 0.5) * 200,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
    size: 6 + Math.random() * 6,
    rotation: (Math.random() - 0.5) * 360,
    duration: 2 + Math.random() * 1,
    delay: Math.random() * 0.2,
    drift: (Math.random() - 0.5) * 100,
  }))
}

/**
 * Easter egg: po wpisaniu kodu Konami (↑↑↓↓←→←→BA) – confetti + "Thank you!".
 */
export default function KonamiEgg() {
  const triggered = useKonamiCode()
  const [pieces, setPieces] = useState<Piece[] | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (!triggered) return
    setPieces(createPieces())
    setShowMessage(true)
    const t = setTimeout(() => setShowMessage(false), 3500)
    const t2 = setTimeout(() => setPieces(null), 4500)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [triggered])

  if (!pieces?.length && !showMessage) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]" aria-hidden>
      {pieces?.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/4 rounded-sm will-change-transform"
          style={{
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            x: -p.size / 2 + p.x,
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: 400,
            x: -p.size / 2 + p.x + p.drift,
            rotate: p.rotation,
            opacity: 0,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
      <AnimatePresence>
        {showMessage && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[var(--color-accent)] bg-[var(--color-surface)]/90 px-6 py-3 rounded-xl shadow-lg border border-[var(--color-border)]"
          >
            Thank you! 🎉
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
