import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  //remover server pois foi incluido para teste ps deletar cloudflare tambem
  server: {
    allowedHosts: true
  }
})
