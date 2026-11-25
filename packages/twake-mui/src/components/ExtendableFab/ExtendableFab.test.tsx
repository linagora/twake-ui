// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Plus } from '@linagora/twake-icons'

import ExtendableFab, { ExtendableFabProps } from './index.js'
import { theme } from '../../lib/theme.js'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  cleanup()
  document.body.replaceChildren()
  vi.useRealTimers()
})

const setup = (props: Partial<ExtendableFabProps> = {}): HTMLElement => {
  render(
    <ThemeProvider theme={theme}>
      <div data-testid="outside" />
      <ExtendableFab label="Create" icon={Plus} {...props} />
    </ThemeProvider>
  )
  return screen.getByRole('button', { name: 'Create' })
}

const isFolded = (): boolean =>
  getComputedStyle(screen.getByText('Create').parentElement as HTMLElement)
    .gridTemplateColumns === '0fr'

const wait = (ms: number): void => {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

/** A scroll that follows a turn of the mouse wheel */
const userScroll = (target: Document | Element): void => {
  fireEvent.wheel(target)
  fireEvent.scroll(target)
}

const appendBox = (): HTMLElement =>
  document.body.appendChild(document.createElement('div'))

describe('ExtendableFab follows', () => {
  it('the page by default: folds while it scrolls and unfolds once it stops', () => {
    const button = setup()
    expect(isFolded()).toBe(false)

    userScroll(document)
    expect(isFolded()).toBe(true)
    expect(screen.getByRole('button', { name: 'Create' })).toBe(button)

    wait(249)
    userScroll(document)
    wait(249)
    expect(isFolded()).toBe(true)

    wait(1)
    expect(isFolded()).toBe(false)
  })

  it('the page only by default, not the boxes that scroll in it', () => {
    setup()

    userScroll(screen.getByTestId('outside'))
    expect(isFolded()).toBe(false)
  })

  it('the page when given its root element or its body', () => {
    for (const page of [document.documentElement, document.body]) {
      setup({ follow: page })

      // The page scroll is fired at the document, not at either element
      userScroll(document)
      expect(isFolded()).toBe(true)
      cleanup()
    }
  })

  it('the page when the body scrolls on its own, by default or given the body', () => {
    for (const follow of [undefined, document.body]) {
      setup({ follow })

      // html { overflow: hidden } and body { overflow: auto }: the scroll is fired at the body
      userScroll(document.body)
      expect(isFolded()).toBe(true)
      cleanup()
    }
  })

  it('the given element and its content only', () => {
    const list = appendBox()
    const row = list.appendChild(document.createElement('div'))
    setup({ follow: list })

    userScroll(screen.getByTestId('outside'))
    userScroll(document)
    expect(isFolded()).toBe(false)

    userScroll(row)
    expect(isFolded()).toBe(true)
  })

  it('the element of a ref', () => {
    const list = appendBox()
    setup({ follow: { current: list } })

    userScroll(document)
    expect(isFolded()).toBe(false)

    userScroll(list)
    expect(isFolded()).toBe(true)
  })

  it('the element a ref gets after mounting, and the next one', () => {
    const listRef: { current: HTMLElement | null } = { current: null }
    setup({ follow: listRef })
    const list = appendBox()
    listRef.current = list

    userScroll(list)
    expect(isFolded()).toBe(true)
    wait(250)

    const nextList = appendBox()
    listRef.current = nextList
    userScroll(list)
    expect(isFolded()).toBe(false)
    userScroll(nextList)
    expect(isFolded()).toBe(true)
  })

  it('the element given after mounting', () => {
    const list = appendBox()
    const nextList = appendBox()
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <ExtendableFab label="Create" icon={Plus} follow={list} />
      </ThemeProvider>
    )

    rerender(
      <ThemeProvider theme={theme}>
        <ExtendableFab label="Create" icon={Plus} follow={nextList} />
      </ThemeProvider>
    )
    userScroll(list)
    expect(isFolded()).toBe(false)
    userScroll(nextList)
    expect(isFolded()).toBe(true)
  })
})

