// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { I18n } from 'twake-i18n'

import SaveToDriveButton, { type SaveToDriveButtonProps } from './index.js'
import { theme } from '../../lib/theme.js'

afterEach(cleanup)

type Props = Partial<SaveToDriveButtonProps> &
  Pick<SaveToDriveButtonProps, 'status'>

const ui = (
  props: Props,
  onSave: SaveToDriveButtonProps['onSave'],
  lang = 'en'
): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <I18n lang={lang} dictRequire={() => ({})}>
      <SaveToDriveButton onSave={onSave} {...props} />
    </I18n>
  </ThemeProvider>
)

const setup = (
  props: Props,
  lang = 'en'
): {
  onSave: SaveToDriveButtonProps['onSave']
  rerender: (next: Props) => void
} => {
  const onSave = vi.fn()
  const { rerender } = render(ui(props, onSave, lang))
  return { onSave, rerender: next => rerender(ui(next, onSave, lang)) }
}

describe('SaveToDriveButton', () => {
  it('saves the file, with the click event to stop it from reaching a clickable parent', () => {
    const { onSave } = setup({ status: 'idle' })

    fireEvent.click(screen.getByRole('button', { name: 'Save to my Drive' }))

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click' })
    )
  })

  it('keeps the focus and ignores clicks while it saves', () => {
    const { onSave } = setup({ status: 'saving' })
    const button = screen.getByRole('button', { name: 'Saving to Drive…' })
    button.focus()

    fireEvent.click(button)

    expect(document.activeElement).toBe(button)
    expect(onSave).not.toHaveBeenCalled()
  })

  it('keeps a click while it saves from reaching a clickable parent', () => {
    const onParentClick = vi.fn()
    render(
      <ThemeProvider theme={theme}>
        <I18n lang="en" dictRequire={() => ({})}>
          <div onClick={onParentClick}>
            <SaveToDriveButton status="saving" onSave={vi.fn()} />
          </div>
        </I18n>
      </ThemeProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Saving to Drive…' }))

    expect(onParentClick).not.toHaveBeenCalled()
  })

  it('opens the saved file when it can', () => {
    const onOpen = vi.fn()
    const { onSave } = setup({ status: 'saved', onOpen })

    fireEvent.click(screen.getByRole('button', { name: 'See in Drive' }))

    expect(onOpen).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click' })
    )
    expect(onSave).not.toHaveBeenCalled()
  })

  it('only says the file is saved when it cannot open it', () => {
    setup({ status: 'saved' })

    expect(screen.getByRole('status').textContent).toBe(
      'File saved to your Drive'
    )
    expect(screen.queryByRole('button')).toBe(null)
  })

  it('announces the save in a live region that was there before it ended', () => {
    const { rerender } = setup({ status: 'saving' })
    const region = screen.getByRole('status')
    expect(region.textContent).toBe('')

    rerender({ status: 'saved' })

    expect(screen.getByRole('status')).toBe(region)
    expect(region.textContent).toBe('File saved to your Drive')
  })

  it('keeps the class and test id of the app once saved', () => {
    setup({
      status: 'saved',
      className: 'chip-action',
      ...{ 'data-testid': 'save-to-drive' }
    })

    expect(screen.getByTestId('save-to-drive').className).toContain(
      'chip-action'
    )
  })

  it('speaks the language of the app', () => {
    setup({ status: 'idle' }, 'fr')

    screen.getByRole('button', { name: 'Enregistrer dans mon Drive' })
  })
})
