import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, Mock, vi } from 'vitest'

/**
 * Gives the app window and a frame a clipboard each, to check which one a
 * copy writes to, and restores the app clipboard after each test
 */
export const setupFrameClipboard = (): {
  getFrame: () => HTMLIFrameElement
  appWrite: Mock
  frameWrite: Mock
} => {
  const appClipboard = Object.getOwnPropertyDescriptor(
    window.navigator,
    'clipboard'
  )
  const appWrite = vi.fn(() => Promise.resolve())
  const frameWrite = vi.fn(() => Promise.resolve())
  let frame: HTMLIFrameElement

  beforeEach(() => {
    Object.defineProperty(window.navigator, 'clipboard', {
      value: { writeText: appWrite },
      configurable: true
    })
    frame = document.createElement('iframe')
    document.body.appendChild(frame)
    Object.defineProperty(
      (frame.contentWindow as Window).navigator,
      'clipboard',
      { value: { writeText: frameWrite } }
    )
  })

  afterEach(() => {
    cleanup()
    frame.remove()
    if (appClipboard) {
      Object.defineProperty(window.navigator, 'clipboard', appClipboard)
    } else {
      delete (window.navigator as { clipboard?: unknown }).clipboard
    }
    vi.clearAllMocks()
  })

  return { getFrame: () => frame, appWrite, frameWrite }
}
