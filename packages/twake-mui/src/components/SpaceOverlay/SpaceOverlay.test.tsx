// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react'
import React, { type ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  OverlayPortal,
  overlayThemeOptions,
  SpaceOverlayProvider
} from './SpaceOverlay'
import {
  computeOverlayRegion,
  connectSpaceOverlay,
  mirrorStyles,
  type SpaceOverlay,
  type SpaceOverlayStatus
} from './spaceOverlay'
import { TwakeMuiThemeProvider } from '../ThemeProvider'

function renderDs(ui: ReactElement): void {
  render(<TwakeMuiThemeProvider>{ui}</TwakeMuiThemeProvider>)
}

/** An overlay looked for until `settle` says whether it came */
function fakeOverlay(): {
  overlay: SpaceOverlay
  body: HTMLElement
  settle: (status: 'connected' | 'unavailable') => void
} {
  const body = document.createElement('div')
  body.dataset.testid = 'overlay-body'
  document.body.appendChild(body)
  const listeners = new Set<() => void>()
  let status: SpaceOverlayStatus = 'connecting'
  return {
    body,
    overlay: {
      getStatus: () => status,
      getBody: () => (status === 'connected' ? body : null),
      subscribe: listener => {
        listeners.add(listener)
        return () => listeners.delete(listener)
      }
    },
    settle: next => {
      status = next
      listeners.forEach(listener => {
        listener()
      })
    }
  }
}

function renderPortal(overlay: SpaceOverlay): void {
  renderDs(
    <SpaceOverlayProvider overlay={overlay}>
      <div data-testid="app">
        <OverlayPortal>
          <p>Composer</p>
        </OverlayPortal>
      </div>
    </SpaceOverlayProvider>
  )
}

function box(
  element: Element,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    x,
    y,
    left: x,
    top: y,
    width,
    height,
    right: x + width,
    bottom: y + height,
    toJSON: () => ({})
  })
}

afterEach(() => {
  cleanup()
  document.body.innerHTML = ''
})

describe('OverlayPortal', () => {
  it('renders in place outside TwakeSpace', () => {
    renderDs(
      <div data-testid="app">
        <OverlayPortal>
          <p>Composer</p>
        </OverlayPortal>
      </div>
    )

    expect(
      screen.getByTestId('app').contains(screen.getByText('Composer'))
    ).toBe(true)
  })

  it('waits for the overlay, then renders on it', () => {
    const { overlay, body, settle } = fakeOverlay()
    renderPortal(overlay)
    expect(screen.queryByText('Composer')).toBeNull()

    act(() => {
      settle('connected')
    })

    expect(body.contains(screen.getByText('Composer'))).toBe(true)
    expect(screen.getByTestId('app').childNodes).toHaveLength(0)
  })

  it('renders in place when the overlay does not come', () => {
    const { overlay, body, settle } = fakeOverlay()
    renderPortal(overlay)

    act(() => {
      settle('unavailable')
    })

    expect(
      screen.getByTestId('app').contains(screen.getByText('Composer'))
    ).toBe(true)
    expect(body.childNodes).toHaveLength(0)
  })
})

describe('overlayThemeOptions', () => {
  it('sends dialogs and drawers to the overlay, once it is there', () => {
    const { overlay, body, settle } = fakeOverlay()
    const components = overlayThemeOptions(overlay).components
    const container = components?.MuiDialog?.defaultProps?.container

    expect(typeof container === 'function' ? container() : container).toBeNull()
    settle('connected')
    expect(typeof container === 'function' ? container() : container).toBe(body)
    expect(components?.MuiDrawer?.defaultProps?.container).toBe(container)
  })

  it('shows the backdrop of a drawer at once', () => {
    const { overlay } = fakeOverlay()
    const drawer = overlayThemeOptions(overlay).components?.MuiDrawer

    expect(drawer?.defaultProps?.slotProps?.backdrop).toEqual({
      transitionDuration: 0
    })
  })
})

