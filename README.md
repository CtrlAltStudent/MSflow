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
