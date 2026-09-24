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
export { Button, default as ButtonDefault } from './components/Button'
export { default as Chip } from './components/Chip'
export { Dialog, default as DialogDefault } from './components/Dialog'
export { Tabs, default as TabsDefault } from './components/Tabs'
export { Switch, default as SwitchDefault } from './components/Switch'
export { SearchBar, default as SearchBarDefault } from './components/SearchBar'
export { Sidebar, SIDEBAR_MOBILE_HEIGHT } from './components/Sidebar'
export { Layout, Main, Content } from './components/Layout'
export { Nav } from './components/Nav'
export { NavItem } from './components/NavItem'
export { NavLink } from './components/NavLink'
export { NavIcon } from './components/NavIcon'
export { NavText } from './components/NavText'
export { NavDesktopLimiter } from './components/NavDesktopLimiter'
export { NavDesktopDropdown } from './components/NavDesktopDropdown'
export { nameToColor, supportedColors } from './components/Avatar/helpers'
export { default as AccordionExpandIcon } from './components/AccordionExpandIcon'
export { useBreakpoints } from './hooks/useBreakpoints'
// TYPES
export type { TwakeTheme } from './lib/theme'
export type { PaletteJson } from './lib/types'
export type { AvatarProps } from './components/Avatar'
export type { ButtonProps } from './components/Button'
export type { ChipProps } from './components/Chip'
export type { DialogProps, DialogSize } from './components/Dialog'
export type { TabsProps } from './components/Tabs'
export type { SwitchProps } from './components/Switch'
export type { SearchBarProps } from './components/SearchBar/types'
export type { SidebarProps } from './components/Sidebar'
export type { LayoutProps, MainProps, ContentProps } from './components/Layout'
export type { NavProps } from './components/Nav'
export type { NavItemProps } from './components/NavItem'
export type { NavLinkProps } from './components/NavLink'
export type { NavIconProps } from './components/NavIcon'
export type { NavTextProps } from './components/NavText'
export type { NavDesktopLimiterProps } from './components/NavDesktopLimiter'
export type { NavDesktopDropdownProps } from './components/NavDesktopDropdown'
export type { Breakpoints } from './hooks/useBreakpoints'
