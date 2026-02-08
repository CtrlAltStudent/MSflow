/** Treść O mnie */
export interface AboutContent {
  bio?: string
  bioShort?: string
  avatarUrl?: string
  email?: string
  githubUrl?: string
  linkedinUrl?: string
  name?: string
  role?: string
  location?: string
  experienceYears?: string
  openToWork?: boolean
  skills?: string[]
}

/** Treść strony głównej */
export interface HomeContent {
  tagline?: string
  subtitle?: string
  greeting?: string
}

/** Pojedynczy projekt */
export interface ProjectItem {
  id: string
  title: string
  description: string
  technologies: string[]
  repoUrl: string | null
  demoUrl: string | null
  image: string | null
}

/** Pojedyncza pozycja w Pobieralni */
export interface DownloadItem {
  id: string
  name: string
  version: string
  description: string
  fileUrl: string
  fileSize: string
  date: string
}

export type ContentKey = 'about' | 'home' | 'projects' | 'downloads'
