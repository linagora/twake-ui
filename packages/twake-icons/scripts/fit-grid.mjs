#!/usr/bin/env node
// Puts every icon on one grid: a square viewBox, the drawing centred, its
// longest side filling LIVE_AREA of GRID (Material keylines: 20 in 24).
// Usage: npm run grid [-- file.svg ...]
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

import { chromium } from 'playwright'

const GRID = 24
const LIVE_AREA = 20

const packageDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const assetsDir = join(packageDir, 'assets')

function listSvgs(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return listSvgs(path)
    return entry.name.endsWith('.svg') ? [path] : []
  })
}

// These keep their own frame. The small variants and the chevrons are
// drawn smaller than the live area on purpose, like the Material
// exceptions. The form controls fill the box their component sizes.
const OWN_FRAME = [
  'bottom',
  'cross-small',
  'dropdown',
  'dropup',
  'left',
  'plus-small',
  'right',
  'top',
  'check-square',
  'checkbox',
  'radio-checked',
  'radio-unchecked'
].map(name => join(assetsDir, 'ui', `${name}.svg`))

// Assistant lives with the illustrations but is drawn and used as an icon.
const files = (
  process.argv.length > 2
    ? process.argv.slice(2).map(file => resolve(file))
    : [
        ...listSvgs(join(assetsDir, 'ui')),
        join(assetsDir, 'illus/assistant.svg'),
        join(assetsDir, 'illus/assistant-color.svg')
      ]
).filter(file => !OWN_FRAME.includes(file))

const round = value => +value.toFixed(3)

function fitViewBox({ x, y, width, height }) {
  const side = (Math.max(width, height) * GRID) / LIVE_AREA
  return [x - (side - width) / 2, y - (side - height) / 2, side, side].map(
    round
  )
}

const browser = await chromium.launch()
const page = await browser.newPage()

for (const file of files) {
  const source = readFileSync(file, 'utf-8')
  await page.setContent(source)
  // Measures the rendered ink, so strokes, masks, clips and invisible frames
  // count as they show. The render frame comes from the geometry alone, not
  // from the viewBox, so a second run finds the same box.
  const box = await page.evaluate(async () => {
    const PIXELS = 2048
    const svg = document.querySelector('svg')
    const geometry = svg.getBBox()
    const pad = Math.max(geometry.width, geometry.height) / 4 + 2
    const x0 = Math.floor(geometry.x - pad)
    const y0 = Math.floor(geometry.y - pad)
    const frame = Math.ceil(Math.max(geometry.width, geometry.height) + 2 * pad)
    const copy = svg.cloneNode(true)
    copy.setAttribute('viewBox', `${x0} ${y0} ${frame} ${frame}`)
    copy.setAttribute('width', PIXELS)
    copy.setAttribute('height', PIXELS)
    const image = new Image()
    image.src = `data:image/svg+xml,${encodeURIComponent(
      new XMLSerializer().serializeToString(copy)
    )}`
    await image.decode()
    const canvas = document.createElement('canvas')
    canvas.width = PIXELS
    canvas.height = PIXELS
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)
    const { data } = context.getImageData(0, 0, PIXELS, PIXELS)
    let left = PIXELS
    let top = PIXELS
    let right = -1
    let bottom = -1
    for (let row = 0; row < PIXELS; row++) {
      for (let column = 0; column < PIXELS; column++) {
        if (!data[(row * PIXELS + column) * 4 + 3]) continue
        left = Math.min(left, column)
        right = Math.max(right, column)
        top = Math.min(top, row)
        bottom = Math.max(bottom, row)
      }
    }
    const unit = frame / PIXELS
    return {
      x: x0 + left * unit,
      y: y0 + top * unit,
      width: (right + 1 - left) * unit,
      height: (bottom + 1 - top) * unit
    }
  })
  if (!(box.width > 0 && box.height > 0)) {
    throw new Error(`${file}: empty drawing`)
  }

  const [x, y, side] = fitViewBox(box)
  const viewBox = `${x} ${y} ${side} ${side}`
  if (source.includes(`viewBox="${viewBox}"`)) continue
  const fitted = source.replace(/<svg\b[^>]*>/, rootTag =>
    rootTag
      .replace(/\s(xmlns|width|height|viewBox)="[^"]*"/g, '')
      .replace(
        /^<svg/,
        `<svg xmlns="http://www.w3.org/2000/svg" width="${side}" height="${side}" viewBox="${viewBox}"`
      )
  )
  writeFileSync(file, fitted)
}

await browser.close()
