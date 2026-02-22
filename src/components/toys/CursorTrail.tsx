import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const MAX_POINTS = 28
const THROTTLE_MS = 50

interface Point {
  id: number
  x: number
  y: number
}

/**
 * Ślad kursora – kropki znikające z opóźnieniem. Włączany przyciskiem; overlay przez portal.
 * Na mobile wyświetlana informacja zamiast aktywnego śladu.
 */
export default function CursorTrail() {
  const [active, setActive] = useState(false)
  const [points, setPoints] = useState<Point[]>([])
  const lastRef = useRef(0)
  const idRef = useRef(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (!active || isTouch) return
    const onMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastRef.current < THROTTLE_MS) return
      lastRef.current = now
      idRef.current += 1
      const id = idRef.current
      setPoints((prev) => {
        const next = [...prev, { id, x: e.clientX, y: e.clientY }]
        return next.slice(-MAX_POINTS)
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [active, isTouch])

  const removePoint = useCallback((id: number) => {
    setPoints((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const overlayContent =
    active && !isTouch ? (
      <div
        className="fixed inset-0 pointer-events-none z-[100]"
        aria-hidden
      >
        <AnimatePresence>
          {points.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-surface)]"
              style={{ left: p.x, top: p.y }}
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: 0.2, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onAnimationComplete={() => removePoint(p.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    ) : null

  return (
    <div className="flex flex-col items-center gap-6">
      {isTouch ? (
        <p className="text-[var(--color-muted)] text-center">
          Ślad kursora działa na urządzeniach z myszką (desktop). Na telefonie ta zabawka jest wyłączona.
        </p>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setActive((a) => !a)}
            className="px-6 py-3 rounded-xl border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-medium hover:bg-[var(--color-accent)]/10 transition-colors min-h-[44px]"
          >
            {active ? 'Wyłącz ślad' : 'Włącz ślad kursora'}
          </button>
          <p className="text-sm text-[var(--color-muted)] text-center">
            {active ? 'Ruszaj myszką – ślad znika po chwili.' : 'Włącz i poruszaj kursorem po stronie.'}
          </p>
        </>
      )}
      {typeof document !== 'undefined' && createPortal(overlayContent, document.body)}
    </div>
  )
}
