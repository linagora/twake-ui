// MUI
export * from '@mui/material'
export * from '@mui/lab'
export {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
  darken,
  lighten,
  useTheme,
  useColorScheme
} from '@mui/material/styles'
export { default as Autocomplete } from '@mui/material/Autocomplete'
// LIB
export { makePalette } from './lib/makePalette'
export { theme } from './lib/theme'
export { radius } from './lib/radius'
// COMPONENTS & HELPERS
export { TwakeMuiThemeProvider } from './components/ThemeProvider'
export { Avatar, default as AvatarDefault } from './components/Avatar'
export { default as Chip } from './components/Chip'
export { Dialog, default as DialogDefault } from './components/Dialog'
export { Switch, default as SwitchDefault } from './components/Switch'
export { nameToColor, supportedColors } from './components/Avatar/helpers'
export { default as AccordionExpandIcon } from './components/AccordionExpandIcon'
export { useBreakpoints } from './hooks/useBreakpoints'
// TYPES
export type { TwakeTheme } from './lib/theme'
export type { PaletteJson } from './lib/types'
export type { AvatarProps } from './components/Avatar'
export type { ChipProps } from './components/Chip'
export type { DialogProps, DialogSize } from './components/Dialog'
export type { SwitchProps } from './components/Switch'
export type { Breakpoints } from './hooks/useBreakpoints'
