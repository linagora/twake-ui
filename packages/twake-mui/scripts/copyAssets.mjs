import { cpSync } from 'node:fs'
import { extname } from 'node:path'

// tsc only emits scripts, so the images that components import are copied next to them
cpSync('src', 'dist', {
  recursive: true,
  filter: source => ['', '.png'].includes(extname(source))
})
