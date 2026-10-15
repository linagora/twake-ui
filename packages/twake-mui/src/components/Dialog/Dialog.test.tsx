// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { Dialog, DialogBackdrop } from './index'
import { TwakeMuiThemeProvider } from '../ThemeProvider'

const renderDialog = (backdrop?: DialogBackdrop): HTMLElement => {
  render(
    <TwakeMuiThemeProvider>
      <Dialog open backdrop={backdrop} data-testid="dialog">
        content
      </Dialog>
    </TwakeMuiThemeProvider>
  )
  return screen.getByTestId('dialog')
}

describe('Dialog backdrop', () => {
  afterEach(cleanup)

  it('marks the dialog when light', () => {
    expect(renderDialog('light').classList).toContain('backdropLight')
  })

  it.each([undefined, 'dark' as const])(
    'keeps the MUI veil when %s',
    backdrop => {
      expect(renderDialog(backdrop).classList).not.toContain('backdropLight')
    }
  )
})
