import { SxProps } from '@mui/material'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import React, { createContext, useMemo } from 'react'

import { SIDEBAR_MOBILE_HEIGHT } from '../Sidebar'

interface LayoutContextValue {
  monoColumn: boolean
  withTopBar: boolean
}

export const LayoutContext = createContext<LayoutContextValue>({
  monoColumn: false,
  withTopBar: true
})

export interface TwoPanesProps {
  monoColumn?: boolean
}

export const twoPanes = (theme: Theme): CSSObject => ({
  backgroundColor: theme.vars.palette.background.default,
  [theme.breakpoints.down('lg')]: {
    height: `calc(100vh - var(${SIDEBAR_MOBILE_HEIGHT}, 0px))`,
    backgroundColor: 'transparent'
  }
})

const LayoutRoot = styled('div', {
  shouldForwardProp: prop => prop !== 'monoColumn'
})<TwoPanesProps>(({ theme }: { theme: Theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  maxWidth: '100%',
  width: '100%',
  height: '100%',
  backgroundColor: theme.vars.palette.background.paper,
  color: theme.vars.palette.text.primary,
  variants: [{ props: { monoColumn: false }, style: twoPanes(theme) }]
}))

export interface LayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  sx?: SxProps<Theme>
  /** Used to add/remove top spacing when using with or without a topbar */
  withTopBar?: boolean
  /** Should be true if no sidebar in the app */
  monoColumn?: boolean
}

export const Layout = ({
  children,
  withTopBar = true,
  monoColumn = false,
  ...props
}: LayoutProps): React.ReactElement => {
  const value = useMemo(
    () => ({ monoColumn, withTopBar }),
    [monoColumn, withTopBar]
  )

  return (
    <LayoutContext.Provider value={value}>
      <LayoutRoot monoColumn={monoColumn} {...props}>
        {children}
      </LayoutRoot>
    </LayoutContext.Provider>
  )
}
