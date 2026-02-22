import { useScroll, useTransform, useReducedMotion, motion } from 'framer-motion'

/**
 * Cienki pasek u góry strony pokazujący postęp scrollu (w %).
 * Przy prefers-reduced-motion ukryty.
 */
export default function ScrollProgress() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, (v) => `${v * 100}%`)

  if (reducedMotion) return null

  return (
    <motion.div
      className="fixed top-0 left-0 h-[3px] z-[100] bg-[var(--color-accent)]"
      style={{ width }}
      aria-hidden
    />
  )
}
