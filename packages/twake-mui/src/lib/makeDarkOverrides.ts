import { Theme, Components, alpha } from '@mui/material/styles'
import { merge } from 'lodash'

import { makeLightOverrides } from './makeLightOverrides'

export const makeDarkOverrides = (theme: Theme): Components => {
  const makeOverridesForDarkTheme = (theme: Theme): Components => ({
    MuiTypography: {
      styleOverrides: {
        root: {
          color: alpha(theme.palette.grey[50], 0.9)
        },
        caption: {
          // Typography caption overrides will be implemented later
        }
      }
    }
  })

  const DarkOverrides: Components = merge(
    makeLightOverrides(theme),
    makeOverridesForDarkTheme(theme)
  )

  return DarkOverrides
}
