import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access
    port: 5173, // Ensure this matches your tunnel config
    strictPort: true, // Prevents port fallback
    cors: true, // Enables Cross-Origin Requests
    origin: 'https://hints-mirrors-thinking-hair.trycloudflare.com', // Allow requests from this Cloudflare URL
  },
})