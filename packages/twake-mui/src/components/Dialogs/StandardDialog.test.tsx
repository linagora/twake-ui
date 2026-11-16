// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { I18n } from 'twake-i18n'

import StandardDialog, { StandardDialogProps } from './StandardDialog'
import { theme } from '../../lib/theme'

afterEach(cleanup)

const setup = (props: Partial<StandardDialogProps>): void => {
  render(
    <ThemeProvider theme={theme}>
      <I18n lang="en" dictRequire={() => ({})}>
        <StandardDialog open title="Title" content="Content" {...props} />
      </I18n>
    </ThemeProvider>
  )
}

describe('StandardDialog', () => {
  it('is labelled by its title', () => {
    setup({})

    expect(screen.queryByRole('dialog', { name: 'Title' })).not.toBe(null)
  })

  it('shows a close and a back button side by side', () => {
    const onClose = vi.fn()
    const onBack = vi.fn()
    setup({ onClose, onBack })

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes from the back button on full screen', () => {
    const onClose = vi.fn()
    setup({ onClose, fullScreen: true })

    expect(screen.queryByRole('button', { name: 'Close' })).toBe(null)

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
