import { ThemeOptions } from '@mui/material/styles'
import { merge } from 'lodash'

import { lightOverrides } from './lightOverrides'

export const darkOverrides: NonNullable<ThemeOptions['components']> = merge(
  {},
  lightOverrides
)
