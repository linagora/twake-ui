import paletteJson from '@linagora/twake-css/palette.json'
import { Shadows, TypographyVariantsOptions } from '@mui/material/styles'

// Palette Types
export type PaletteJson = typeof paletteJson
export type PaletteColor = PaletteJson['Primary']
export type GreyPalette = PaletteJson['Grey']
export type CommonColor = PaletteJson['Common']

export interface TextPalette {
  primary: string
  secondary: string
  disabled: string
  hint: string
  icon: string
}

export interface BackgroundPalette {
  default: string
  paper: string
  contrast: string
}

export interface ActionPalette {
  active: string
  hover: string
  selected: string
  disabled: string
  disabledBackground: string
  focus: string
}

export interface BorderPalette {
  main: string
  disabled: string
  ghost: string
  ghostDisabled: string
  opacity: number
  ghostOpacity: number
}

// Typography Types
export type TypographyOptions = TypographyVariantsOptions

export interface TypographyConfig {
  fontFamily?: string
  fontSize?: number
  fontWeight?: number | string
  lineHeight?: number | string
  letterSpacing?: string
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
}

export interface TypographyVariants {
  h1: TypographyConfig
  h2: TypographyConfig
  h3: TypographyConfig
  h4: TypographyConfig
  h5: TypographyConfig
  h6: TypographyConfig
  subtitle1: TypographyConfig
  subtitle2: TypographyConfig
  body1: TypographyConfig
  body2: TypographyConfig
  button: TypographyConfig
  caption: TypographyConfig
  overline: TypographyConfig
}

export type MakeTypography = () => TypographyOptions

/**
 * Twake additions on top of the MUI palette, mirroring cozy-ui. MUI does not
 * declare them, so without this augmentation consumers reading
 * `theme.palette.background.contrast` get a type error.
 */
declare module '@mui/material/styles' {
  // Shadows differ per mode, like the palette. MUI emits them per scheme but
  // does not type the option.
  interface ColorSystemOptions {
    shadows?: Shadows
  }

  interface CssThemeVariables {
    enabled: true
  }

  interface TypeBackground {
    contrast: string
  }

  interface TypeText {
    icon: string
  }

  interface Palette {
    border: BorderPalette
  }

  interface PaletteOptions {
    border?: Partial<BorderPalette>
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    xsmall: true
  }
}

declare module '@mui/material/Alert' {
  interface AlertPropsColorOverrides {
    primary: true
    secondary: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    ghost: true
  }
}
