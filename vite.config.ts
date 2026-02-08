import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Konfiguracja Vite – Blackframe / msflow.pl
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
