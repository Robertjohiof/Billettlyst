import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // TICKETMASTER_API_KEY has no VITE_ prefix, so it is never bundled into the browser code
  const { TICKETMASTER_API_KEY } = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      // Same /api/ticketmaster proxy as the Cloudflare Worker in production
      proxy: {
        '/api/ticketmaster': {
          target: 'https://app.ticketmaster.com',
          changeOrigin: true,
          rewrite: (path) => {
            const rewritten = path.replace(/^\/api\/ticketmaster/, '/discovery')
            const separator = rewritten.includes('?') ? '&' : '?'
            return `${rewritten}${separator}apikey=${TICKETMASTER_API_KEY}`
          },
        },
      },
    },
  }
})
