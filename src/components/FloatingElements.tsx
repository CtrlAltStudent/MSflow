import { useReducedMotion } from 'framer-motion'

/** Pozycje i parametry przelatujących elementów (ikony/kształty) */
const elements = [
  { left: '5%', top: '15%', size: 48, duration: 18, delay: 0, blur: 0 },
  { left: '85%', top: '25%', size: 32, duration: 22, delay: -3, blur: 2 },
  { left: '20%', top: '70%', size: 40, duration: 20, delay: -6, blur: 1 },
  { left: '75%', top: '60%', size: 28, duration: 24, delay: -2, blur: 0 },
  { left: '50%', top: '20%', size: 24, duration: 16, delay: -8, blur: 1 },
  { left: '10%', top: '50%', size: 36, duration: 26, delay: -4, blur: 2 },
  { left: '90%', top: '45%', size: 44, duration: 19, delay: -1, blur: 0 },
  { left: '30%', top: '85%', size: 30, duration: 21, delay: -5, blur: 1 },
  { left: '60%', top: '75%', size: 26, duration: 23, delay: -7, blur: 0 },
  { left: '40%', top: '35%', size: 34, duration: 17, delay: -9, blur: 2 },
]

/**
 * Przelatujące obiekty w Hero – kształty z animacją (floating); przy reduced-motion bez animacji.
 */
export default function FloatingElements() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {elements.map((el, i) => (
        <div
          key={i}
          className="absolute text-[var(--color-accent)]"
          style={{
            left: el.left,
            top: el.top,
            width: el.size,
            height: el.size,
            opacity: 0.5,
            filter: el.blur ? `blur(${el.blur}px)` : undefined,
            animation: reducedMotion ? 'none' : `float-drift ${el.duration}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {/* Kształty wyraźne na jasnym tle */}
          {i % 2 === 0 ? (
            <div
              className="w-full h-full rounded-full border-2 border-current"
              style={{ borderColor: 'rgba(37, 99, 235, 0.55)' }}
            />
          ) : (
            <div
              className="w-full h-full rounded-lg border-2 border-current rotate-45"
              style={{ borderColor: 'rgba(99, 102, 241, 0.5)' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
