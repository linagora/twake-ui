import { ThemeOptions } from '@mui/material/styles'
import { ReactNode } from 'react'

export interface ThemeProviderProps {
  children: ReactNode
  mode?: 'light' | 'dark'
  themeOptions?: Partial<ThemeOptions>
}
