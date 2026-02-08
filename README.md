# Blackframe | msflow.pl

Strona wizytówkowa i portfolio – [msflow.pl](https://msflow.pl).

## Technologie

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Framer Motion
- React Router

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Strona: http://localhost:5173

## Panel admina (localhost)

1. **Supabase** – załóż projekt na [supabase.com](https://supabase.com), w **SQL Editor** uruchom skrypt z `supabase/schema.sql`.
2. **Zmienne** – skopiuj `.env.example` do `.env` i uzupełnij (Supabase → Project Settings → API): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Zrestartuj `npm run dev`.
3. **Konto admina** – na stronie http://localhost:5173/admin/login kliknij „Zarejestruj konto admina”, wpisz e-mail i hasło (min. 6 znaków), zatwierdź. W Supabase w **Authentication → Providers → Email** możesz wyłączyć „Confirm email”, żeby logować się od razu bez potwierdzenia maila. Alternatywnie: **Authentication → Users → Add user** i utwórz użytkownika ręcznie.
4. Po zalogowaniu: http://localhost:5173/admin (O mnie, Projekty, Pobieralnia, Strona główna).

Jeśli pojawia się „Failed to fetch”, sprawdź poprawność adresu i klucza w `.env` oraz czy projekt Supabase nie jest w trybie pauzy.

## Build

```bash
npm run build
```

Wynik w folderze `dist/` – gotowy do wgrania na hosting (Netlify, Vercel lub inny).

## Struktura

- **Strona główna** – Hero, animacje, linki do sekcji
- **O mnie** – bio, kontakt
- **Projekty** – lista z `src/data/projects.json`
- **Pobieralnia** – aplikacje do pobrania z `src/data/downloads.json`; pliki w `public/downloads/`

## Repozytorium

[CtrlAltStudent/MSflow](https://github.com/CtrlAltStudent/MSflow)
