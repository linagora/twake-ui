import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

import { describe, expect, it } from 'vitest'

import { makeTheme } from '../src/lib/makeTheme'

type Declarations = Record<string, string>

// `selector { --name: value; }` blocks, the media query wrapper left aside.
const parseCss = (css: string): [string, Declarations][] =>
  Array.from(css.matchAll(/([^{}]+)\{([^{}]*)\}/g), ([, selector, body]) => [
    selector.trim(),
    Object.fromEntries(
      Array.from(
        body.matchAll(/(--[\w-]+):\s*([^;]+);/g),
        ([, name, value]) => [name, value]
      )
    )
  ])

const normalize = (value: unknown): string =>
  String(value ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()

describe('twake-css/dist/vars.css', () => {
  const require = createRequire(import.meta.url)
  const vars = parseCss(
    readFileSync(require.resolve('@linagora/twake-css/dist/vars.css'), 'utf8')
  )

  const schemes = ['light', 'dark', 'contrast'] as const
  type Scheme = (typeof schemes)[number]

  const emitted: Record<Scheme, Declarations> = {
    light: {},
    dark: {},
    contrast: {}
  }
  // A scheme takes every block that names no other scheme, `:root` included.
  for (const sheet of makeTheme().generateStyleSheets()) {
    for (const [selector, decls] of Object.entries(sheet)) {
      for (const scheme of schemes) {
        const others = schemes.filter(other => other !== scheme)
        if (!others.some(other => selector.includes(other)))
          Object.assign(emitted[scheme], decls)
      }
    }
  }

  it('declares every variable with the value TwakeMuiThemeProvider emits', () => {
    let checked = 0
    for (const [selector, decls] of vars) {
      // Sass drops the quotes: [data-theme=dark] and :root:not([data-theme=light], …).
      // The light block also starts contrast, which overrides it later.
      const mode: Scheme = /dark|:not\(/.test(selector)
        ? 'dark'
        : selector.includes('light')
          ? 'light'
          : 'contrast'
      for (const [name, value] of Object.entries(decls)) {
        expect(normalize(emitted[mode][name]), `${name} in ${mode} mode`).toBe(
          normalize(value)
        )
        checked += 1
      }
    }
    expect(checked).toBeGreaterThan(200)
  })

  it('overrides in [data-theme=contrast] every light variable the contrast scheme changes', () => {
    const block = (match: (selector: string) => boolean): Declarations =>
      Object.assign({}, ...vars.filter(([s]) => match(s)).map(([, d]) => d))
    const light = block(s => s.includes('light') && !s.includes(':not('))
    const contrast = block(s => s === '[data-theme=contrast]')

    expect(Object.keys(contrast).length).toBeGreaterThan(30)
    for (const name of Object.keys(light)) {
      expect(normalize(contrast[name] ?? light[name]), name).toBe(
        normalize(emitted.contrast[name])
      )
    }
  })
})
