// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { Globals } from '@react-spring/web'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import React, { useState } from 'react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import BottomSheetTitle from './BottomSheetTitle'
import BottomSheet from './index'
import { BottomSheetProps } from './types'
import { theme } from '../../lib/theme'

beforeAll(() => {
  Globals.assign({ skipAnimation: true })
  // jsdom has no ResizeObserver, which the sheet measures its content with
  globalThis.ResizeObserver ??= class {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  } as unknown as typeof ResizeObserver
})

afterEach(cleanup)

const Opener = (props: Partial<BottomSheetProps>): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <BottomSheet
          {...props}
          onClose={() => {
            props.onClose?.()
            setOpen(false)
          }}
        >
          {props.children ?? <button>Action</button>}
        </BottomSheet>
      )}
    </ThemeProvider>
  )
}

describe('BottomSheet', () => {
  it('is a modal dialog named by its label when it has a backdrop', () => {
    render(<Opener backdrop aria-label="Calendar actions" />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    const sheet = screen.getByRole('dialog', { name: 'Calendar actions' })
    expect(sheet.getAttribute('aria-modal')).toBe('true')
  })

  it('takes the focus when it opens and gives it back when it closes', async () => {
    render(<Opener backdrop aria-label="Calendar actions" />)
    const opener = screen.getByRole('button', { name: 'Open' })
    opener.focus()
    fireEvent.click(opener)

    const sheet = screen.getByRole('dialog', { name: 'Calendar actions' })
    await waitFor(() =>
      expect(sheet.contains(document.activeElement)).toBe(true)
    )

    const backdrop = sheet.querySelector('.MuiBackdrop-root')
    if (backdrop === null) throw new Error('The sheet has no backdrop')
    fireEvent.click(backdrop)

    await waitFor(() => expect(screen.queryByRole('dialog')).toBe(null))
    expect(document.activeElement).toBe(opener)
  })

  it('is no dialog without a backdrop', () => {
    render(<Opener aria-label="Calendar actions" />)
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    screen.getByRole('button', { name: 'Action' })
    expect(screen.queryByRole('dialog')).toBe(null)
  })

  it('is named by its BottomSheetTitle when it has no label', () => {
    render(
      <Opener backdrop>
        <BottomSheetTitle label="Calendar actions" />
      </Opener>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    screen.getByRole('dialog', { name: 'Calendar actions' })
  })

  it('keeps the focus inside while it is open', async () => {
    render(<Opener backdrop aria-label="Calendar actions" />)
    const opener = screen.getByRole('button', { name: 'Open' })
    fireEvent.click(opener)
    const sheet = screen.getByRole('dialog', { name: 'Calendar actions' })
    await waitFor(() =>
      expect(sheet.contains(document.activeElement)).toBe(true)
    )

    opener.focus()

    await waitFor(() =>
      expect(sheet.contains(document.activeElement)).toBe(true)
    )
  })

  it('leaves the focus to a child with autoFocus', async () => {
    render(
      <Opener backdrop aria-label="Calendar actions">
        <button>First</button>
        <button autoFocus>Second</button>
      </Opener>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))

    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Second' })
      )
    )
  })

  it('closes on Escape and gives the focus back', async () => {
    render(<Opener backdrop aria-label="Calendar actions" />)
    const opener = screen.getByRole('button', { name: 'Open' })
    opener.focus()
    fireEvent.click(opener)
    const sheet = screen.getByRole('dialog', { name: 'Calendar actions' })
    await waitFor(() =>
      expect(sheet.contains(document.activeElement)).toBe(true)
    )

    fireEvent.keyDown(document.activeElement ?? sheet, { key: 'Escape' })

    await waitFor(() => expect(screen.queryByRole('dialog')).toBe(null))
    expect(document.activeElement).toBe(opener)
  })

  it('closes only the nested sheet on Escape inside it', async () => {
    render(
      <Opener backdrop aria-label="Parent sheet">
        <Opener backdrop aria-label="Nested sheet" />
      </Opener>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    const parent = screen.getByRole('dialog', { name: 'Parent sheet' })
    fireEvent.click(within(parent).getByRole('button', { name: 'Open' }))
    const nested = screen.getByRole('dialog', { name: 'Nested sheet' })
    await waitFor(() =>
      expect(nested.contains(document.activeElement)).toBe(true)
    )

    fireEvent.keyDown(document.activeElement ?? nested, { key: 'Escape' })

    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: 'Nested sheet' })).toBe(null)
    )
    screen.getByRole('dialog', { name: 'Parent sheet' })
  })
})
