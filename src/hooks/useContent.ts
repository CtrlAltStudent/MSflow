import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { AboutContent, HomeContent, ProjectItem, DownloadItem, ContentKey } from '../types/content'
import projectsFallback from '../data/projects.json'
import downloadsFallback from '../data/downloads.json'

const defaultAbout: AboutContent = {
  bio: 'Tutaj możesz dodać krótkie bio: kim jesteś, czym się zajmujesz i co Cię inspiruje.\n\nUmiejętności, technologie i doświadczenie – kilka zdań lub lista.',
  bioShort: 'Kilka słów o mnie, umiejętnościach i kontakcie.',
  avatarUrl: '',
  email: 'twoj@email.pl',
  githubUrl: 'https://github.com/CtrlAltStudent',
  linkedinUrl: '',
  name: '',
  role: '',
  location: '',
  experienceYears: '',
  openToWork: false,
  skills: [],
}

const defaultHome: HomeContent = {
  tagline: 'msflow.pl',
  subtitle: 'Strona wizytówkowa i portfolio. Projekty, aplikacje do pobrania i więcej.',
  greeting: '',
}

type ContentMap = {
  about: AboutContent
  home: HomeContent
  projects: ProjectItem[]
  downloads: DownloadItem[]
}

const fallbacks: ContentMap = {
  about: defaultAbout,
  home: defaultHome,
  projects: projectsFallback as ProjectItem[],
  downloads: downloadsFallback as DownloadItem[],
}

export function useContent<K extends ContentKey>(key: K) {
  const [data, setData] = useState<ContentMap[K] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setData(fallbacks[key])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    supabase
      .from('content')
      .select('value')
      .eq('key', key)
      .maybeSingle()
      .then(({ data: row, error: err }) => {
        if (cancelled) return
        if (err) {
          setError(err)
          setData(fallbacks[key])
        } else if (row?.value != null) {
          setData(row.value as ContentMap[K])
        } else {
          setData(fallbacks[key])
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [key])

  return { data: data ?? fallbacks[key], loading, error }
}
