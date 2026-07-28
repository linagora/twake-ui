import { PaletteOptions, alpha } from '@mui/material/styles'

import paletteJson from './palette.json'
import { PaletteJson } from './types'

const paletteData = paletteJson as PaletteJson

export const makePalette = (
  mode: 'light' | 'dark' = 'light',
  palette: PaletteJson = paletteData
): PaletteOptions => {
  return {
    mode,
    primary: {
      light: palette.Primary[300],
      main: palette.Primary[600],
      dark: palette.Primary[800],
      contrastText: palette.Primary.ContrastText
    },
    secondary: {
      light: palette.Secondary[300],
      main: palette.Secondary[600],
      dark: palette.Secondary[800],
      contrastText: palette.Secondary.ContrastText
    },
    error: {
      light: palette.Error[300],
      main: palette.Error[600],
      dark: palette.Error[800],
      contrastText: palette.Error.ContrastText
    },
    warning: {
      light: palette.Warning[300],
      main: palette.Warning[500],
      dark: palette.Warning[700],
      contrastText: palette.Warning.ContrastText
    },
    success: {
      light: palette.Success[300],
      main: palette.Success[600],
      dark: palette.Success[800],
      contrastText: palette.Success.ContrastText
    },
    info: {
      light: palette.Info[300],
      main: palette.Info[600],
      dark: palette.Info[800],
      contrastText: '#fff'
    },
    grey: {
      50: palette.Grey[50],
      100: palette.Grey[100],
      200: palette.Grey[200],
      300: palette.Grey[300],
      400: palette.Grey[400],
      500: palette.Grey[500],
      600: palette.Grey[600],
      700: palette.Grey[700],
      800: palette.Grey[800],
      900: palette.Grey[900],
      A100: palette.Grey.A100,
      A200: palette.Grey.A200,
      A400: palette.Grey.A400,
      A700: palette.Grey.A700,
      A900: palette.Grey.A900
    } as PaletteOptions['grey'],
    text: {
      primary:
        mode === 'dark'
          ? palette.Common['white']
          : alpha(palette.Grey[900], 0.9),
      secondary:
        mode === 'dark'
          ? alpha(palette.Common['white'], 0.64)
          : alpha(palette.Grey['900'], 0.64),
      disabled:
        mode === 'dark'
          ? alpha(palette.Common['white'], 0.4)
          : alpha(palette.Grey['900'], 0.32)
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    divider: '#E1E3E6',
    action: {
      active: palette.Primary['A400'],
      hover: 'rgba(246, 126, 53, 0.04)',
      selected: 'rgba(246, 126, 53, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.32)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(246, 126, 53, 0.12)'
    }
  }
}
