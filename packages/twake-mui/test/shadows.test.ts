import { describe, expect, it } from 'vitest'

import { theme } from '../src/lib/theme'

// Every elevation ends with a 0.5 px hairline that draws the edge of a card,
// a menu or a dialog. In the dark scheme a black hairline sits on dark
// surfaces and disappears: the apps then add borders by hand. The edge must
// read as a light line over the dark surfaces a card lies on.

type Rgba = [number, number, number, number]

const parseColor = (color: string): Rgba => {
  const hex = color.match(/^#([\da-f]{3}|[\da-f]{6})$/i)?.[1]
  if (hex) {
    const full =
      hex.length === 3 ? [...hex].map(digit => digit + digit).join('') : hex
    return [0, 2, 4]
      .map(i => parseInt(full.slice(i, i + 2), 16))
      .concat(1) as Rgba
  }
  const rgb = color.match(/^rgba?\(([^)]+)\)$/)?.[1]
  if (!rgb) throw new Error(`unparsed colour ${color}`)
  const [r, g, b, a = 1] = rgb.split(',').map(Number)
  return [r, g, b, a]
}

/** The zero-offset, zero-blur layer of a box-shadow: the hairline. */
const hairlineOf = (shadow: string): Rgba => {
  const layers = shadow.split(/,(?![^(]*\))/).map(layer => layer.trim())
  const hairline = layers.find(layer =>
    /^0(px)? 0(px)? 0(px)? [\d.]+px /.test(layer)
  )
  if (!hairline) throw new Error(`no hairline in ${shadow}`)
  return parseColor(hairline.replace(/^(\S+\s+){4}/, ''))
}

const over = ([r, g, b, a]: Rgba, [br, bg, bb]: Rgba): Rgba => [
  r * a + br * (1 - a),
  g * a + bg * (1 - a),
  b * a + bb * (1 - a),
  1
]

const luminance = ([r, g, b]: Rgba): number => {
  const linear = (channel: number): number => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

const contrast = (a: Rgba, b: Rgba): number => {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

const scheme = (mode: 'light' | 'dark') => {
  const colors = theme.colorSchemes[mode]
  if (!colors) throw new Error(`no ${mode} scheme`)
  return colors
}

describe('the hairline of elevated surfaces', () => {
  const dark = scheme('dark')
  const surfaces = {
    'background.default': dark.palette.background.default,
    'background.paper': dark.palette.background.paper
  }

  for (const [name, surface] of Object.entries(surfaces)) {
    it(`shows as a light edge over ${name} in the dark scheme`, () => {
      const backdrop = parseColor(surface)
      for (const level of [1, 2, 4, 8, 16, 24]) {
        const edge = over(hairlineOf(dark.shadows[level]), backdrop)
        expect(luminance(edge), `elevation ${level}`).toBeGreaterThan(
          luminance(backdrop)
        )
        expect(
          contrast(edge, backdrop),
          `elevation ${level}`
        ).toBeGreaterThanOrEqual(1.1)
      }
    })
  }

  it('stays a dark edge over white paper in the light scheme', () => {
    const light = scheme('light')
    const backdrop = parseColor(light.palette.background.paper)
    for (const level of [1, 8, 24]) {
      const edge = over(hairlineOf(light.shadows[level]), backdrop)
      expect(luminance(edge), `elevation ${level}`).toBeLessThan(
        luminance(backdrop)
      )
    }
  })
})
