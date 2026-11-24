import { PaletteOptions, alpha } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

import paletteJson from '@linagora/twake-css/palette.json' with { type: 'json' }

import {
  PaletteJson,
  BackgroundPalette,
  GreyPalette,
  BorderPalette,
  TwakeColorScheme
} from './types.js'

const paletteData: PaletteJson = paletteJson

export const makePalette = (
  mode: TwakeColorScheme = 'light',
  overrides: Partial<PaletteJson> = {}
): PaletteOptions & {
  background: BackgroundPalette
  grey: GreyPalette
  border: BorderPalette
  Chip: { defaultAvatarColor: string }
} => {
  const palette = deepmerge(paletteData, overrides)
  const grey: GreyPalette = {
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
  }

  // High contrast: a light scheme for low-vision users, from the "Contrast
  // grey" mode of the Figma library. Plain ramp steps, no alpha on the text.
  if (mode === 'contrast') {
    const ink = palette.Grey.A900

    return {
      mode: 'light',
      primary: {
        light: palette.Grey.A200,
        main: palette.Grey[900],
        dark: palette.Grey.A400,
        contrastText: palette.Common.white
      },
      secondary: {
        light: palette.Secondary[300],
        main: palette.Secondary[700],
        dark: palette.Secondary[900],
        contrastText: palette.Common.white
      },
      error: {
        light: palette.Error[100],
        main: palette.Error[700],
        dark: palette.Error[900],
        contrastText: palette.Common.white
      },
      warning: {
        light: palette.Warning[50],
        main: palette.Warning[800],
        dark: palette.Warning[900],
        contrastText: palette.Common.white
      },
      success: {
        light: palette.Success[100],
        main: palette.Success[800],
        dark: palette.Success[900],
        contrastText: palette.Common.white
      },
      info: {
        light: palette.Info[100],
        main: palette.Info[800],
        dark: palette.Info[900],
        contrastText: palette.Common.white
      },
      grey,
      Chip: { defaultAvatarColor: 'var(--twake-palette-grey-700)' },
      text: {
        primary: palette.Grey[900],
        secondary: palette.Grey[800],
        disabled: palette.Grey[700],
        icon: palette.Grey[800]
      },
      background: {
        default: palette.Grey[100],
        paper: palette.Grey[50],
        contrast: alpha(palette.Grey[900], 0.048)
      },
      border: {
        main: palette.Grey[700],
        disabled: alpha(ink, 0.3),
        ghost: alpha(ink, 0.48),
        ghostDisabled: alpha(ink, 0.24),
        opacity: 0.32,
        ghostOpacity: 0.48
      },
      divider: palette.Grey[600],
      action: {
        active: palette.Grey[800],
        hover: alpha(palette.Grey[900], 0.04),
        hoverOpacity: 0.04,
        selected: alpha(palette.Grey[900], 0.08),
        selectedOpacity: 0.08,
        disabled: alpha(ink, 0.24),
        disabledOpacity: 0.32,
        disabledBackground: alpha(ink, 0.24),
        focus: alpha(palette.Grey[900], 0.12),
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
        ghostOpacity: 0.08,
        hoverGhostOpacity: 0.16
      }
    }
  }

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
      grey,
      Chip: { defaultAvatarColor: 'var(--twake-palette-grey-300)' },
      text: {
        primary: palette.Common.white,
        secondary: alpha(palette.Common.white, 0.64),
        disabled: alpha(palette.Common.white, 0.4),
        icon: palette.Common.white
      },
      background: {
        default: palette.Grey.A400,
        paper: palette.Grey[800],
        contrast: alpha(palette.Common.white, 0.072)
      },
      border: {
        main: alpha(palette.Common.white, 0.24),
        disabled: alpha(palette.Common.white, 0.12),
        ghost: alpha(palette.Common.white, 0.48),
        ghostDisabled: alpha(palette.Common.white, 0.24),
        opacity: 0.48,
        ghostOpacity: 0.48
      },
      divider: alpha(palette.Common.white, 0.16),
      action: {
        active: palette.Common.white,
        hover: alpha(palette.Common.white, 0.08),
        hoverOpacity: 0.08,
        selected: alpha(palette.Common.white, 0.16),
        selectedOpacity: 0.16,
        disabled: alpha(palette.Common.white, 0.32),
        disabledOpacity: 0.32,
        disabledBackground: alpha(palette.Common.white, 0.12),
        focus: alpha(palette.Common.white, 0.24),
        focusOpacity: 0.24,
        activatedOpacity: 0.24,
        ghostOpacity: 0.08,
        hoverGhostOpacity: 0.16
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
      light: palette.Secondary[100],
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
    grey,
    Chip: { defaultAvatarColor: 'var(--twake-palette-grey-700)' },
    text: {
      primary: alpha(palette.Grey[900], 0.9),
      secondary: alpha(palette.Grey[900], 0.64),
      disabled: alpha(palette.Grey[900], 0.32),
      icon: alpha(palette.Grey[900], 0.72)
    },
    background: {
      default: palette.Grey[100],
      paper: palette.Common.white,
      contrast: alpha(palette.Grey[900], 0.048)
    },
    border: {
      main: alpha(palette.Grey[900], 0.16),
      disabled: alpha(palette.Grey[900], 0.08),
      ghost: alpha(palette.Grey[900], 0.48),
      ghostDisabled: alpha(palette.Grey[900], 0.16),
      opacity: 0.32,
      ghostOpacity: 0.48
    },
    divider: alpha(palette.Grey[900], 0.12),
    action: {
      active: alpha(palette.Grey[900], 0.56),
      hover: alpha(palette.Grey[900], 0.04),
      hoverOpacity: 0.04,
      selected: alpha(palette.Grey[900], 0.08),
      selectedOpacity: 0.08,
      disabled: alpha(palette.Grey[900], 0.24),
      disabledOpacity: 0.32,
      disabledBackground: alpha(palette.Grey[900], 0.12),
      focus: alpha(palette.Grey[900], 0.12),
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
      ghostOpacity: 0.08,
      hoverGhostOpacity: 0.16
    }
  }
}
