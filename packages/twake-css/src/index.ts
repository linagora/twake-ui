import paletteJson from './tokens/palette.json'
import { PaletteJson } from './tokens/types'

export const palette = paletteJson as PaletteJson

export { makePalette } from './tokens/makePalette'
export { makeShadows } from './tokens/makeShadows'
export { makeTypography } from './tokens/makeTypography'
export { shape } from './tokens/shape'
export type {
  BackgroundPalette,
  BorderPalette,
  CommonColor,
  GreyPalette,
  PaletteColor,
  PaletteJson
} from './tokens/types'
