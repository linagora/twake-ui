// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React, { useState } from 'react'
import { I18n } from 'twake-i18n'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ColorPicker from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const Picker: React.FC<{ onChange: (color: string) => void }> = ({
  onChange
}) => {
  const [color, setColor] = useState('#273891')
  return (
    <ColorPicker
      color={color}
      onChange={picked => {
        setColor(picked)
        onChange(picked)
      }}
    />
  )
}

const setup = (onChange: (color: string) => void): void => {
  render(
    <ThemeProvider theme={theme}>
      <I18n lang="en" dictRequire={() => ({})}>
        <Picker onChange={onChange} />
      </I18n>
    </ThemeProvider>
  )
}

const customButton = (): HTMLElement =>
  screen.getByRole('button', { name: 'Custom color' })

describe('ColorPicker', () => {
  it('picks a color of the list', () => {
    const onChange = vi.fn()
    setup(onChange)

    fireEvent.click(screen.getByRole('button', { name: '#7E57E3' }))
    expect(onChange).toHaveBeenCalledWith('#7E57E3')
  })

  it('opens the custom picker on its field, saves its color and comes back to its button', () => {
    const onChange = vi.fn()
    setup(onChange)

    fireEvent.click(customButton())
    const field = screen.getByRole('textbox', { name: 'Hex' })
    expect(document.activeElement).toBe(field)
    fireEvent.change(field, { target: { value: '#12ab34' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onChange).toHaveBeenCalledWith('#12AB34')
    expect(document.activeElement).toBe(customButton())
    expect(customButton().getAttribute('aria-pressed')).toBe('true')
  })

  it('comes back to its button on cancel, the color unchanged', () => {
    const onChange = vi.fn()
    setup(onChange)

    fireEvent.click(customButton())
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onChange).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(customButton())
    expect(customButton().getAttribute('aria-pressed')).toBe('false')
  })
})
