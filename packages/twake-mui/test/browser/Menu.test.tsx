import { MenuItem, ThemeProvider } from '@mui/material'
import { cleanup, render, screen } from '@testing-library/react'
import React, { useRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import ListItemText from '../../src/components/ListItemText'
import Menu from '../../src/components/Menu'
import { theme } from '../../src/lib/theme'

// Real Chromium: the paper must really grow for MUI to place it wrong

const MenuAtRightEdge = (): React.ReactElement => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  return (
    <ThemeProvider theme={theme}>
      <button
        ref={anchorRef}
        type="button"
        style={{ position: 'fixed', top: 0, right: 0 }}
      >
        More
      </button>
      <Menu
        open
        anchorEl={(): HTMLButtonElement => anchorRef.current!}
        transitionDuration={0}
      >
        <MenuItem>
          <ListItemText primary="Archive" />
        </MenuItem>
      </Menu>
    </ThemeProvider>
  )
}

const nextFrames = (): Promise<void> =>
  new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  )

describe('Menu', () => {
  afterEach(cleanup)

  it('stays on screen when its content grows after it opens', async () => {
    render(<MenuAtRightEdge />)
    // Written in the DOM, as a browser translating the page does: React does
    // not render again, so nothing tells MUI to place the menu again
    ;(await screen.findByText('Archive')).textContent =
      'A label that a translated page makes much longer than it was'
    await nextFrames()

    const paper = screen.getByRole('menu').parentElement!
    expect(paper.getBoundingClientRect().right).toBeLessThanOrEqual(
      window.innerWidth - 16
    )
  })
})
