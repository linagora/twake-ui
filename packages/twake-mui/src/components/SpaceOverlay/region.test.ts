import { describe, expect, it } from 'vitest'

import {
  overlayClipPath,
  overlayRegionMessage,
  parseOverlayRegion,
  parseOverlayRegionMessage
} from './region'

describe('parseOverlayRegion', () => {
  it('takes the whole page or a list of boxes', () => {
    expect(parseOverlayRegion('full')).toBe('full')
    expect(
      parseOverlayRegion([{ x: 10, y: 20, width: 300, height: 400 }])
    ).toEqual([{ x: 10, y: 20, width: 300, height: 400 }])
    expect(parseOverlayRegion([])).toEqual([])
  })

  it('refuses anything else', () => {
    expect(parseOverlayRegion('all')).toBeNull()
    expect(parseOverlayRegion([{ x: 1, y: 2, width: 3 }])).toBeNull()
    expect(
      parseOverlayRegion([{ x: 1, y: 2, width: -3, height: 4 }])
    ).toBeNull()
    expect(
      parseOverlayRegion([{ x: 'a', y: 2, width: 3, height: 4 }])
    ).toBeNull()
    expect(
      parseOverlayRegion([{ x: Infinity, y: 2, width: 3, height: 4 }])
    ).toBeNull()
    const many = Array.from({ length: 33 }, () => ({
      x: 0,
      y: 0,
      width: 1,
      height: 1
    }))
    expect(parseOverlayRegion(many)).toBeNull()
  })
})

describe('overlayClipPath', () => {
  it('shows nothing until the app draws', () => {
    expect(overlayClipPath(null)).toBe('inset(0 0 100% 0)')
    expect(overlayClipPath([])).toBe('inset(0 0 100% 0)')
  })

  it('shows the whole page while the app blocks it', () => {
    expect(overlayClipPath('full')).toBe('none')
  })

  it('shows the boxes the app draws', () => {
    expect(
      overlayClipPath([
        { x: 10, y: 20, width: 300, height: 400 },
        { x: 0, y: 0, width: 5, height: 5 }
      ])
    ).toBe("path('M10 20h300v400h-300Z M0 0h5v5h-5Z')")
  })
})

describe('parseOverlayRegionMessage', () => {
  it('reads the message an app posts', () => {
    const region = [{ x: 1, y: 2, width: 3, height: 4 }]

    expect(parseOverlayRegionMessage(overlayRegionMessage(region))).toEqual(
      region
    )
  })

  it('reads the region of the message', () => {
    expect(
      parseOverlayRegionMessage({
        type: 'twake-embed:overlay-region',
        region: 'full'
      })
    ).toBe('full')
  })

  it('ignores another message or a wrong region', () => {
    expect(
      parseOverlayRegionMessage({ type: 'other', region: 'full' })
    ).toBeNull()
    expect(
      parseOverlayRegionMessage({
        type: 'twake-embed:overlay-region',
        region: 'everything'
      })
    ).toBeNull()
    expect(parseOverlayRegionMessage('twake-embed:overlay-region')).toBeNull()
  })
})
