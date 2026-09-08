import { useMediaQuery } from '@mui/material'

export type Breakpoints = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isExtraLarge: boolean
}

export const useBreakpoints = (): Breakpoints => ({
  isMobile: useMediaQuery(theme => theme.breakpoints.down('md')),
  isTablet: useMediaQuery(theme => theme.breakpoints.between('md', 'lg')),
  isDesktop: useMediaQuery(theme => theme.breakpoints.up('lg')),
  isExtraLarge: useMediaQuery(theme => theme.breakpoints.up('xl'))
})
