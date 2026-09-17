import { TypographyVariantsOptions } from '@mui/material/styles'

// The palette types and the MUI palette augmentation live in twake-css, which
// owns the tokens; importing it here is what pulls the augmentation in.
import '@linagora/twake-css'

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

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    xsmall: true
  }
}
