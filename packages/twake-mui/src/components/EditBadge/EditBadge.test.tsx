// @vitest-environment jsdom
import { ThemeProvider } from '@mui/material'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { I18n } from 'twake-i18n'

import EditBadge from './index'
import { theme } from '../../lib/theme'
import AlertProvider from '../../providers/AlertProvider'

afterEach(cleanup)

const setup = ({
  onUpload = vi.fn(),
  onDelete = vi.fn()
}: {
  onUpload?: (file: File) => unknown
  onDelete?: () => unknown
}): HTMLInputElement => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <I18n lang="en" dictRequire={() => ({})}>
        <AlertProvider>
          <EditBadge
            src={timestamp => `avatar?t=${timestamp}`}
            onUpload={onUpload}
            onDelete={onDelete}
            componentsProps={{ button: { 'aria-label': 'Edit avatar' } }}
          >
            <img alt="Avatar" />
          </EditBadge>
        </AlertProvider>
      </I18n>
    </ThemeProvider>
  )
  return container.querySelector('input[type="file"]') as HTMLInputElement
}

const pick = (input: HTMLInputElement, file: File): void => {
  fireEvent.change(input, { target: { files: [file] } })
}

describe('EditBadge', () => {
  it('refuses a file over the size limit', async () => {
    const onUpload = vi.fn()
    const input = setup({ onUpload })
    const file = new File(['x'], 'big.png', { type: 'image/png' })
    Object.defineProperty(file, 'size', { value: 5 * 1024 * 1024 + 1 })

    pick(input, file)

    await screen.findByText('The file size limit is 5MB.')
    expect(onUpload).not.toHaveBeenCalled()
  })

  it('refuses a file of an unsupported type', async () => {
    const onUpload = vi.fn()
    const input = setup({ onUpload })

    pick(input, new File(['x'], 'avatar.svg', { type: 'image/svg+xml' }))

    await screen.findByText('The file type is not supported. Please try again.')
    expect(onUpload).not.toHaveBeenCalled()
  })

  it('uploads a valid file and refreshes the image', async () => {
    const onUpload = vi.fn()
    const input = setup({ onUpload })
    const file = new File(['x'], 'avatar.png', { type: 'image/png' })

    pick(input, file)

    await screen.findByText('Avatar updated successfully')
    expect(onUpload).toHaveBeenCalledWith(file)
    expect(screen.getByAltText('Avatar').getAttribute('src')).toMatch(
      /^avatar\?t=\d+$/
    )
  })

  it('removes the image once deleted', async () => {
    setup({})

    fireEvent.click(screen.getByRole('button', { name: 'Edit avatar' }))
    fireEvent.click(await screen.findByText('Delete'))

    await screen.findByText('Avatar deleted successfully')
    expect(screen.getByAltText('Avatar').getAttribute('src')).toBe(null)
  })

  it('keeps the image when the deletion fails', async () => {
    setup({ onDelete: () => Promise.reject(new Error('nope')) })

    fireEvent.click(screen.getByRole('button', { name: 'Edit avatar' }))
    fireEvent.click(await screen.findByText('Delete'))

    await screen.findByText('The avatar deletion has failed. Please try again.')
    await waitFor(() =>
      expect(screen.getByAltText('Avatar').getAttribute('src')).toMatch(
        /^avatar\?t=/
      )
    )
  })
})