describe('ExtendableFab waits', () => {
  it('the delay of scrollOptions before it unfolds', () => {
    setup({ scrollOptions: { delay: 1000 } })

    userScroll(document)
    wait(999)
    expect(isFolded()).toBe(true)

    wait(1)
    expect(isFolded()).toBe(false)
  })

  it('a frame for the scroll of a gesture, even with a delay of 0', () => {
    setup({ scrollOptions: { delay: 0 } })

    fireEvent.wheel(document)
    wait(16)
    fireEvent.scroll(document)
    expect(isFolded()).toBe(true)
  })
})

describe('ExtendableFab folds on what the user does', () => {
  it('not on a scroll the page makes itself, however late', () => {
    setup()

    fireEvent.scroll(document)
    expect(isFolded()).toBe(false)

    wait(5000)
    fireEvent.scroll(document)
    expect(isFolded()).toBe(false)
  })

  it('not on a gesture made long before, whatever the delay', () => {
    setup({ scrollOptions: { delay: 1000 } })

    fireEvent.wheel(document)
    wait(251)
    fireEvent.scroll(document)
    expect(isFolded()).toBe(false)
  })

  it('and stays folded while the momentum of a swipe scrolls on', () => {
    setup()

    fireEvent.touchMove(document)
    fireEvent.scroll(document)
    for (let step = 0; step < 5; step += 1) {
      wait(200)
      fireEvent.scroll(document)
      expect(isFolded()).toBe(true)
    }

    wait(250)
    expect(isFolded()).toBe(false)
  })

  it('on a scroll key, not on another key', () => {
    setup()

    fireEvent.keyDown(document, { key: 'a' })
    fireEvent.scroll(document)
    expect(isFolded()).toBe(false)

    fireEvent.keyDown(document, { key: 'PageDown' })
    fireEvent.scroll(document)
    expect(isFolded()).toBe(true)
  })

  it('not on Space pressed on the button itself, which activates it', () => {
    const button = setup()

    fireEvent.keyDown(button, { key: ' ' })
    fireEvent.scroll(document)
    expect(isFolded()).toBe(false)
  })

  it('not on a key the focused element takes, as Space in a field or on another button', () => {
    setup()
    const field = appendBox().appendChild(document.createElement('input'))
    const otherButton = appendBox().appendChild(
      document.createElement('button')
    )

    for (const [target, key] of [
      [field, ' '],
      [field, 'ArrowDown'],
      [otherButton, ' ']
    ] as const) {
      fireEvent.keyDown(target, { key })
      // A list reset to its top by the field or the button
      fireEvent.scroll(document)
      expect(isFolded()).toBe(false)
    }

    // The browser scrolls the page with an arrow pressed on a button
    fireEvent.keyDown(otherButton, { key: 'ArrowDown' })
    fireEvent.scroll(document)
    expect(isFolded()).toBe(true)
  })

  it('not on a wheel or a finger over what it does not follow', () => {
    const list = appendBox()
    setup({ follow: list })

    fireEvent.wheel(screen.getByTestId('outside'))
    fireEvent.scroll(list)
    fireEvent.touchMove(screen.getByTestId('outside'))
    fireEvent.scroll(list)
    expect(isFolded()).toBe(false)
  })

  it('while a pointer is held on what it follows, as on its scrollbar', () => {
    const list = appendBox()
    setup({ follow: list })

    fireEvent.pointerDown(list)
    wait(1000)
    fireEvent.scroll(list)
    expect(isFolded()).toBe(true)

    fireEvent.pointerUp(document)
    wait(1000)
    fireEvent.scroll(list)
    expect(isFolded()).toBe(false)
  })

  it('not while a pointer is held elsewhere', () => {
    const list = appendBox()
    setup({ follow: list })

    fireEvent.pointerDown(screen.getByTestId('outside'))
    fireEvent.scroll(list)
    expect(isFolded()).toBe(false)
  })
})

it('stops listening and clears its timers once unmounted', () => {
  setup()
  userScroll(document)
  cleanup()
  expect(vi.getTimerCount()).toBe(0)

  userScroll(document)
  expect(vi.getTimerCount()).toBe(0)
})
