import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

// Specs that need a real browser: computed styles under media queries, CSS
// animations, layout. jsdom evaluates none of them.
// Run: npx vitest run -c test/browser/vitest.config.ts
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export default defineConfig({
  root,
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  test: {
    name: 'browser',
    include: ['test/browser/**/*.test.tsx'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    }
  }
})
