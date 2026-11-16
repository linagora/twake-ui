import { defineConfig } from 'vitest/config'

// Bundles a consumer of dist/: run through `npm run test:bundle`, which builds
// first, so the specs never read a missing or stale dist/
export default defineConfig({
  test: {
    name: 'bundle',
    include: ['test/bundle/**/*.test.ts'],
    environment: 'node'
  }
})
