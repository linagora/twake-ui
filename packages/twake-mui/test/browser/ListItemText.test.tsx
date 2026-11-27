import { ThemeProvider } from '@mui/material'
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'

import ListItemText from '../../src/components/ListItemText'
import { theme } from '../../src/lib/theme'

// Real Chromium: whether a text is cut depends on layout

const LONG = 'Move the conversation to the trash folder of this account'

const Item = ({
  primary,
  ellipsis
}: {
  primary: string
  ellipsis?: boolean
}): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <div style={{ width: 120 }}>
      <ListItemText primary={primary} secondary={primary} ellipsis={ellipsis} />
    </div>
  </ThemeProvider>
)

describe('ListItemText', () => {
  afterEach(cleanup)

  it('shows a cut text in full on hover', async () => {
    render(<Item primary={LONG} />)
    const [primary, secondary] = screen.getAllByText(LONG)
    await userEvent.hover(primary)
    await userEvent.hover(secondary)

    expect(primary.title).toBe(LONG)
    expect(secondary.title).toBe(LONG)
  })

  it('gives no title to a text that fits', async () => {
    render(<Item primary="Archive" />)
    const [primary] = screen.getAllByText('Archive')
    await userEvent.hover(primary)

    expect(primary.hasAttribute('title')).toBe(false)
  })

  it('drops the title when ellipsis is turned off under the pointer', async () => {
    const { rerender } = render(<Item primary={LONG} />)
    const [primary] = screen.getAllByText(LONG)
    await userEvent.hover(primary)
    expect(primary.title).toBe(LONG)
    rerender(<Item primary={LONG} ellipsis={false} />)

    expect(primary.hasAttribute('title')).toBe(false)
  })

  it('drops the title when the text changes under the pointer', async () => {
    const { rerender } = render(<Item primary={LONG} />)
    const [primary] = screen.getAllByText(LONG)
    await userEvent.hover(primary)
    expect(primary.title).toBe(LONG)
    rerender(<Item primary="Archive" />)

    expect(primary.hasAttribute('title')).toBe(false)
  })
})
