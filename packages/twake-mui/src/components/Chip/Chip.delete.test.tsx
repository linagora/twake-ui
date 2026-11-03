// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import Chip from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const deleteButton = (
  size: 'small' | 'medium',
  color: 'default' | 'primary' = 'default'
): HTMLElement => {
  render(
    <ThemeProvider theme={theme}>
      <Chip
        label="Alice"
        size={size}
        color={color}
        onDelete={() => undefined}
      />
    </ThemeProvider>
  )
  const icon = screen
    .getByText('Alice')
    .parentElement?.querySelector('.MuiChip-deleteIcon')
  if (!(icon instanceof HTMLElement)) throw new Error('No delete button')
  return icon
}

describe('Chip delete button', () => {
  it.each(['small', 'medium'] as const)(
    'keeps its default %s button a target of 24 px at least',
    size => {
      const button = deleteButton(size)
      const padding = parseFloat(getComputedStyle(button).paddingLeft)
      const svg = button.querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('16')
      expect(16 + 2 * padding).toBeGreaterThanOrEqual(24)
    }
  )

  it('takes the icon colour of the theme on a default chip only', () => {
    expect(getComputedStyle(deleteButton('medium')).color).toBe(
      'var(--twake-palette-text-icon)'
    )
    cleanup()
    expect(getComputedStyle(deleteButton('medium', 'primary')).color).not.toBe(
      'var(--twake-palette-text-icon)'
    )
  })
})
