import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { build, type Rollup } from 'vite'
import { beforeAll, describe, expect, it } from 'vitest'

// A consumer that imports one component from the package must not get the
// heavy libraries of the others: without `sideEffects` in package.json the
// bundler keeps every module the index reaches (react-virtuoso of
// VirtualizedTable, react-spring of BottomSheet) in the consumer's bundle.
// The bundle is built from dist/, as a consumer gets it: run `npm run build`
// first (the CI does, before `npm test`).

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(
  readFileSync(path.join(root, 'package.json'), 'utf8')
) as { peerDependencies: Record<string, string> }
const peers = Object.keys(manifest.peerDependencies)
const isPeer = (id: string): boolean =>
  peers.some(peer => id === peer || id.startsWith(`${peer}/`))

const ENTRY = '\0consumer-entry'

/** Paths of the modules a consumer bundles when its entry is `code`. */
const bundledModules = async (code: string): Promise<string[]> => {
  const result = await build({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [
      {
        name: 'consumer-entry',
        resolveId: id => (id === ENTRY ? id : null),
        load: id => (id === ENTRY ? code : null)
      }
    ],
    build: {
      write: false,
      minify: false,
      rollupOptions: {
        input: ENTRY,
        preserveEntrySignatures: 'strict',
        external: isPeer
      }
    }
  })
  const outputs = (
    Array.isArray(result) ? result : [result]
  ) as Rollup.RollupOutput[]
  return outputs.flatMap(({ output }) =>
    output.flatMap(chunk =>
      chunk.type === 'chunk' ? Object.keys(chunk.modules) : []
    )
  )
}

const fromLibrary = (modules: string[], library: string): string[] =>
  modules.filter(id => id.includes(`/node_modules/${library}/`))

describe('a consumer importing one component', () => {
  beforeAll(() => {
    if (!existsSync(path.join(root, 'dist/index.js')))
      throw new Error('dist/index.js is missing: run `npm run build` first')
  })

  it('detects the libraries a component really uses (control)', async () => {
    const modules = await bundledModules(
      "export { BottomSheet, VirtualizedTable } from '@linagora/twake-mui'"
    )
    expect(fromLibrary(modules, '@react-spring/web')).not.toEqual([])
    expect(fromLibrary(modules, 'react-virtuoso')).not.toEqual([])
  }, 60_000)

  it('does not bundle react-virtuoso when it imports Button', async () => {
    const modules = await bundledModules(
      "export { Button } from '@linagora/twake-mui'"
    )
    expect(fromLibrary(modules, 'react-virtuoso')).toEqual([])
  }, 60_000)

  it('does not bundle react-spring when it imports Button', async () => {
    const modules = await bundledModules(
      "export { Button } from '@linagora/twake-mui'"
    )
    expect(fromLibrary(modules, '@react-spring')).toEqual([])
  }, 60_000)
})
