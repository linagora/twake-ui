import { PaletteOptions, alpha } from '@mui/material/styles'

import paletteJson from './palette.json'
import { PaletteJson, BackgroundPalette, GreyPalette } from './types'

const paletteData = paletteJson as PaletteJson

export const makePalette = (
  mode: 'light' | 'dark' = 'light',
  palette: PaletteJson = paletteData
): PaletteOptions & { background: BackgroundPalette; grey: GreyPalette } => {
  if (mode === 'dark') {
    return {
      mode,
      primary: {
        light: palette.Primary[300],
        main: palette.Primary[400],
        dark: palette.Primary[500],
        contrastText: alpha(palette.Grey[900], 0.9)
      },
      secondary: {
        light: palette.Grey[300],
        main: palette.Grey[400],
        dark: palette.Grey[500],
        contrastText: alpha(palette.Grey[900], 0.9)
      },
      error: {
        light: palette.Error[300],
        main: palette.Error[400],
        dark: palette.Error[500],
        contrastText: alpha(palette.Grey[900], 0.9)
      },
      warning: {
        light: palette.Warning[300],
        main: palette.Warning[400],
        dark: palette.Warning[500],
        contrastText: alpha(palette.Grey[900], 0.9)
      },
      success: {
        light: palette.Success[300],
        main: palette.Success[400],
        dark: palette.Success[500],
        contrastText: alpha(palette.Grey[900], 0.9)
      },
      info: {
        light: palette.Info[300],
        main: palette.Info[400],
        dark: palette.Info[500],
        contrastText: alpha(palette.Grey[900], 0.9)
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
      },
      text: {
        primary: palette.Common.white,
        secondary: alpha(palette.Common.white, 0.64),
        disabled: alpha(palette.Common.white, 0.4)
      },
      background: {
        default: palette.Grey.A400,
        paper: palette.Grey[800],
        contrast: alpha(palette.Common.white, 0.072)
      },
      divider: alpha(palette.Common.white, 0.16),
      action: {
        active: palette.Common.white,
        hover: alpha(palette.Common.white, 0.08),
        hoverOpacity: 0.08,
        selected: alpha(palette.Common.white, 0.16),
        selectedOpacity: 0.18,
        disabled: alpha(palette.Common.white, 0.32),
        disabledOpacity: 0.32,
        disabledBackground: alpha(palette.Common.white, 0.12),
        focus: alpha(palette.Common.white, 0.24),
        focusOpacity: 0.24,
        activatedOpacity: 0.24
      }
    }
  }

  return {
    mode,
    primary: {
      light: palette.Primary[200],
      main: palette.Primary[600],
      dark: palette.Primary[700],
      contrastText: palette.Primary.ContrastText
    },
    secondary: {
      light: palette.Secondary[200],
      main: palette.Secondary[600],
      dark: palette.Secondary[700],
      contrastText: palette.Secondary.ContrastText
    },
    error: {
      light: palette.Error[200],
      main: palette.Error[600],
      dark: palette.Error[700],
      contrastText: palette.Error.ContrastText
    },
    warning: {
      light: palette.Warning[200],
      main: palette.Warning[600],
      dark: palette.Warning[700],
      contrastText: palette.Warning.ContrastText
    },
    success: {
      light: palette.Success[200],
      main: palette.Success[600],
      dark: palette.Success[700],
      contrastText: palette.Success.ContrastText
    },
    info: {
      light: palette.Info[200],
      main: palette.Info[600],
      dark: palette.Info[700],
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
    },
    text: {
      primary: alpha(palette.Grey[900], 0.9),
      secondary: alpha(palette.Grey[900], 0.64),
      disabled: alpha(palette.Grey[900], 0.32)
    },
    background: {
      default: palette.Grey[100],
      paper: palette.Common.white,
      contrast: alpha(palette.Grey[900], 0.048)
    },
    divider: alpha(palette.Grey[900], 0.12),
    action: {
      active: alpha(palette.Grey[900], 0.56),
      hover: alpha(palette.Grey[900], 0.04),
      hoverOpacity: 0.04,
      selected: alpha(palette.Grey[900], 0.08),
      selectedOpacity: 0.18,
      disabled: alpha(palette.Grey[900], 0.24),
      disabledOpacity: 0.32,
      disabledBackground: alpha(palette.Grey[900], 0.12),
      focus: alpha(palette.Grey[900], 0.12),
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  }
}
