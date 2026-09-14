import { ThemeOptions } from '@mui/material/styles'
import { ReactNode } from 'react'

import { PaletteJson } from '../../lib/types'

export interface ThemeProviderProps {
  children: ReactNode
  mode?: 'light' | 'dark'
  palette?: Partial<PaletteJson>
  themeOptions?: Partial<ThemeOptions>
}
