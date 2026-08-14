import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5092,
    allowedHosts: ['djanjan.cyberpunk.co.in', '.cyberpunk.co.in']
  }
})
