import { Components, alpha } from '@mui/material/styles'

import paletteJson from '../palette.json'
import { PaletteJson } from '../types'

const paletteData = paletteJson as PaletteJson

export const iconButtonOverrides = (): Components['MuiIconButton'] => {
  return {
    styleOverrides: {
      root: {
        color: alpha(paletteData.Grey[900], 0.48),
        padding: '4px'
      }
    }
  }
}
