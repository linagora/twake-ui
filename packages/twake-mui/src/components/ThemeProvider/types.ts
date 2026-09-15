import { ThemeOptions } from '@mui/material/styles'
import { ReactNode } from 'react'

import { PaletteJson } from '../../lib/types'

export interface ThemeProviderProps {
  children: ReactNode
  /**
   * @deprecated Only sets `defaultColorScheme` now (both schemes are always
   * present) - switch theme at runtime with MUI's `useColorScheme()` instead.
   */
  mode?: 'light' | 'dark'
  palette?: Partial<PaletteJson>
  themeOptions?: Partial<ThemeOptions>
}
