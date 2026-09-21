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
export {
  ContactPopover,
  default as ContactPopoverDefault
} from './components/ContactPopover'
export { Tabs, default as TabsDefault } from './components/Tabs'
export { Switch, default as SwitchDefault } from './components/Switch'
export { Sidebar, SIDEBAR_MOBILE_HEIGHT } from './components/Sidebar'
export { Layout, Main, Content } from './components/Layout'
export { Nav } from './components/Nav'
export { NavItem } from './components/NavItem'
export { NavLink } from './components/NavLink'
export { NavIcon } from './components/NavIcon'
export { NavText } from './components/NavText'
export { NavDesktopLimiter } from './components/NavDesktopLimiter'
export { NavDesktopDropdown } from './components/NavDesktopDropdown'
export {
  nameToColor,
  supportedColors,
  getInitials
} from './components/Avatar/helpers'
export { default as AccordionExpandIcon } from './components/AccordionExpandIcon'
export { default as VirtualizedTable } from './components/VirtualizedTable'
export { useBreakpoints } from './hooks/useBreakpoints'
// TYPES
export type { TwakeTheme } from './lib/theme'
export type { PaletteJson } from './lib/types'
export type { AvatarProps } from './components/Avatar'
export type { ButtonProps } from './components/Button'
export type { ContactPopoverProps } from './components/ContactPopover'
export {
  ContactPopoverActions,
  ContactPopoverChatAction,
  ContactPopoverVideoAction,
  ContactPopoverCalendarAction,
  ContactPopoverEmailAction
} from './components/ContactPopover'
export type { ContactPopoverActionsProps } from './components/ContactPopover/ContactPopoverActions'
export type { ContactPopoverChatActionProps } from './components/ContactPopover/ContactPopoverChatAction'
export type { ContactPopoverVideoActionProps } from './components/ContactPopover/ContactPopoverVideoAction'
export type { ContactPopoverCalendarActionProps } from './components/ContactPopover/ContactPopoverCalendarAction'
export type { ContactPopoverEmailActionProps } from './components/ContactPopover/ContactPopoverEmailAction'
export type { ChipProps } from './components/Chip'
export type { DialogProps, DialogSize } from './components/Dialog'
export type { TabsProps } from './components/Tabs'
export type { SwitchProps } from './components/Switch'
export type { SidebarProps } from './components/Sidebar'
export type { LayoutProps, MainProps, ContentProps } from './components/Layout'
export type { NavProps } from './components/Nav'
export type { NavItemProps } from './components/NavItem'
export type { NavLinkProps } from './components/NavLink'
export type { NavIconProps } from './components/NavIcon'
export type { NavTextProps } from './components/NavText'
export type { NavDesktopLimiterProps } from './components/NavDesktopLimiter'
export type { NavDesktopDropdownProps } from './components/NavDesktopDropdown'
export type {
  VirtualizedTableProps,
  VirtualizedTableColumn,
  VirtualizedTableRow
} from './components/VirtualizedTable'
export type { Breakpoints } from './hooks/useBreakpoints'
