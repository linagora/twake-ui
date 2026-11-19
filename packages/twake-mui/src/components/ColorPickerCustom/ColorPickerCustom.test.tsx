// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { I18n } from 'twake-i18n'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ColorPickerCustom, { ColorPickerCustomProps } from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const setup = (props: ColorPickerCustomProps): void => {
  render(
    <ThemeProvider theme={theme}>
      <I18n lang="en" dictRequire={() => ({})}>
        <ColorPickerCustom {...props} />
      </I18n>
    </ThemeProvider>
  )
}

const field = (): HTMLElement => screen.getByRole('textbox', { name: 'Hex' })

const type = (value: string): void => {
  fireEvent.change(field(), { target: { value } })
}

describe('ColorPickerCustom', () => {
  it('shows the color it opens with in its Hex field', () => {
    setup({ color: '#aabbcc' })

    expect(field()).toHaveProperty('value', '#AABBCC')
  })

  it('saves the color typed, in capitals', () => {
    const onSave = vi.fn()
    setup({ color: '#AABBCC', onSave })

    type('#12ab34')
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onSave).toHaveBeenCalledWith('#12AB34')
  })

  it('reads 3 digits as their #RRGGBB form', () => {
    const onSave = vi.fn()
    setup({ color: '#AABBCC', onSave })

    type('#1a3')
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onSave).toHaveBeenCalledWith('#11AA33')
  })

  it('says a color it cannot read and does not save it', () => {
    const onSave = vi.fn()
    setup({ color: '#AABBCC', onSave })

    type('#12')
    expect(field().getAttribute('aria-invalid')).toBe('true')
    expect(screen.getByText('Enter a color as #RRGGBB or #RGB')).toBeTruthy()
    const save = screen.getByRole('button', { name: 'Save' })
    expect(save).toHaveProperty('disabled', true)
    fireEvent.submit(field())
    expect(onSave).not.toHaveBeenCalled()
  })

  it('saves on Enter in its field', () => {
    const onSave = vi.fn()
    setup({ color: '#AABBCC', onSave })

    fireEvent.submit(field())
    expect(onSave).toHaveBeenCalledWith('#AABBCC')
  })

  it('gives back the color it opened with on cancel', () => {
    const onCancel = vi.fn()
    setup({ color: '#AABBCC', onCancel })

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledWith('#AABBCC')
  })

  it('shows no error before anything is typed, with nothing to save', () => {
    setup({})

    expect(field().getAttribute('aria-invalid')).toBe('false')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveProperty(
      'disabled',
      true
    )
  })

  it('cancels on Escape', () => {
    const onCancel = vi.fn()
    setup({ color: '#AABBCC', onCancel })

    fireEvent.keyDown(field(), { key: 'Escape' })
    expect(onCancel).toHaveBeenCalledWith('#AABBCC')
  })
})
