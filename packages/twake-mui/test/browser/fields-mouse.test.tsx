import { InputBase, TextField, ThemeProvider } from '@mui/material'
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { theme } from '../../src/lib/theme'

import { fontSizeOf } from './helpers'

// Real Chromium with a mouse: the media queries of the fields, which jsdom
// does not evaluate. The touch screen has its own project.
// Run: npx vitest run -c test/browser/vitest.config.ts

beforeAll(async () => {
  await page.viewport(1280, 800)
})

afterEach(() => {
  cleanup()
})

describe('fields from md with a mouse', () => {
  it('have 14 px text in a 23 px input', () => {
    expect(matchMedia('(pointer: coarse)').matches).toBe(false)
    render(
      <ThemeProvider theme={theme}>
        <InputBase placeholder="Subject" />
      </ThemeProvider>
    )

    const input = screen.getByRole('textbox')
    expect(fontSizeOf(input)).toBe(14)
    expect(getComputedStyle(input).height).toBe('23px')
  })

  it('have a label as large as their text', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField label="Subject" />
      </ThemeProvider>
    )

    expect(fontSizeOf(screen.getByText('Subject', { selector: 'label' }))).toBe(
      14
    )
  })

  it('have a shrunk label and a notch of 12 px', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TextField label="Subject" defaultValue="Hello" />
      </ThemeProvider>
    )

    const label = screen.getByText('Subject', { selector: 'label' })
    expect(getComputedStyle(label).transform).toBe(
      'matrix(0.857, 0, 0, 0.857, 14, -10)'
    )
    const legend = container.querySelector('legend')
    if (legend === null) throw new Error('No outline notch')
    expect(fontSizeOf(legend)).toBe(12)
  })
})
