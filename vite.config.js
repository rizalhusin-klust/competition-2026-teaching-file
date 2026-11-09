import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/competition-2026-teaching-file/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
