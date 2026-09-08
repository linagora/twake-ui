import { Shadows } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

import paletteJson from './palette.json'
import { PaletteJson } from './types'

const paletteData = paletteJson as PaletteJson

/**
 * Each elevation is two offset layers plus a constant hairline outline.
 * Tuple is [y1, blur1, spread1, opacity1, y2, blur2, spread2, opacity2];
 * the x offset is always 0.
 */
const elevations: [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
][] = [
  [2, 4, 0, 0.08, 4, 16, 0, 0.06],
  [3, 5, 0, 0.09, 4, 17, 0, 0.07],
  [3, 5, -1, 0.09, 5, 19, 1, 0.08],
  [3, 6, -1, 0.1, 5, 20, 1, 0.08],
  [4, 6, -1, 0.11, 5, 22, 1, 0.09],
  [4, 7, -2, 0.11, 6, 23, 2, 0.1],
  [5, 7, -2, 0.12, 6, 24, 2, 0.11],
  [5, 8, -2, 0.13, 6, 26, 2, 0.11],
  [5, 8, -3, 0.14, 7, 27, 3, 0.12],
  [6, 9, -3, 0.14, 7, 29, 3, 0.13],
  [6, 9, -3, 0.15, 7, 30, 3, 0.14],
  [7, 10, -4, 0.16, 8, 31, 4, 0.15],
  [7, 10, -4, 0.16, 8, 33, 4, 0.15],
  [8, 11, -5, 0.17, 9, 34, 5, 0.16],
  [8, 11, -5, 0.18, 9, 35, 5, 0.17],
  [9, 12, -5, 0.18, 9, 37, 5, 0.18],
  [9, 12, -6, 0.19, 10, 38, 6, 0.19],
  [9, 13, -6, 0.2, 10, 40, 6, 0.19],
  [10, 13, -6, 0.21, 10, 41, 6, 0.2],
  [10, 14, -7, 0.21, 11, 42, 7, 0.21],
  [11, 14, -7, 0.22, 11, 44, 7, 0.22],
  [11, 15, -7, 0.23, 11, 45, 7, 0.22],
  [12, 15, -8, 0.23, 12, 47, 8, 0.23],
  [12, 16, -8, 0.24, 12, 48, 8, 0.24]
]

const OUTLINE_OPACITY = 0.12

/**
 * cozy-ui defines a flat 26th elevation outside the ramp. MUI's `Shadows`
 * contract stops at 25, so `theme.shadows[25]` is reachable at runtime but not
 * through the type. Kept to stay iso with cozy-ui.
 */
const EXTRA_ELEVATION_OPACITY = 0.04

export const makeShadows = (
  mode: 'light' | 'dark' = 'light',
  palette: PaletteJson = paletteData
): Shadows => {
  const shadowColor = mode === 'dark' ? palette.Common.black : palette.Grey[900]
  const outline = `0px 0px 0px 0.5px ${alpha(shadowColor, OUTLINE_OPACITY)}`

  const shadows = elevations.map(
    ([y1, blur1, spread1, o1, y2, blur2, spread2, o2]) =>
      [
        `0px ${y1}px ${blur1}px ${spread1}px ${alpha(shadowColor, o1)}`,
        `0px ${y2}px ${blur2}px ${spread2}px ${alpha(shadowColor, o2)}`,
        outline
      ].join(', ')
  )

  const extraElevation = `0px 1px 4px ${alpha(
    shadowColor,
    EXTRA_ELEVATION_OPACITY
  )}`

  return ['none', ...shadows, extraElevation] as Shadows
}
