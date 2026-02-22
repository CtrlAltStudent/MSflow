import { useState, useEffect } from 'react'

/**
 * Zegar (HH:MM:SS) z tłem wypełnionym gradientem zależnym od czasu.
 * Kąt gradientu obraca się w czasie; kolory w odcieniach akcentu.
 */
export default function GradientClock() {
  const [time, setTime] = useState(() => new Date())
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      setTime(now)
      setAngle((now.getSeconds() * 6 + now.getMilliseconds() * 0.006) % 360)
    }, 50)
    return () => clearInterval(id)
  }, [])

  const h = time.getHours()
  const m = time.getMinutes()
  const s = time.getSeconds()
  const str = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm text-[var(--color-muted)]">
        Tło gradientu obraca się w czasie (zgodnie z sekundami).
      </p>
      <div
        className="w-full max-w-sm aspect-square rounded-2xl flex items-center justify-center border-2 border-[var(--color-border)] overflow-hidden transition-[background] duration-300 ease-linear"
        style={{
          background: `linear-gradient(${angle}deg, #2563eb 0%, #7c3aed 35%, #db2777 65%, #0891b2 100%)`,
        }}
      >
        <div className="bg-[var(--color-surface)]/95 backdrop-blur px-6 py-4 rounded-xl border border-[var(--color-border)] shadow-lg">
          <span
            className="text-4xl sm:text-5xl font-bold tabular-nums tracking-wider"
            style={{
              background: `linear-gradient(${angle}deg, #2563eb, #7c3aed)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {str}
          </span>
        </div>
      </div>
    </div>
  )
}
