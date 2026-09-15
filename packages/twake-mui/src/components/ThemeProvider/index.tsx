import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import React, { FC, useMemo } from 'react'

import { ThemeProviderProps } from './types'
import { makeTheme } from '../../lib/makeTheme'

export const TwakeMuiThemeProvider: FC<ThemeProviderProps> = ({
  children,
  mode = 'light',
  palette,
  themeOptions
}) => {
  // The palette holds plain JSON, so comparing it by content lets consumers
  // pass it inline without rebuilding the whole theme on every render.
  const paletteKey = JSON.stringify(palette)

  const theme = useMemo(
    () => makeTheme(mode, palette, themeOptions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, paletteKey, themeOptions]
  )

  return (
    <MuiThemeProvider theme={theme} defaultMode={mode}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
