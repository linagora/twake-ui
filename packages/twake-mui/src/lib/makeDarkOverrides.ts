import { Theme, ThemeOptions, alpha } from '@mui/material/styles'
import { merge } from 'lodash'

import { makeLightOverrides } from './makeLightOverrides'

export const makeDarkOverrides = (
  theme: Theme
): NonNullable<ThemeOptions['components']> => {
  const makeOverridesForDarkTheme = (
    theme: Theme
  ): NonNullable<ThemeOptions['components']> => ({
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: alpha(theme.palette.common.white, 0.28)
        }
      }
    }
  })

  const DarkOverrides: NonNullable<ThemeOptions['components']> = merge(
    makeLightOverrides(theme),
    makeOverridesForDarkTheme(theme)
  )

  return DarkOverrides
}
