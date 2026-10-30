// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { COLORS } from './helpers'
import ColorList, { ColorListProps } from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const setup = (props: ColorListProps): void => {
  render(
    <ThemeProvider theme={theme}>
      <ColorList {...props} />
    </ThemeProvider>
  )
}

describe('ColorList', () => {
  it('lets a keyboard reach and pick a color', () => {
    const onClick = vi.fn()
    setup({ onClick })

    const color = screen.getByRole('button', { name: '#273891' })
    expect(color.tabIndex).toBe(0)
    fireEvent.keyDown(color, { key: 'Enter' })
    expect(onClick).toHaveBeenCalledWith('#273891')
  })

  it('names its colors and tells the selected one, whatever its case', () => {
    setup({
      selectedColor: '#7e57e3',
      getColorLabel: color => (color === '#7E57E3' ? 'Purple' : color)
    })

    expect(
      screen
        .getByRole('button', { name: 'Purple' })
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(
      screen
        .getByRole('button', { name: '#273891' })
        .getAttribute('aria-pressed')
    ).toBe('false')
  })

  it('passes its props to the custom color button', () => {
    const onClick = vi.fn()
    setup({
      customColorProps: {
        enabled: true,
        onClick,
        'aria-label': 'Custom color',
        'data-testid': 'custom'
      }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Custom color' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('custom')).not.toBe(null)
  })

  it('draws the extra colors after its own, each once and in capitals', () => {
    const onClick = vi.fn()
    setup({ extraColors: ['#617adb', '#273891', '#617ADB'], onClick })

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(COLORS.length + 1)
    expect(buttons.at(-1)?.getAttribute('aria-label')).toBe('#617ADB')
    fireEvent.click(screen.getByRole('button', { name: '#617ADB' }))
    expect(onClick).toHaveBeenCalledWith('#617ADB')
  })

  it('draws only its own colors without extra colors', () => {
    setup({})

    expect(screen.getAllByRole('button')).toHaveLength(COLORS.length)
  })
})
