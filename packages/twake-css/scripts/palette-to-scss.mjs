import { readFileSync, writeFileSync } from 'node:fs'

const palette = JSON.parse(readFileSync(new URL('../palette.json', import.meta.url), 'utf8'))

const toMap = value =>
  typeof value === 'object'
    ? `(${Object.entries(value).map(([key, v]) => `${/^\d+$/.test(key) ? key : `'${key}'`}: ${toMap(v)}`).join(', ')})`
    : value

writeFileSync(
  new URL('../src/palette.scss', import.meta.url),
  `// Generated from palette.json by scripts/palette-to-scss.mjs\n$palette: ${toMap(palette)};\n`
)
