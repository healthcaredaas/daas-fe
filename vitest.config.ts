import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['packages/*/src/**/*.{ts,vue}'],
      exclude: ['**/*.d.ts', '**/*.test.ts', '**/*.spec.ts']
    }
  },
  resolve: {
    alias: {
      '@daas-fe/core': resolve(__dirname, './packages/core/src'),
      '@daas-fe/components': resolve(__dirname, './packages/components/src')
    }
  }
})