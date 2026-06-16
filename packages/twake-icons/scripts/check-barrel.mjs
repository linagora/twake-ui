import fs from 'fs'
import path from 'path'

const barrelPath = path.resolve('src/Icons/index.ts')
const before = fs.readFileSync(barrelPath, 'utf8')

// Run the barrel generator (import executes it)
await import('./generate-barrel.mjs')

const after = fs.readFileSync(barrelPath, 'utf8')

if (before !== after) {
  fs.writeFileSync(barrelPath, before) // restore original
  console.error('ERROR: src/Icons/index.ts is out of sync.')
  console.error('Run `npm run build:barrel` and commit the updated barrel.')
  process.exit(1)
} else {
  console.log('Barrel is up to date.')
}
