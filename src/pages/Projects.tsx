import { motion } from 'framer-motion'
import projectsData from '../data/projects.json'

/** Typ pojedynczego projektu z JSON */
type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  repoUrl: string | null
  demoUrl: string | null
  image: string | null
}

/**
 * Strona Projekty – karty z listy projects.json (repo, demo, technologie).
 */
export default function Projects() {
  const projects = projectsData as Project[]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Projekty
      </motion.h1>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent)]/40 transition-colors"
          >
            <div className="p-5">
              <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">{project.title}</h2>
              <p className="text-[var(--color-muted)] text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
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
