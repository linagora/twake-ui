import { useColorScheme } from '@mui/material/styles'
import { useCallback } from 'react'

import { TwakeColorScheme } from '../lib/types.js'

/**
 * Applies a theme setting value (`light`, `dark`, `auto` or `contrast`): the
 * mode and the scheme of both mode slots. `auto` follows the OS preference.
 * Contrast is a light scheme, so it also sets the light mode: code reading
 * the mode would otherwise pick the dark palette under a contrast screen.
 */
export const useApplyColorScheme = (): ((
  scheme: TwakeColorScheme | 'auto'
) => void) => {
  const { setMode, setColorScheme } = useColorScheme()

  return useCallback(
    scheme => {
      setMode(
        scheme === 'contrast' ? 'light' : scheme === 'auto' ? 'system' : scheme
      )
      setColorScheme(
        scheme === 'contrast'
          ? { light: 'contrast', dark: 'contrast' }
          : { light: null, dark: null }
      )
    },
    [setMode, setColorScheme]
  )
}
