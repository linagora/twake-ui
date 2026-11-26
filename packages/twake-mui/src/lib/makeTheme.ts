import {
  createColorScheme,
  createTheme,
  Overlays,
  ThemeOptions
} from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

import { makePalette } from './makePalette.js'
import { makeShadows } from './makeShadows.js'
import { makeTypography } from './makeTypography.js'
import { overrides } from './overrides.js'
import { PaletteJson } from './types.js'
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
  const lightScheme = themeOptions?.colorSchemes?.light

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
      // MUI completes only the light and dark schemes: this one must come
      // complete, or its palette lacks common, the channels, etc. It is a
      // light scheme, so it takes the light additions of themeOptions, but
      // keeps every value it defines.
      contrast: createColorScheme(
        deepmerge(typeof lightScheme === 'object' ? lightScheme : {}, {
          palette: makePalette('contrast', paletteOverrides),
          shadows: makeShadows('light')
        })
      )
    },
    typography: makeTypography(),
    shadows: makeShadows(mode),
    components: overrides
  }

  return createTheme(deepmerge(baseOptions, themeOptions ?? {}))
}
