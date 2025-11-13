import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/my_portfolio/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    assetsInlineLimit: 0,
  },
  server: {
    headers: {
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'X-Content-Type-Options': 'nosniff',
    },
  },
});
