import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/** Klient Supabase – tylko gdy skonfigurowane zmienne środowiskowe */
export const supabase =
  url && anonKey
    ? createClient(url, anonKey)
    : (null as ReturnType<typeof createClient> | null)

export const isSupabaseConfigured = Boolean(url && anonKey)
