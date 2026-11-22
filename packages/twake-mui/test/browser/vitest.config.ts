import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

// Specs that need a real browser: computed styles under media queries, CSS
// animations, layout. jsdom evaluates none of them.
// Run: npx vitest run -c test/browser/vitest.config.ts
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

// A new object for each project: Vitest names the instances it is given
const makeBrowser = () => ({
  enabled: true,
  headless: true,
  // Playwright hides the scrollbars of headless Chromium; a spec drags one
  provider: playwright({
    launchOptions: { ignoreDefaultArgs: ['--hide-scrollbars'] }
  }),
  instances: [{ browser: 'chromium' as const }]
})

// Touch emulation cannot be undone (the pointer stays coarse, or becomes
// none): the touch specs run in a browser of their own
export default defineConfig({
  root,
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['test/browser/**/*.test.tsx'],
          exclude: ['test/browser/**/*-touch.test.tsx'],
          browser: makeBrowser()
        }
      },
      {
        extends: true,
        test: {
          name: 'browser-touch',
          include: ['test/browser/**/*-touch.test.tsx'],
          browser: makeBrowser()
        }
      }
    ]
  }
})
