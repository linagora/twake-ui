// Checks that the built packages load in plain Node, as an app's tests load
// them from node_modules (linagora/twake-ui#274). Run after `npm run build`.
//
// 1. The dist of each package imports its own files by their path: a `.js`
//    file, never a folder nor an extensionless path, and JSON with its type.
// 2. Each export of each package is imported in a fresh Node process. A
//    failure inside another package (a peer not yet migrated) is a warning.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const PACKAGES = 'packages'
const SPECIFIER =
  /(?:\bfrom\s*|\bimport\s*\(?\s*)(['"])(\.{1,2}\/[^'"]*)\1(\s*with\s*\{[^}]*\})?/g

const jsFiles = dir =>
  readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return jsFiles(path)
    // The stories ship in dist but are no part of the API
    return /\.m?js$/.test(name) && !/\.stories\.js$/.test(name) ? [path] : []
  })

const badImports = dist =>
  jsFiles(dist).flatMap(file =>
    [...readFileSync(file, 'utf8').matchAll(SPECIFIER)]
      .flatMap(([, , spec, attribute]) => {
        const target = resolve(dirname(file), spec)
        if (spec.endsWith('.json'))
          return attribute ? [] : [`${spec} (JSON without type)`]
        if (/\.(png|svg|jpe?g|gif|webp|css)$/.test(spec))
          return [`${spec} (asset)`]
        if (!/\.m?js$/.test(spec)) return [`${spec} (no extension)`]
        return existsSync(target) ? [] : [`${spec} (missing)`]
      })
      .map(problem => `${relative(PACKAGES, file)}: ${problem}`)
  )

/**
 * The subpaths of `exports`: a string, or conditions at its top level, is the
 * package itself.
 */
export const exportedSubpaths = exports => {
  const keys =
    exports && typeof exports === 'object' ? Object.keys(exports) : []
  return keys.length && keys.every(key => key.startsWith('.')) ? keys : ['.']
}

/**
 * A failure is a peer's own when the module that failed to import is itself
 * inside node_modules: the package checked imported that peer correctly.
 */
export const isPeerFailure = stderr =>
  /imported from \S*node_modules\/(@[^/]+\/)?[^/]+\//.test(stderr)

const importError = specifier => {
  try {
    execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `await import(${JSON.stringify(specifier)})`
      ],
      { stdio: 'pipe' }
    )
    return null
  } catch (error) {
    return String(error.stderr)
  }
}

const report = (stream, text) => stream.write(`${text}\n`)

const check = () => {
  let failed = false
  for (const name of readdirSync(PACKAGES)) {
    const root = join(PACKAGES, name)
    const manifestPath = join(root, 'package.json')
    if (!existsSync(manifestPath)) continue
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
    if (manifest.private || manifest.type !== 'module') continue

    for (const problem of badImports(join(root, 'dist'))) {
      report(process.stderr, `FAIL ${problem}`)
      failed = true
    }

    for (const subpath of exportedSubpaths(manifest.exports)) {
      if (/\.(css|json)$/.test(subpath)) continue
      const specifier = manifest.name + subpath.slice(1)
      const error = importError(specifier)
      if (!error) {
        report(process.stdout, `ok   ${specifier}`)
        continue
      }
      const line = error.split('\n').find(text => /Error/.test(text)) ?? error
      const inPeer = isPeerFailure(error)
      report(
        process.stderr,
        `${inPeer ? 'WARN (peer)' : 'FAIL'} ${specifier}: ${line.trim()}`
      )
      if (!inPeer) failed = true
    }
  }
  return failed
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(check() ? 1 : 0)
}
