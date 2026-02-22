import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SCROLL_THRESHOLD = 400

/**
 * Przycisk „Do góry” – pojawia się po przewinięciu, przewija do góry.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 hover:scale-105 active:scale-95 transition-shadow flex items-center justify-center"
          aria-label="Do góry"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
