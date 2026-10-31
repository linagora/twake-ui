// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { COLORS, normalizeHexColor } from './helpers'
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

  it('draws an extra color once, whatever its form', () => {
    setup({ extraColors: ['#abc', '#AABBCC', 'aabbcc'] })

    expect(screen.getAllByRole('button')).toHaveLength(COLORS.length + 1)
    expect(screen.queryByRole('button', { name: '#AABBCC' })).not.toBe(null)
  })

  it.each([[null], ['']])(
    'renders with %j as the selected color, with its field closed',
    selectedColor => {
      setup({
        selectedColor: selectedColor as unknown as string,
        customColorProps: { enabled: true, input: { label: 'Hexadecimal' } }
      })

      expect(screen.queryByRole('textbox')).toBe(null)
      expect(screen.getAllByRole('button').length).toBe(COLORS.length + 1)
    }
  )

  it.each([
    ['#abc', '#AABBCC'],
    ['ABC', '#AABBCC'],
    [' #aAbBcC ', '#AABBCC'],
    ['aabbcc', '#AABBCC'],
    ['', null],
    ['#', null],
    ['#12', null],
    ['#1234', null],
    ['#1234567', null],
    ['##123', null],
    ['#ggg', null],
    ['red', null]
  ])('reads %j as %j', (text, color) => {
    expect(normalizeHexColor(text)).toBe(color)
  })

  describe('with a custom input', () => {
    const input = { label: 'Hexadecimal', errorText: 'Not a color' }
    const custom = { enabled: true, 'aria-label': 'Custom color' }
    const openField = (): HTMLElement => {
      fireEvent.click(screen.getByRole('button', { name: 'Custom color' }))
      return screen.getByRole('textbox', { name: 'Hexadecimal' })
    }

    it('shows no field without the input option', () => {
      setup({ customColorProps: custom })

      fireEvent.click(screen.getByRole('button', { name: 'Custom color' }))
      expect(screen.queryByRole('textbox')).toBe(null)
      expect(
        screen
          .getByRole('button', { name: 'Custom color' })
          .getAttribute('aria-pressed')
      ).toBe(null)
    })

    it('gives a typed color to onClick, as #RRGGBB and only once it is one', () => {
      const onClick = vi.fn()
      setup({ onClick, customColorProps: { ...custom, input } })

      const field = openField()
      fireEvent.change(field, { target: { value: '#12' } })
      expect(onClick).not.toHaveBeenCalled()
      fireEvent.change(field, { target: { value: 'c0ffee' } })
      expect(onClick).toHaveBeenCalledWith('#C0FFEE')
      fireEvent.change(field, { target: { value: 'abc' } })
      expect(onClick).toHaveBeenLastCalledWith('#AABBCC')
    })

    it('opens on a selected color out of the list, not on one in it', () => {
      setup({
        selectedColor: '#aabbcc',
        customColorProps: { ...custom, input }
      })
      expect(
        (
          screen.getByRole('textbox', {
            name: 'Hexadecimal'
          }) as HTMLInputElement
        ).value
      ).toBe('#aabbcc')
      cleanup()

      setup({
        selectedColor: '#273891',
        customColorProps: { ...custom, input }
      })
      expect(screen.queryByRole('textbox')).toBe(null)
    })

    it('stays closed on an extra color', () => {
      setup({
        selectedColor: '#617ADB',
        extraColors: ['#617ADB'],
        customColorProps: { ...custom, input }
      })

      expect(screen.queryByRole('textbox')).toBe(null)
    })

    it('closes when a swatch is picked, and tells which one is pressed', () => {
      const onClick = vi.fn()
      const onOpenChange = vi.fn()
      setup({
        selectedColor: '#273891',
        onClick,
        customColorProps: { ...custom, input: { ...input, onOpenChange } }
      })

      openField()
      const button = screen.getByRole('button', { name: 'Custom color' })
      const swatch = screen.getByRole('button', { name: '#273891' })
      expect(onOpenChange).toHaveBeenLastCalledWith(true)
      expect(button.getAttribute('aria-pressed')).toBe('true')
      expect(swatch.getAttribute('aria-pressed')).toBe('false')

      fireEvent.click(swatch)
      expect(onOpenChange).toHaveBeenLastCalledWith(false)
      expect(onClick).toHaveBeenCalledWith('#273891')
      expect(screen.queryByRole('textbox')).toBe(null)
      expect(button.getAttribute('aria-pressed')).toBe('false')
      expect(swatch.getAttribute('aria-pressed')).toBe('true')
    })

    it('follows a controlled open', () => {
      setup({
        customColorProps: { ...custom, input: { ...input, open: true } }
      })
      expect(screen.queryByRole('textbox')).not.toBe(null)
      cleanup()

      setup({
        selectedColor: '#aabbcc',
        customColorProps: { ...custom, input: { ...input, open: false } }
      })
      expect(screen.queryByRole('textbox')).toBe(null)
    })

    it('tells its validity, and is valid again once closed', () => {
      const onValidityChange = vi.fn()
      setup({
        customColorProps: { ...custom, input: { ...input, onValidityChange } }
      })
      expect(onValidityChange).toHaveBeenLastCalledWith(true)

      const field = openField()
      expect(onValidityChange).toHaveBeenLastCalledWith(false)
      fireEvent.change(field, { target: { value: '#123' } })
      expect(onValidityChange).toHaveBeenLastCalledWith(true)
      fireEvent.change(field, { target: { value: '#12' } })
      expect(onValidityChange).toHaveBeenLastCalledWith(false)
      fireEvent.click(screen.getByRole('button', { name: '#273891' }))
      expect(onValidityChange).toHaveBeenLastCalledWith(true)
    })

    it('hands its field to inputRef, to move the focus to it', () => {
      const inputRef = React.createRef<HTMLInputElement>()
      setup({
        customColorProps: { ...custom, input: { ...input, inputRef } }
      })

      const field = openField()
      expect(inputRef.current).toBe(field)
      inputRef.current?.focus()
      expect(document.activeElement).toBe(field)
    })

    it('names the custom button after its field, unless told otherwise', () => {
      setup({ customColorProps: { enabled: true, input } })
      expect(screen.queryByRole('button', { name: 'Hexadecimal' })).not.toBe(
        null
      )
      cleanup()

      setup({ customColorProps: { ...custom, input } })
      expect(screen.queryByRole('button', { name: 'Hexadecimal' })).toBe(null)
      expect(screen.queryByRole('button', { name: 'Custom color' })).not.toBe(
        null
      )
    })

    it('shows helperText, replaced by the error', () => {
      setup({
        customColorProps: {
          ...custom,
          input: { ...input, helperText: 'Format #RRGGBB' }
        }
      })
      expect(openField().getAttribute('aria-describedby')).not.toBe(null)
      expect(screen.queryByText('Format #RRGGBB')).not.toBe(null)
      cleanup()

      setup({
        customColorProps: {
          ...custom,
          input: { ...input, helperText: 'Format #RRGGBB', showError: true }
        }
      })
      openField()
      expect(screen.queryByText('Format #RRGGBB')).toBe(null)
    })

    it('keeps helperText and no invalid state with showError but no errorText', () => {
      setup({
        customColorProps: {
          ...custom,
          input: { label: 'Hexadecimal', helperText: 'Hint', showError: true }
        }
      })

      expect(openField().getAttribute('aria-invalid')).toBe('false')
      expect(screen.queryByText('Hint')).not.toBe(null)
      expect(screen.queryByRole('alert')).toBe(null)
    })

    it('fills its field with the selected color when opened from outside', () => {
      const view = (
        open: boolean,
        selectedColor: string
      ): React.ReactElement => (
        <ThemeProvider theme={theme}>
          <ColorList
            selectedColor={selectedColor}
            customColorProps={{ ...custom, input: { ...input, open } }}
          />
        </ThemeProvider>
      )
      const { rerender } = render(view(false, '#273891'))
      rerender(view(false, '#7E57E3'))
      rerender(view(true, '#7E57E3'))

      expect(
        (
          screen.getByRole('textbox', {
            name: 'Hexadecimal'
          }) as HTMLInputElement
        ).value
      ).toBe('#7E57E3')
    })

    it('tells its validity once per change, even with an inline callback', () => {
      const calls = vi.fn()
      const view = (): React.ReactElement => (
        <ThemeProvider theme={theme}>
          <ColorList
            customColorProps={{
              ...custom,
              input: { ...input, onValidityChange: valid => calls(valid) }
            }}
          />
        </ThemeProvider>
      )
      const { rerender } = render(view())
      rerender(view())
      rerender(view())

      expect(calls).toHaveBeenCalledTimes(1)
    })

    it('shows the error only with showError', () => {
      setup({ customColorProps: { ...custom, input } })
      const field = openField()
      fireEvent.change(field, { target: { value: '#12' } })
      expect(screen.queryByRole('alert')).toBe(null)
      cleanup()

      setup({
        customColorProps: { ...custom, input: { ...input, showError: true } }
      })
      expect(openField().getAttribute('aria-invalid')).toBe('true')
      expect(screen.getByRole('alert').textContent).toBe('Not a color')
    })
  })
})
