import { ThemeOptions } from '@mui/material/styles'
import { merge } from 'lodash'

import { makeLightOverrides } from './makeLightOverrides'

export const makeDarkOverrides = (): NonNullable<
  ThemeOptions['components']
> => {
  const makeOverridesForDarkTheme = (): NonNullable<
    ThemeOptions['components']
  > => ({})

  const DarkOverrides: NonNullable<ThemeOptions['components']> = merge(
    makeLightOverrides(),
    makeOverridesForDarkTheme()
  )

  return DarkOverrides
}
