import { motion } from 'framer-motion'
import { useContent } from '../hooks/useContent'
import type { ProjectItem } from '../types/content'

/**
 * Placeholder gdy projekt nie ma obrazka – siatka + akcent + ikona kodu.
 */
function ProjectImagePlaceholder() {
  return (
    <div
      className="w-full h-44 sm:h-48 flex items-center justify-center rounded-t-xl border-b border-[var(--color-border)] relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 50%),
          linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 20px 20px, 20px 20px',
      }}
      aria-hidden
    >
      <svg
        className="w-14 h-14 text-[var(--color-accent)] opacity-40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </div>
  )
}

/**
 * Strona Projekty – karty z obrazkiem u góry (lub placeholderem), tytuł, opis, technologie, linki.
 */
export default function Projects() {
  const { data: projects, loading } = useContent('projects')

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <p className="text-[var(--color-muted)]">Ładowanie…</p>
      </div>
    )
  }

  const list = (projects ?? []) as ProjectItem[]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-8 section-title-accent"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Projekty
      </motion.h1>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((project, i) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent)]/40 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 transition-all"
          >
            {project.image ? (
              <img
                src={project.image}
                alt=""
                className="w-full h-44 sm:h-48 object-cover rounded-t-xl border-b border-[var(--color-border)]"
              />
            ) : (
              <ProjectImagePlaceholder />
            )}
            <div className="p-5 border-l-4 border-l-transparent group-hover:border-l-[var(--color-accent)]/60 transition-colors">
              <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">{project.title}</h2>
              <p className="text-[var(--color-muted)] text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(project.technologies ?? []).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs bg-[var(--color-bg)] text-[var(--color-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    Repozytorium
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
