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
  useTheme
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
export { Sidebar } from './components/Sidebar'
export {
  Nav,
  NavItem,
  NavLink,
  NavIcon,
  NavText,
  NavDesktopLimiter,
  NavDesktopDropdown
} from './components/Nav'
export { nameToColor, supportedColors } from './components/Avatar/helpers'
export { default as AccordionExpandIcon } from './components/AccordionExpandIcon'
export { useBreakpoints } from './hooks/useBreakpoints'
// TYPES
export type { TwakeTheme } from './lib/theme'
export type { AvatarProps } from './components/Avatar'
export type { ChipProps } from './components/Chip'
export type { SidebarProps } from './components/Sidebar'
export type {
  NavProps,
  NavItemProps,
  NavLinkProps,
  NavIconProps,
  NavTextProps,
  NavDesktopLimiterProps,
  NavDesktopDropdownProps
} from './components/Nav'
export type { Breakpoints } from './hooks/useBreakpoints'
