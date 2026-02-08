import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import { useContent } from '../hooks/useContent'
import HeroBackground from '../components/HeroBackground'
import ParticleBackground from '../components/ParticleBackground'
import FloatingElements from '../components/FloatingElements'
import { IconUser, IconProjects, IconDownload } from '../components/icons/SectionIcons'

/** Opóźnienia i warianty animacji wejścia */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

/** Litera po literze – „Blackframe” */
const titleLetters = 'Blackframe'.split('')

/**
 * Strona główna – Hero z żywym tłem (orby + cząsteczki), gradient na tytule, parallax, CTA i karty (dane z useContent).
 */
export default function Home() {
  const { data: home } = useContent('home')
  const { data: about } = useContent('about')
  const reducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 80])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, reducedMotion ? 1 : 0.98])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, reducedMotion ? 1 : 0.7])

  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 })
  const btnRef = useRef<HTMLDivElement>(null)
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !btnRef.current) return
      const rect = btnRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      setMagnetic({ x: dx * 6, y: dy * 4 })
    },
    [reducedMotion]
  )
  const onMouseLeave = useCallback(() => setMagnetic({ x: 0, y: 0 }), [])

  return (
    <>
      {/* Hero – powitanie, nazwa Blackframe, tło z orbami i cząsteczkami; parallax przy scrollu */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4"
      >
        {!reducedMotion && <ParticleBackground />}
        <HeroBackground />
        {!reducedMotion && <FloatingElements />}

        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-3xl mx-auto px-6 py-10 rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-bg)]/40 backdrop-blur-sm shadow-[0_0_60px_-12px_rgba(59,130,246,0.15)]"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={item}
            className={`text-[var(--color-accent)] font-medium text-sm sm:text-base uppercase tracking-widest ${about?.openToWork ? 'mb-2' : 'mb-4'}`}
          >
            {home?.greeting
              ? home.greeting
              : about?.name
                ? `Cześć, jestem ${about.name}${about.role ? ` · ${about.role}` : ''}`
                : (home?.tagline ?? 'msflow.pl')}
          </motion.p>
          {about?.openToWork && (
            <motion.span
              variants={item}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/40 mb-4"
            >
              Szukam współpracy
            </motion.span>
          )}
          <motion.h1
            variants={container}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 flex flex-wrap justify-center gap-0.5 sm:gap-1"
          >
            {titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                variants={item}
                className="gradient-text-hero animate-gradient-text inline-block"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            variants={item}
            className="text-[var(--color-muted)] text-lg sm:text-xl mb-10"
          >
            {home?.subtitle ?? 'Strona wizytówkowa i portfolio. Projekty, aplikacje do pobrania i więcej.'}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
            <motion.div
              ref={btnRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{ x: magnetic.x, y: magnetic.y }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                to="/o-mnie"
                className="inline-block px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-medium shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-[var(--color-accent)]/40 transition-shadow"
              >
                O mnie
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/o-mnie#kontakt"
                className="inline-block px-6 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-accent)]/50 text-[var(--color-text)] font-medium hover:bg-[var(--color-accent)]/10 transition-colors"
              >
                Kontakt
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/projekty"
                className="inline-block px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-medium hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all"
              >
                Projekty
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/pobieralnia"
                className="inline-block px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-medium hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all"
              >
                Pobieralnia
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Pasek marquee – przewijane technologie */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]/50 overflow-hidden py-4" aria-hidden>
        <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform">
          <span className="text-[var(--color-muted)] text-sm font-medium shrink-0">
            React • TypeScript • Vite • Tailwind CSS • Framer Motion • msflow.pl
          </span>
          <span className="text-[var(--color-muted)] text-sm font-medium shrink-0">
            React • TypeScript • Vite • Tailwind CSS • Framer Motion • msflow.pl
          </span>
        </div>
      </section>

      {/* Sekcje pod Hero – karty z ikonami i akcentem */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-[var(--color-border)] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent" aria-hidden />
        <div className="grid sm:grid-cols-3 gap-8">
          <motion.div
            className="group relative p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer overflow-hidden border-l-4 border-l-[var(--color-accent)]"
            initial={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{
              y: -6,
              borderColor: 'rgba(59,130,246,0.4)',
              boxShadow: '0 24px 48px -16px rgba(59,130,246,0.25)',
            }}
          >
            <Link to="/o-mnie" className="block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)]/25 transition-colors">
                  <IconUser />
                </div>
                {about?.avatarUrl ? (
                  <img
                    src={about.avatarUrl}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[var(--color-border)]"
                  />
                ) : null}
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-[var(--color-text)]">
                    {about?.name || 'Kim jestem'}
                  </h2>
                  <p className="text-[var(--color-muted)] text-sm truncate">
                    {about?.role || about?.bioShort || 'Kilka słów o mnie i kontakcie.'}
                  </p>
                </div>
              </div>
              <span className="text-[var(--color-accent)] font-medium text-sm hover:underline inline-flex items-center gap-1">
                Przejdź do O mnie →
              </span>
            </Link>
          </motion.div>
          <motion.div
            className="group relative p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer overflow-hidden border-l-4 border-l-[var(--color-accent)]"
            initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{
              y: -6,
              borderColor: 'rgba(59,130,246,0.4)',
              boxShadow: '0 24px 48px -16px rgba(59,130,246,0.25)',
            }}
          >
            <Link to="/projekty" className="block">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]/25 transition-colors">
                <IconProjects />
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Projekty</h2>
              <p className="text-[var(--color-muted)] text-sm mb-4">
                Przeglądaj repozytoria, demo i opisy projektów.
              </p>
              <span className="text-[var(--color-accent)] font-medium text-sm hover:underline">
                Zobacz projekty →
              </span>
            </Link>
          </motion.div>
          <motion.div
            className="group relative p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer overflow-hidden border-l-4 border-l-[var(--color-accent)]"
            initial={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              y: -6,
              borderColor: 'rgba(59,130,246,0.4)',
              boxShadow: '0 24px 48px -16px rgba(59,130,246,0.25)',
            }}
          >
            <Link to="/pobieralnia" className="block">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]/25 transition-colors">
                <IconDownload />
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">Pobieralnia</h2>
              <p className="text-[var(--color-muted)] text-sm mb-4">
                Gotowe aplikacje i pliki do pobrania.
              </p>
              <span className="text-[var(--color-accent)] font-medium text-sm hover:underline">
                Pobierz →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
