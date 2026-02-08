import { motion } from 'framer-motion'
import { useContent } from '../hooks/useContent'
import { IconEmail, IconGitHub, IconLinkedIn } from '../components/icons/SectionIcons'

/** Ikona lokalizacji (pin) */
function LocationIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

/**
 * Strona O mnie – układ profilowy: name/role/location, avatar, bio, doświadczenie, skills, CTA Kontakt.
 */
export default function About() {
  const { data: about, loading } = useContent('about')

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <p className="text-[var(--color-muted)]">Ładowanie…</p>
      </div>
    )
  }

  const skills = about.skills ?? []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Nagłówek: imię i nazwisko (lub "O mnie"), rola, lokalizacja + akcent */}
      <motion.header
        className="mb-10 pb-6 border-b border-[var(--color-border)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-1 rounded-full bg-[var(--color-accent)] shrink-0 h-14 mt-1" aria-hidden />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-2">
              {about.name || 'O mnie'}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[var(--color-muted)]">
              {about.role && <span className="text-lg">{about.role}</span>}
              {about.location && (
                <span className="flex items-center gap-1.5">
                  <LocationIcon />
                  {about.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Blok profil: avatar (większy), bio z pionową kreską akcentu, lata doświadczenia */}
      <motion.section
        className="flex flex-col sm:flex-row gap-8 items-start mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {about.avatarUrl ? (
          <img
            src={about.avatarUrl}
            alt=""
            className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl object-cover shrink-0 border-2 border-[var(--color-accent)]/30 shadow-lg shadow-[var(--color-accent)]/10"
          />
        ) : (
          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] text-5xl shrink-0">
            ?
          </div>
        )}
        <div className="min-w-0 flex-1 pl-6 border-l-4 border-l-[var(--color-accent)]/60">
          <p className="text-[var(--color-muted)] leading-relaxed whitespace-pre-wrap mb-4">
            {about.bio || 'Tutaj możesz dodać krótkie bio (edycja w panelu admina).'}
          </p>
          {about.experienceYears && (
            <p className="inline-block px-4 py-2 rounded-lg bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-semibold">
              {about.experienceYears} lat doświadczenia
            </p>
          )}
        </div>
      </motion.section>

      {/* Doświadczenie obejmuje / Stack – chipy */}
      {skills.length > 0 && (
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Doświadczenie obejmuje</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg text-sm bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Kontakt – CTA + przyciski z ikonami */}
      <motion.section
        id="kontakt"
        className="mb-12 scroll-mt-24 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-[var(--color-accent)]" aria-hidden />
          Kontakt
        </h2>
        {about.email && (
          <a
            href={`mailto:${about.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-medium mb-6 hover:opacity-90 transition-opacity shadow-lg shadow-[var(--color-accent)]/25"
          >
            <IconEmail />
            Wyślij wiadomość
          </a>
        )}
        <div className="flex flex-wrap gap-3">
          {about.email && (
            <a
              href={`mailto:${about.email}`}
              title="E-mail"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-colors"
            >
              <IconEmail />
            </a>
          )}
          {about.githubUrl && (
            <a
              href={about.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-colors"
            >
              <IconGitHub />
            </a>
          )}
          {about.linkedinUrl && (
            <a
              href={about.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-colors"
            >
              <IconLinkedIn />
            </a>
          )}
        </div>
        {(about.email || about.githubUrl || about.linkedinUrl) && (
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            {about.email && <span>{about.email}</span>}
          </p>
        )}
      </motion.section>
    </div>
  )
}
