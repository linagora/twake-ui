// The region of the overlay an embedded app draws on, over the whole page of
// TwakeSpace. It is a frame on the app's origin: the app renders its docked
// windows and dialogs into it, and TwakeSpace only shows the region the app
// says it draws in (`twake-embed:overlay-region`), so the rest of the page
// keeps its clicks.

/** A box the app draws on the overlay, in CSS px of the window */
export interface OverlayBox {
  x: number
  y: number
  width: number
  height: number
}

/**
 * The part of the overlay TwakeSpace shows: `'full'` while something there
 * blocks the page (a dialog, a menu, a fullscreen window), otherwise the
 * boxes the app draws
 */
export type OverlayRegion = 'full' | readonly OverlayBox[]

const OVERLAY_REGION = 'twake-embed:overlay-region'

const MAX_BOXES = 32
const MAX_SIZE = 100_000

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isCoordinate(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    Math.abs(value) <= MAX_SIZE
  )
}

function toBox(value: unknown): OverlayBox | null {
  if (!isRecord(value)) return null
  const { x, y, width, height } = value
  if (
    !isCoordinate(x) ||
    !isCoordinate(y) ||
    !isCoordinate(width) ||
    !isCoordinate(height)
  ) {
    return null
  }
  if (width < 0 || height < 0) return null
  return { x, y, width, height }
}

export function parseOverlayRegion(value: unknown): OverlayRegion | null {
  if (value === 'full') return 'full'
  if (!Array.isArray(value) || value.length > MAX_BOXES) return null
  const boxes: OverlayBox[] = []
  for (const item of value) {
    const box = toBox(item)
    if (box === null) return null
    boxes.push(box)
  }
  return boxes
}

/** The message an app posts to TwakeSpace with the region of its overlay */
export function overlayRegionMessage(region: OverlayRegion): {
  type: typeof OVERLAY_REGION
  region: OverlayRegion
} {
  return { type: OVERLAY_REGION, region }
}

/** The region an app reports, from `overlayRegionMessage` */
export function parseOverlayRegionMessage(data: unknown): OverlayRegion | null {
  if (!isRecord(data) || data.type !== OVERLAY_REGION) return null
  return parseOverlayRegion(data.region)
}

/** The clip path of the overlay: nothing until the app says what it draws */
export function overlayClipPath(region: OverlayRegion | null): string {
  if (region === 'full') return 'none'
  if (region === null || region.length === 0) return 'inset(0 0 100% 0)'
  const boxes = region.map(({ x, y, width, height }) =>
    ['M', x, ' ', y, 'h', width, 'v', height, 'h', -width, 'Z'].join('')
  )
  return `path('${boxes.join(' ')}')`
}
