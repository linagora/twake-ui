import { InputBase, TextField, ThemeProvider } from '@mui/material'
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { I18n } from 'twake-i18n'

import SearchBar from '../../src/components/SearchBar'
import { theme } from '../../src/lib/theme'

import { fontSizeOf, setTouch } from './helpers'

// Real Chromium as a touch screen: iOS Safari zooms the page into a field
// whose text is under 16 px. Touch emulation cannot be undone, so this file
// runs in a browser of its own (the `browser-touch` project).
// Run: npx vitest run -c test/browser/vitest.config.ts

const renderThemed = (ui: React.ReactElement): ReturnType<typeof render> =>
  render(
    <ThemeProvider theme={theme}>
      <I18n lang="en" dictRequire={() => ({})}>
        {ui}
      </I18n>
    </ThemeProvider>
  )

beforeAll(async () => {
  await setTouch(true)
})

afterEach(() => {
  cleanup()
})

describe('SearchBar small on a touch phone', () => {
  it('has text of 16 px at least', async () => {
    await page.viewport(375, 800)
    expect(matchMedia('(pointer: coarse)').matches).toBe(true)
    renderThemed(<SearchBar size="small" placeholder="Search" />)

    expect(fontSizeOf(screen.getByRole('textbox'))).toBeGreaterThanOrEqual(16)
  })
})

// A phone held sideways (874 px), or a tablet
describe('fields from md on a touch screen', () => {
  beforeAll(async () => {
    await page.viewport(874, 402)
  })

  it('keep 16 px text', () => {
    expect(matchMedia('(pointer: coarse)').matches).toBe(true)
    renderThemed(<InputBase placeholder="Subject" />)

    expect(fontSizeOf(screen.getByRole('textbox'))).toBe(16)
  })

  it('keep a label as large as their text', () => {
    renderThemed(<TextField label="Subject" />)

    expect(fontSizeOf(screen.getByText('Subject', { selector: 'label' }))).toBe(
      fontSizeOf(screen.getByRole('textbox'))
    )
  })

  it("keep MUI's own shrunk label and its notch of 12 px", () => {
    const { container } = renderThemed(
      <TextField label="Subject" defaultValue="Hello" />
    )

    const label = screen.getByText('Subject', { selector: 'label' })
    expect(getComputedStyle(label).transform).toBe(
      'matrix(0.75, 0, 0, 0.75, 14, -9)'
    )
    const legend = container.querySelector('legend')
    if (legend === null) throw new Error('No outline notch')
    expect(fontSizeOf(legend)).toBe(12)
  })
})
