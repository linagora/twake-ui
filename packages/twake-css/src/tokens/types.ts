export interface CommonColor {
  white: string
  black: string
}

export interface PaletteColor {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  ContrastText?: string
}

export interface GreyPalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  A100: string
  A200: string
  A400: string
  A700: string
  A900: string
}

export interface BackgroundPalette {
  default: string
  paper: string
  contrast: string
}

export interface BorderPalette {
  main: string
  disabled: string
  ghost: string
  ghostDisabled: string
  opacity: number
  ghostOpacity: number
}

export interface PaletteJson {
  Primary: PaletteColor
  Secondary: PaletteColor
  Error: PaletteColor
  Warning: PaletteColor
  Success: PaletteColor
  Info: Omit<PaletteColor, 'ContrastText'>
  Grey: GreyPalette
  Common: CommonColor
}

/**
 * Twake additions on top of the MUI palette, mirroring cozy-ui. MUI does not
 * declare them, so without this augmentation `makePalette` cannot return
 * `text.icon`, `background.contrast` or `border`, and a consumer reading
 * `theme.palette.background.contrast` gets a type error.
 */
declare module '@mui/material/styles' {
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
