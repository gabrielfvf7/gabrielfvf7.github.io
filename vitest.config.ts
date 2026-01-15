/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    css: true,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules/',
      'dist/',
      'public/',
      'win32.run-main/',
      '**/*.spec.js'
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/setup.ts',
        'dist/',
        'public/',
        'win32.run-main/',
      ],
    },
  },
})