describe('computeOverlayRegion', () => {
  it('is empty while nothing is drawn', () => {
    expect(computeOverlayRegion(document)).toEqual([])
  })

  it('looks through the dock line and takes its windows, with room for their shadow', () => {
    document.body.innerHTML = `
      <div id="dock" style="position: fixed; pointer-events: none">
        <div id="window" style="pointer-events: auto"></div>
        <div id="minimized" style="pointer-events: auto"></div>
      </div>`
    box(document.getElementById('dock') as Element, 24, 0, 1200, 800)
    box(document.getElementById('window') as Element, 600, 200, 500, 600)
    box(document.getElementById('minimized') as Element, 300, 756, 400, 44)

    expect(computeOverlayRegion(document)).toEqual([
      { x: 584, y: 184, width: 532, height: 632 },
      { x: 284, y: 740, width: 432, height: 76 }
    ])
  })

  it('keeps a box that paints without taking clicks, like a tooltip', () => {
    document.body.innerHTML = `
      <div id="popper" style="pointer-events: none">
        <div id="tooltip" style="pointer-events: none; background-color: rgb(97, 97, 97)"></div>
      </div>`
    box(document.getElementById('tooltip') as Element, 10, 10, 100, 20)

    expect(computeOverlayRegion(document)).toEqual([
      { x: -6, y: -6, width: 132, height: 52 }
    ])
  })

  it('skips what is hidden', () => {
    document.body.innerHTML = `
      <div id="hidden" style="visibility: hidden"></div>
      <div id="none" style="display: none"></div>`
    box(document.getElementById('hidden') as Element, 0, 0, 10, 10)
    box(document.getElementById('none') as Element, 0, 0, 10, 10)

    expect(computeOverlayRegion(document)).toEqual([])
  })

  it('is the whole page while a modal or a backdrop is open', () => {
    document.body.innerHTML = '<div class="MuiModal-root"></div>'
    expect(computeOverlayRegion(document)).toBe('full')

    document.body.innerHTML = '<div><div class="MuiBackdrop-root"></div></div>'
    expect(computeOverlayRegion(document)).toBe('full')
  })

  it('ignores a modal kept mounted while closed', () => {
    document.body.innerHTML =
      '<div class="MuiModal-root MuiModal-hidden"><div class="MuiBackdrop-root"></div></div>'

    expect(computeOverlayRegion(document)).toEqual([])
  })
})

describe('mirrorStyles', () => {
  it('copies a rule inserted in the app at once, before it is laid out', () => {
    const app = document.createElement('style')
    document.head.appendChild(app)
    const frame = document.createElement('iframe')
    document.body.appendChild(frame)
    const overlay = frame.contentDocument
    if (overlay === null) throw new Error('The frame has no document')
    mirrorStyles(document, overlay)

    app.sheet?.insertRule('.paper { width: 300px }')

    const copied = overlay.querySelector<HTMLStyleElement>('style[data-mirror]')
    const rules = Array.from(copied?.sheet?.cssRules ?? [])
    expect(rules.map(rule => rule.cssText.replace(/\s/g, ''))).toEqual(
      expect.arrayContaining(['.paper{width:300px;}'])
    )
    expect(rules).toHaveLength(new Set(rules.map(rule => rule.cssText)).size)
    app.remove()
    frame.remove()
  })
})

describe('connectSpaceOverlay', () => {
  it('connects once per window', () => {
    vi.useFakeTimers()
    vi.spyOn(window, 'parent', 'get').mockReturnValue({
      length: 0
    } as unknown as Window)
    window.name = 'twake-embed-app'

    const overlay = connectSpaceOverlay(() => undefined)

    expect(overlay?.getStatus()).toBe('connecting')
    expect(connectSpaceOverlay(() => undefined)).toBe(overlay)
    window.name = ''
    vi.restoreAllMocks()
    vi.useRealTimers()
  })
})
