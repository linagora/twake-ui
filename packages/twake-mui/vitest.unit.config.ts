import { defineConfig } from 'vitest/config'

// Unit tests only, for npm test: vitest.config.ts would also load the
// storybook, argos and playwright plugins of the screenshots project.
export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  test: {
    name: 'unit',
    include: ['test/**/*.test.ts', 'src/**/*.test.{ts,tsx}'],
    environment: 'node',
    // Re-importing MUI for each test file costs more than the tests
    // themselves, and the files pass in any order without isolation
    isolate: false
  }
})
