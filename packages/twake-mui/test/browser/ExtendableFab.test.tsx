import { ThemeProvider } from '@mui/material'
import { cleanup, render, screen } from '@testing-library/react'
import React, { useRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cdp, userEvent } from 'vitest/browser'

import { Plus } from '@linagora/twake-icons'

import ExtendableFab from '../../src/components/ExtendableFab'
import { theme } from '../../src/lib/theme'

// Real Chromium: a real wheel and scroll, and the label animation frame by frame

const DELAY = 100

const List = ({ delay = DELAY }: { delay?: number }): React.ReactElement => {
  const listRef = useRef<HTMLDivElement>(null)
  return (
    <ThemeProvider theme={theme}>
      <div
        ref={listRef}
        data-testid="list"
        style={{ height: 200, overflowY: 'auto' }}
      >
        <div style={{ height: 2000 }} />
      </div>
      <ExtendableFab
        label="Create"
        icon={Plus}
        follow={listRef}
        scrollOptions={{ delay }}
      />
    </ThemeProvider>
  )
}

const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

/** Widths of the button on each frame while it unfolds after a scroll */
const widthsAfterScroll = async (): Promise<{
  folded: number
  frames: number[]
}> => {
  render(<List />)
  const button = screen.getByRole('button', { name: 'Create' })

  // Turns of the wheel until the button is a square
  const list = screen.getByTestId('list')
  const isSquare = (): boolean => {
    const { width, height } = button.getBoundingClientRect()
    return width === height
  }
  for (let step = 0; step < 120 && !isSquare(); step += 1) {
    await userEvent.wheel(list, { delta: { y: 10 } })
  }
  expect(isSquare()).toBe(true)
  const folded = button.getBoundingClientRect().width

  const frames: number[] = []
  const end = performance.now() + DELAY + 600
  while (performance.now() < end) {
    await new Promise(requestAnimationFrame)
    frames.push(button.getBoundingClientRect().width)
  }
  return { folded, frames }
}

const emulateReducedMotion = async (
  value: 'reduce' | 'no-preference'
): Promise<void> => {
  await cdp().send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value }]
  })
}

afterEach(async () => {
  cleanup()
  await emulateReducedMotion('no-preference')
})

describe('ExtendableFab', () => {
  it('folds while the scrollbar of its list is dragged', async () => {
    render(<List delay={5000} />)
    const button = screen.getByRole('button', { name: 'Create' })
    const list = screen.getByTestId('list')
    const { width } = list.getBoundingClientRect()
    // The scrollbar takes the room between the client width and the box; its
    // thumb starts under the arrow at its top
    const thumb = { x: (width + list.clientWidth) / 2, y: 24 }
    expect(width - list.clientWidth).toBeGreaterThan(0)

    await userEvent.dragAndDrop(list, list, {
      sourcePosition: thumb,
      targetPosition: { x: thumb.x, y: 150 }
    })

    expect(list.scrollTop).toBeGreaterThan(0)
    await expect
      .poll(() => {
        const { width, height } = button.getBoundingClientRect()
        return width - height
      })
      .toBe(0)
  })

  it('keeps the icon apart from the label in a right-to-left page', () => {
    render(
      <div dir="rtl">
        <List />
      </div>
    )
    const icon = screen
      .getByRole('button', { name: 'Create' })
      .querySelector('svg') as SVGElement
    const text = screen.getByText('Create')

    expect(
      icon.getBoundingClientRect().left - text.getBoundingClientRect().right
    ).toBeGreaterThanOrEqual(8)
  })

  it('stays extended when the list scrolls itself, as a list restoring its position does', async () => {
    render(<List />)
    const button = screen.getByRole('button', { name: 'Create' })
    const list = screen.getByTestId('list')
    const { width } = button.getBoundingClientRect()

    for (let step = 1; step <= 10; step += 1) {
      list.scrollTop = step * 50
      await new Promise(requestAnimationFrame)
    }
    await sleep(DELAY)

    expect(list.scrollTop).toBe(500)
    expect(button.getBoundingClientRect().width).toBe(width)
  })

  it('folds to a square while its list scrolls, then grows back step by step', async () => {
    const { folded, frames } = await widthsAfterScroll()
    const unfolded = frames[frames.length - 1]
    const between = frames.filter(width => width > folded && width < unfolded)

    expect(unfolded).toBeGreaterThan(folded + 20)
    expect(between.length).toBeGreaterThanOrEqual(3)
    // The label itself slides, not only its margin
    const quarter = (unfolded - folded) / 4
    expect(between).toContainEqual(
      expect.toSatisfy<number>(
        width => width > folded + quarter && width < unfolded - quarter
      )
    )
    for (let index = 1; index < frames.length; index += 1)
      expect(frames[index]).toBeGreaterThanOrEqual(frames[index - 1])
  })

  it('unfolds at once when the system asks for less motion', async () => {
    await emulateReducedMotion('reduce')
    const { folded, frames } = await widthsAfterScroll()
    const unfolded = frames[frames.length - 1]

    expect(unfolded).toBeGreaterThan(folded + 20)
    expect(frames.filter(width => width > folded && width < unfolded)).toEqual(
      []
    )
  })
})
