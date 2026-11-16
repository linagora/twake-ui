// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { act, cleanup, renderHook, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { I18n } from 'twake-i18n'

import ConfirmDialogProvider from './index'
import { useConfirmDialog } from './useConfirmDialog'
import { theme } from '../../lib/theme'

afterEach(cleanup)

describe('ConfirmDialogProvider', () => {
  it('shows then closes the dialog', () => {
    const { result } = renderHook(() => useConfirmDialog(), {
      wrapper: ({ children }) => (
        <ThemeProvider theme={theme}>
          <I18n lang="en" dictRequire={() => ({})}>
            <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
          </I18n>
        </ThemeProvider>
      )
    })

    act(() => result.current.showConfirmDialog({ title: 'Delete?' }))
    expect(screen.queryByText('Delete?')).not.toBe(null)

    act(() => result.current.closeConfirmDialog())
    expect(screen.queryByText('Delete?')).toBe(null)
  })
})
