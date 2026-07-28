import { Theme, ThemeOptions } from '@mui/material/styles'
import { merge } from 'lodash'

import { makeLightOverrides } from './makeLightOverrides'

export const makeDarkOverrides = (
  theme: Theme
): NonNullable<ThemeOptions['components']> => {
  const makeOverridesForDarkTheme = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    theme: Theme
  ): NonNullable<ThemeOptions['components']> => ({})

  const DarkOverrides: NonNullable<ThemeOptions['components']> = merge(
    makeLightOverrides(theme),
    makeOverridesForDarkTheme(theme)
  )

  return DarkOverrides
}
