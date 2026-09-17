import {
  makePalette,
  makeShadows,
  makeTypography,
  shape,
  PaletteJson
} from '@linagora/twake-css'
import { createTheme, ThemeOptions } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

import { overrides } from './overrides'
// DatePicker styles are applied through component overrides

const themesCommonConfig: Partial<ThemeOptions> = {
  shape,
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
    // The same variables ship statically as twake-css/dist/vars.css, for
    // pages with no React to run this provider. Keep the two in step.
    cssVariables: { colorSchemeSelector: 'data-theme', cssVarPrefix: 'twake' },
    defaultColorScheme: mode,
    colorSchemes: {
      light: { palette: makePalette('light', paletteOverrides) },
      dark: { palette: makePalette('dark', paletteOverrides) }
    },
    typography: makeTypography(),
    shadows: makeShadows(),
    components: overrides
  }

  return createTheme(deepmerge(baseOptions, themeOptions ?? {}))
}
