import { describe, expect, it, vi } from 'vitest'

import {
  checkAndSaveShortcut,
  makeHumanReadableFileName,
  makeValidFileName,
  makeValidUrl
} from './shortcutHelpers'

const setup = (
  fileName: string,
  url: string,
  onSave = vi.fn()
): Parameters<typeof checkAndSaveShortcut>[0] => ({
  fileName,
  url,
  isEditing: false,
  onSave,
  onClose: vi.fn(),
  showAlert: vi.fn(),
  t: (key: string): string => key
})

describe('shortcut helpers', () => {
  it('adds a missing protocol to a URL', () => {
    expect(makeValidUrl('twake.app')).toBe('https://twake.app')
    expect(makeValidUrl('http://twake.app')).toBe('http://twake.app')
    expect(makeValidUrl('not a url')).toBe(null)
  })

  it('switches between the file name and the displayed name', () => {
    expect(makeValidFileName('Twake')).toBe('Twake.url')
    expect(makeValidFileName('Twake.url')).toBe('Twake.url')
    expect(makeHumanReadableFileName('Twake.url')).toBe('Twake')
  })

  it('saves a valid shortcut and closes', async () => {
    const options = setup('Twake', 'twake.app')

    await checkAndSaveShortcut(options)

    expect(options.onSave).toHaveBeenCalledWith(
      'Twake.url',
      'https://twake.app'
    )
    expect(options.showAlert).toHaveBeenCalledWith({
      message: 'Dialogs.shortcut.created',
      severity: 'success'
    })
    expect(options.onClose).toHaveBeenCalled()
  })

  it('keeps the dialog open when the URL is invalid', async () => {
    const options = setup('Twake', 'not a url')

    await checkAndSaveShortcut(options)

    expect(options.onSave).not.toHaveBeenCalled()
    expect(options.onClose).not.toHaveBeenCalled()
  })

  it('reports a failed save', async () => {
    const options = setup(
      'Twake',
      'twake.app',
      vi.fn().mockRejectedValue(new Error())
    )

    await checkAndSaveShortcut(options)

    expect(options.showAlert).toHaveBeenCalledWith({
      message: 'Dialogs.shortcut.errored',
      severity: 'error'
    })
    expect(options.onClose).toHaveBeenCalled()
  })
})
