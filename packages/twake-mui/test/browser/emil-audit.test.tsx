import {
  Alert,
  Button as MuiButton,
  IconButton,
  ListItemIcon,
  Snackbar,
  Tab,
  ThemeProvider
} from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cdp, page } from 'vitest/browser'

import { Dots, Download, Icon } from '@linagora/twake-icons'
import { I18n } from 'twake-i18n'

import Button from '../../src/components/Button'
import ListItemButton from '../../src/components/ListItemButton'
import SearchBar from '../../src/components/SearchBar'
import Tabs from '../../src/components/Tabs'
import { makeTheme } from '../../src/lib/makeTheme'
import { theme } from '../../src/lib/theme'

// Real Chromium: media queries, CSS animations and layout, which jsdom does
// not evaluate. Run: npx vitest run -c test/browser/vitest.config.ts

const renderWith = (
  themeToUse: ReturnType<typeof makeTheme>,
  ui: React.ReactElement
): ReturnType<typeof render> =>
  render(
    <ThemeProvider theme={themeToUse}>
      <I18n lang="en" dictRequire={() => ({})}>
        {ui}
      </I18n>
    </ThemeProvider>
  )

const renderThemed = (ui: React.ReactElement): ReturnType<typeof render> =>
  renderWith(theme, ui)

const setTouch = async (enabled: boolean): Promise<void> => {
  await cdp().send('Emulation.setTouchEmulationEnabled', {
    enabled,
    maxTouchPoints: 1
  })
}

afterEach(async () => {
  cleanup()
  await setTouch(false)
  await emulateReducedMotion('no-preference')
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

const twoFrames = (): Promise<unknown> =>
  new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  )

interface Press {
  /** Animations running once the press has started. */
  pressed: Animation[]
  /** Animations that started once the press was released. */
  released: Animation[]
}

/** Presses `element` with the mouse and releases it. */
const press = async (element: HTMLElement): Promise<Press> => {
  fireEvent.mouseDown(element, { clientX: 10, clientY: 10, button: 0 })
  await twoFrames()
  const pressed = element.getAnimations({ subtree: true })
  fireEvent.mouseUp(element)
  await twoFrames()
  const released = element
    .getAnimations({ subtree: true })
    .filter(animation => !pressed.includes(animation))
  return { pressed, released }
}

const animationsAfterPress = async (
  element: HTMLElement
): Promise<Animation[]> => (await press(element)).pressed

const durationOf = (animation: Animation): number =>
  Number(animation.effect?.getComputedTiming().duration)

/** What animates, named so that a failure says which animation runs. */
const describeAnimations = (animations: Animation[]): string[] =>
  animations.map(animation =>
    animation instanceof CSSAnimation
      ? `${animation.animationName} ${durationOf(animation)} ms`
      : `${animation.constructor.name} ${durationOf(animation)} ms`
  )

const motionTheme = (
  reducedMotion: 'always' | 'system' | 'never'
): ReturnType<typeof makeTheme> =>
  makeTheme('light', undefined, { motion: { reducedMotion } })

const emulateReducedMotion = async (
  value: 'reduce' | 'no-preference'
): Promise<void> => {
  await cdp().send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value }]
  })
}

