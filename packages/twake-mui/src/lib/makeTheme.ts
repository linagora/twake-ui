import {
  createColorScheme,
  createTheme,
  Overlays,
  ThemeOptions
} from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

import { makePalette } from './makePalette'
import { makeShadows } from './makeShadows'
import { makeTypography } from './makeTypography'
import { overrides } from './overrides'
import { PaletteJson } from './types'
// DatePicker styles are applied through component overrides

const themesCommonConfig: Partial<ThemeOptions> = {
  shape: {
    borderRadius: 6
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 544,
      md: 769,
      lg: 1024,
      xl: 1201
    }
  },
  zIndex: {
    modal: 1300
  }
}

export const makeTheme = (
  mode: 'light' | 'dark' = 'light',
  paletteOverrides?: Partial<PaletteJson>,
  themeOptions?: ThemeOptions
): ReturnType<typeof createTheme> => {
  const baseOptions: ThemeOptions = {
    ...themesCommonConfig,
    cssVariables: { colorSchemeSelector: 'data-theme', cssVarPrefix: 'twake' },
    defaultColorScheme: mode,
    colorSchemes: {
      light: {
        palette: makePalette('light', paletteOverrides),
        shadows: makeShadows('light')
      },
      dark: {
        palette: makePalette('dark', paletteOverrides),
        shadows: makeShadows('dark'),
        overlays: Array<string>(25).fill('none') as Overlays
      },
      // High contrast, switched on at runtime with
      // useColorScheme().setColorScheme({ light: 'contrast', dark: 'contrast' }).
      // MUI completes only the light and dark schemes: this one must come
      // complete, or its palette lacks common, the channels, etc.
      contrast: createColorScheme({
        palette: makePalette('contrast', paletteOverrides),
        shadows: makeShadows('light')
      })
    },
    typography: makeTypography(),
    shadows: makeShadows(mode),
    components: overrides
  }

  return createTheme(deepmerge(baseOptions, themeOptions ?? {}))
}
