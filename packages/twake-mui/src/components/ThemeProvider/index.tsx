import { CssBaseline } from '@mui/material'
import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from '@mui/material/styles'
import React, { FC, useMemo } from 'react'

import { ThemeProviderProps } from './types'
import { makeTheme } from '../../lib/makeTheme'

export const TwakeMuiThemeProvider: FC<ThemeProviderProps> = ({
  children,
  mode = 'light',
  themeOptions
}) => {
  const theme = useMemo(() => {
    const baseTheme = makeTheme(mode)

    if (!themeOptions) {
      return baseTheme
    }

    return createTheme(baseTheme, themeOptions)
  }, [mode, themeOptions])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