const startsFromNothing = (transform: unknown): boolean =>
  typeof transform === 'string' &&
  (/scale\(\s*0\s*\)/.test(transform) || /^matrix\(\s*0\s*,/.test(transform))

describe('press feedback', () => {
  // The press must show at once: a ripple that starts at half size and is
  // done in 300 ms at most, never MUI's 550 ms ripple grown from nothing.
  // Each spec first requires the animation it measures, so that a press
  // with no feedback at all does not pass for a fast one.
  const targets: [string, React.ReactElement, string][] = [
    ['a button', <Button key="b">Send</Button>, 'button'],
    ['a list row', <ListItemButton key="r">General</ListItemButton>, 'button']
  ]

  for (const [name, ui, role] of targets) {
    it(`on ${name} lasts 300 ms at most`, async () => {
      renderThemed(ui)
      const animations = await animationsAfterPress(screen.getByRole(role))

      expect(describeAnimations(animations)).not.toEqual([])
      for (const animation of animations)
        expect(durationOf(animation)).toBeLessThanOrEqual(300)
    })

    it(`on ${name} does not grow from scale 0`, async () => {
      renderThemed(ui)
      const animations = await animationsAfterPress(screen.getByRole(role))

      expect(describeAnimations(animations)).not.toEqual([])
      for (const animation of animations) {
        const keyframes = (animation.effect as KeyframeEffect).getKeyframes()
        expect(keyframes.map(frame => frame.transform)).not.toContainEqual(
          expect.toSatisfy(startsFromNothing)
        )
      }
    })

    it(`on ${name} fades out in 300 ms at most once released`, async () => {
      renderThemed(ui)
      const { released } = await press(screen.getByRole(role))

      expect(describeAnimations(released)).not.toEqual([])
      for (const animation of released)
        expect(durationOf(animation)).toBeLessThanOrEqual(300)
    })
  }
})

describe('reduced motion', () => {
  // MUI's theme.motion.reducedMotion: 'always' removes the motion, 'system'
  // removes it when the system asks for less motion, 'never' keeps it. The
  // ripple and the tab indicator of Twake follow it as MUI's own do.
  const indicatorOf = (): HTMLElement => {
    const indicator = screen
      .getByRole('tablist')
      .parentElement?.querySelector<HTMLElement>('.MuiTabs-indicator')
    if (!indicator) throw new Error('no indicator under the tab list')
    return indicator
  }

  /** The transitions of the indicator, as `property duration`. */
  const indicatorTransitions = (): string[] => {
    const style = getComputedStyle(indicatorOf())
    if (style.transitionProperty === 'none') return []
    const durations = style.transitionDuration.split(',')
    return style.transitionProperty
      .split(',')
      .map((property, index) => ({
        property: property.trim(),
        duration: parseFloat(durations[index % durations.length])
      }))
      .filter(({ duration }) => duration > 0)
      .map(({ property, duration }) => `${property} ${duration}s`)
  }

  const renderTabs = (
    themeToUse: ReturnType<typeof makeTheme>,
    segmented: boolean
  ): void => {
    renderWith(
      themeToUse,
      <Tabs value={0} segmented={segmented} aria-label="Room info">
        <Tab label="Members" />
        <Tab label="Media" />
      </Tabs>
    )
  }

  const cases: {
    label: string
    reducedMotion: 'always' | 'system'
    media: 'reduce' | 'no-preference'
  }[] = [
    {
      label: "with reducedMotion 'always'",
      reducedMotion: 'always',
      media: 'no-preference'
    },
    {
      label:
        "with reducedMotion 'system' and the system asking for less motion",
      reducedMotion: 'system',
      media: 'reduce'
    }
  ]

  for (const { label, reducedMotion, media } of cases) {
    const arrange = async (): Promise<ReturnType<typeof makeTheme>> => {
      await emulateReducedMotion(media)
      expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(
        media === 'reduce'
      )
      const themeToUse = motionTheme(reducedMotion)
      expect(themeToUse.motion.reducedMotion).toBe(reducedMotion)
      return themeToUse
    }

    it(`${label}, a press on a button shows no ripple animation`, async () => {
      renderWith(await arrange(), <Button>Send</Button>)
      const { pressed, released } = await press(screen.getByRole('button'))

      expect(describeAnimations([...pressed, ...released])).toEqual([])
    })

    it(`${label}, a press on a list row shows no ripple animation`, async () => {
      renderWith(await arrange(), <ListItemButton>General</ListItemButton>)
      const { pressed, released } = await press(screen.getByRole('button'))

      expect(describeAnimations([...pressed, ...released])).toEqual([])
    })

    for (const segmented of [false, true]) {
      it(`${label}, the ${segmented ? 'segmented ' : ''}tab indicator jumps without a transition`, async () => {
        renderTabs(await arrange(), segmented)

        expect(indicatorTransitions()).toEqual([])
      })
    }
  }

  // Controls: the same measures see the motion where it must stay, so the
  // specs above are not green for want of seeing anything.
  const controls: {
    label: string
    reducedMotion: 'never' | 'system'
    media: 'reduce' | 'no-preference'
  }[] = [
    {
      label:
        "with reducedMotion 'never', even when the system asks for less motion",
      reducedMotion: 'never',
      media: 'reduce'
    },
    {
      label: "with reducedMotion 'system' and no preference of the system",
      reducedMotion: 'system',
      media: 'no-preference'
    }
  ]

  for (const { label, reducedMotion, media } of controls) {
    const arrange = async (): Promise<ReturnType<typeof makeTheme>> => {
      await emulateReducedMotion(media)
      expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(
        media === 'reduce'
      )
      return motionTheme(reducedMotion)
    }

    it(`${label}, a press on a button still ripples`, async () => {
      renderWith(await arrange(), <Button>Send</Button>)
      const { pressed } = await press(screen.getByRole('button'))

      expect(describeAnimations(pressed)).not.toEqual([])
    })

    it(`${label}, the tab indicator still slides`, async () => {
      renderTabs(await arrange(), false)

      expect(indicatorTransitions()).not.toEqual([])
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

  // A toast of the app is an Alert in a Snackbar (AlertProvider): the
  // Snackbar then renders no SnackbarContent, so its wrapping rule does not
  // apply.
  it('with an Alert, wraps an unbreakable Matrix id inside a 360 px screen', async () => {
    await page.viewport(360, 800)
    renderThemed(
      <Snackbar open>
        <Alert variant="filled" onClose={() => undefined}>
          @averyverylonglocalpartwithoutahyphen:very.long.homeserver.example.org
          was signed out
        </Alert>
      </Snackbar>
    )
    const toast = screen.getByRole('alert')
    const message = screen.getByText(/averyverylonglocalpart/)
    await Promise.all(
      document.getAnimations().map(animation => animation.finished)
    )

    expect(toast.getBoundingClientRect().left).toBeGreaterThanOrEqual(0)
    expect(toast.getBoundingClientRect().right).toBeLessThanOrEqual(innerWidth)
    expect(message.scrollWidth).toBeLessThanOrEqual(message.clientWidth)
  })
})

/** The words of `element`'s own text that the layout splits across lines. */
const wordsSplitAcrossLines = (element: HTMLElement): string[] => {
  const split: string[] = []
  for (const node of element.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE) continue
    const text = node.textContent ?? ''
    for (const match of text.matchAll(/\S+/g)) {
      const range = document.createRange()
      range.setStart(node, match.index)
      range.setEnd(node, match.index + match[0].length)
      if (range.getClientRects().length > 1) split.push(match[0])
    }
  }
  return split
}

// The "Actions" story of Alert: two text buttons and an icon button beside
// the message, on a phone.
const AlertWithActions = (): React.ReactElement => (
  <Alert
    severity="info"
    action={
      <>
        <MuiButton
          variant="text"
          size="small"
          startIcon={<Icon icon={Download} />}
        >
          Download
        </MuiButton>
        <MuiButton variant="text" size="small">
          No, thanks!
        </MuiButton>
        <ListItemIcon>
          <IconButton>
            <Icon icon={Dots} />
          </IconButton>
        </ListItemIcon>
      </>
    }
  >
    Get Cozy Drive for Desktop and synchronise your files safely to make them
    accessible at all times.
  </Alert>
)

describe('Alert', () => {
  it('with actions beside it, keeps every word of its message whole on a 375 px screen', async () => {
    await page.viewport(375, 800)
    renderThemed(<AlertWithActions />)
    const message = screen.getByText(/Get Cozy Drive for Desktop/)

    expect(wordsSplitAcrossLines(message)).toEqual([])
  })

  // Control: the same Alert, its message without overflow-wrap, keeps its
  // words whole; the measure above is not what splits them.
  it('with actions beside it and a message without overflow-wrap, keeps every word whole on a 375 px screen', async () => {
    await page.viewport(375, 800)
    renderThemed(
      <>
        <style>
          {'.control .MuiAlert-message { overflow-wrap: normal !important }'}
        </style>
        <div className="control">
          <AlertWithActions />
        </div>
      </>
    )
    const message = screen.getByText(/Get Cozy Drive for Desktop/)

    expect(wordsSplitAcrossLines(message)).toEqual([])
  })
})
