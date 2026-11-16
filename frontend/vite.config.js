import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Restaurante Legal',
        short_name: 'Restaurante SA - Cardápio',
        description: 'Faça seu pedido antecipado de forma rápida',
        orientation: 'portrait',
        theme_color: '#174f80',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/cardapio',
        scope: '/cardapio',
        includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  //remover server pois foi incluido para teste ps deletar cloudflare tambem
  server: {
    allowedHosts: true
  }
})
