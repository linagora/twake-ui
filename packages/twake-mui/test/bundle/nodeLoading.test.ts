import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vitest'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

// Run by Node itself: Vitest resolves the imports that Node refuses
it('loads the published entry in Node', () => {
  expect(() =>
    execFileSync(process.execPath, ['dist/index.js'], {
      cwd: root,
      stdio: 'pipe'
    })
  ).not.toThrow()
})
