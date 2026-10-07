// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { OverlayFrame } from './OverlayFrame'

const renderFrame = (clipPath: string): HTMLIFrameElement => {
  render(
    <div data-testid="page">
      <OverlayFrame
        name="twake-embed-app:overlay"
        src="https://app.example.com/embed/overlay.html"
        title="App windows"
        sandbox="allow-scripts allow-same-origin"
        allow="clipboard-read; clipboard-write"
        clipPath={clipPath}
      />
    </div>
  )
  const frame = document.querySelector('iframe')
  if (frame === null) throw new Error('No overlay frame')
  return frame
}

afterEach(() => {
  cleanup()
})

describe('OverlayFrame', () => {
  it('covers the page from its body, clipped from the first render', () => {
    const frame = renderFrame("path('M0 0h5v5h-5Z')")

    expect(frame.parentElement).toBe(document.body)
    expect(frame.getAttribute('name')).toBe('twake-embed-app:overlay')
    expect(frame.getAttribute('style')).toContain(
      "clip-path: path('M0 0h5v5h-5Z')"
    )
    expect(frame.getAttribute('aria-hidden')).toBeNull()
  })

  it('is out of reach while it shows nothing', () => {
    const frame = renderFrame('inset(0 0 100% 0)')

    expect(frame.getAttribute('style')).toContain(
      'clip-path: inset(0 0 100% 0)'
    )
    expect(frame.getAttribute('aria-hidden')).toBe('true')
    expect(frame.getAttribute('tabindex')).toBe('-1')
  })
})
