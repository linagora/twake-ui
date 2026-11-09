import { Snackbar, Tab, ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cdp, page } from 'vitest/browser'

import { I18n } from 'twake-i18n'

import Button from '../../src/components/Button'
import ListItemButton from '../../src/components/ListItemButton'
import SearchBar from '../../src/components/SearchBar'
import Tabs from '../../src/components/Tabs'
import { theme } from '../../src/lib/theme'

// Real Chromium: media queries, CSS animations and layout, which jsdom does
// not evaluate. Run: npx vitest run -c test/browser/vitest.config.ts

const renderThemed = (ui: React.ReactElement): ReturnType<typeof render> =>
  render(
    <ThemeProvider theme={theme}>
      <I18n lang="en" dictRequire={() => ({})}>
        {ui}
      </I18n>
    </ThemeProvider>
  )

const setTouch = async (enabled: boolean): Promise<void> => {
  await cdp().send('Emulation.setTouchEmulationEnabled', {
    enabled,
    maxTouchPoints: 1
  })
}

afterEach(async () => {
  cleanup()
  await setTouch(false)
  await page.viewport(1280, 800)
})

const fontSizeOf = (element: HTMLElement): number =>
  parseFloat(getComputedStyle(element).fontSize)

describe('SearchBar small', () => {
  // iOS Safari zooms the page into a field whose text is under 16 px.
  it('keeps 14 px text with a mouse', () => {
    expect(matchMedia('(pointer: fine)').matches).toBe(true)
    renderThemed(<SearchBar size="small" placeholder="Search" />)

    expect(fontSizeOf(screen.getByRole('textbox'))).toBe(14)
  })

  it('has text of 16 px at least on a touch screen, so iOS does not zoom', async () => {
    await setTouch(true)
    expect(matchMedia('(pointer: coarse)').matches).toBe(true)
    renderThemed(<SearchBar size="small" placeholder="Search" />)

    expect(fontSizeOf(screen.getByRole('textbox'))).toBeGreaterThanOrEqual(16)
  })
})

/** Animations running in `element` and below, once the press has started. */
const animationsAfterPress = async (
  element: HTMLElement
): Promise<Animation[]> => {
  fireEvent.mouseDown(element, { clientX: 10, clientY: 10, button: 0 })
  await new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  )
  const animations = element.getAnimations({ subtree: true })
  fireEvent.mouseUp(element)
  return animations
}

const startsFromNothing = (transform: unknown): boolean =>
  typeof transform === 'string' &&
  (/scale\(\s*0\s*\)/.test(transform) || /^matrix\(\s*0\s*,/.test(transform))

describe('press feedback', () => {
  // No ripple at all passes too: a press feedback without a growing ripple
  // is the fix the audit proposes. What may not happen is a 550 ms ripple
  // that grows from nothing on every press.
  const targets: [string, React.ReactElement, string][] = [
    ['a button', <Button key="b">Send</Button>, 'button'],
    ['a list row', <ListItemButton key="r">General</ListItemButton>, 'button']
  ]

  for (const [name, ui, role] of targets) {
    it(`on ${name} lasts 300 ms at most`, async () => {
      renderThemed(ui)
      const animations = await animationsAfterPress(screen.getByRole(role))

      for (const animation of animations)
        expect(
          Number(animation.effect?.getComputedTiming().duration)
        ).toBeLessThanOrEqual(300)
    })

    it(`on ${name} does not grow from scale 0`, async () => {
      renderThemed(ui)
      const animations = await animationsAfterPress(screen.getByRole(role))

      for (const animation of animations) {
        const keyframes = (animation.effect as KeyframeEffect).getKeyframes()
        expect(keyframes.map(frame => frame.transform)).not.toContainEqual(
          expect.toSatisfy(startsFromNothing)
        )
      }
    })
  }
})

describe('Tabs indicator', () => {
  // `transition: all` animates whatever changes. Only what moves the
  // indicator may transition: MUI writes its left (right in RTL, top when
  // vertical) and its width (height) inline, or a transform moves it.
  const moving = ['left', 'right', 'top', 'width', 'height', 'transform']
  for (const segmented of [false, true]) {
    it(`${segmented ? 'segmented ' : ''}transitions only the properties that move it`, () => {
      renderThemed(
        <Tabs value={0} segmented={segmented} aria-label="Room info">
          <Tab label="Members" />
          <Tab label="Media" />
        </Tabs>
      )
      const indicator = screen
        .getByRole('tablist')
        .parentElement?.querySelector<HTMLElement>('.MuiTabs-indicator')
      if (!indicator) throw new Error('no indicator under the tab list')

      const properties = getComputedStyle(indicator)
        .transitionProperty.split(',')
        .map(property => property.trim())
      expect(properties).not.toContain('all')
      for (const property of properties) expect(moving).toContain(property)
    })
  }
})

describe('Snackbar', () => {
  // A hyphen is a break opportunity: the id has none, as many have.
  it('wraps an unbreakable Matrix id inside a 360 px screen', async () => {
    await page.viewport(360, 800)
    renderThemed(
      <Snackbar
        open
        message="@averyverylonglocalpartwithoutahyphen:very.long.homeserver.example.org was signed out"
      />
    )
    const toast = screen.getByRole('alert')
    const message = screen.getByText(/averyverylonglocalpart/)
    // Measured once the toast has grown in, not halfway through its scale.
    await Promise.all(
      toast
        .getAnimations({ subtree: true })
        .map(animation => animation.finished)
    )

    expect(toast.getBoundingClientRect().left).toBeGreaterThanOrEqual(0)
    expect(toast.getBoundingClientRect().right).toBeLessThanOrEqual(innerWidth)
    expect(message.scrollWidth).toBeLessThanOrEqual(message.clientWidth)
  })
})
