import { ThemeOptions } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

import { lightOverrides } from './lightOverrides'

export const darkOverrides: NonNullable<ThemeOptions['components']> = deepmerge(
  {},
  lightOverrides
)
