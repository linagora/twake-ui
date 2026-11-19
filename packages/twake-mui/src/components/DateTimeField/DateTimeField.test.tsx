// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { I18n } from 'twake-i18n'
import { afterEach, describe, expect, it, vi } from 'vitest'

import DateTimeField, { DateTimeFieldProps } from './index'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const setup = (props: DateTimeFieldProps): void => {
  render(
    <ThemeProvider theme={theme}>
      <I18n lang="en" dictRequire={() => ({})}>
        <DateTimeField {...props} />
      </I18n>
    </ThemeProvider>
  )
}

describe('DateTimeField', () => {
  it('opens the picker of the browser from its named button', () => {
    const showPicker = vi.fn()
    HTMLInputElement.prototype.showPicker = showPicker
    setup({ type: 'date', label: 'Start date' })

    fireEvent.click(screen.getByRole('button', { name: 'Choose a date' }))

    expect(showPicker).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(screen.getByLabelText('Start date'))
  })

  it('names the button of a time field, or as it is told', () => {
    setup({ type: 'time' })
    expect(screen.getByRole('button', { name: 'Choose a time' })).toBeTruthy()
    cleanup()

    setup({ type: 'time', pickerLabel: 'Select the end time' })
    expect(
      screen.getByRole('button', { name: 'Select the end time' })
    ).toBeTruthy()
  })

  it('disables its button with the field', () => {
    setup({ type: 'date', disabled: true })
    expect(
      (
        screen.getByRole('button', {
          name: 'Choose a date'
        }) as HTMLButtonElement
      ).disabled
    ).toBe(true)
  })
})
