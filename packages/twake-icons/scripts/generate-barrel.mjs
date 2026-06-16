import fs from 'fs'
import path from 'path'

const iconsDir = path.resolve('src/Icons')
const files = fs
  .readdirSync(iconsDir)
  .filter(f => f.endsWith('.tsx') && f !== 'index.tsx')
  .sort()

const content = files
  .map(f => {
    const name = f.replace('.tsx', '')
    return `export { default as ${name} } from './${name}'`
  })
  .join('\n')

fs.writeFileSync(path.join(iconsDir, 'index.ts'), content + '\n')
