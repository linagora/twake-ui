// @vitest-environment jsdom
import { ThemeProvider, Typography } from '@mui/material'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { theme } from './theme'

describe('the 12 px subtitle3 and subtitle4 variants', () => {
  it('render the same element, so a weight swap keeps the markup', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography variant="subtitle3">unread</Typography>
        <Typography variant="subtitle4">read</Typography>
      </ThemeProvider>
    )

    expect(screen.getByText('unread').tagName).toBe('SPAN')
    expect(screen.getByText('read').tagName).toBe('SPAN')
  })
})
