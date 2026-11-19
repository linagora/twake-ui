import { TwakeMuiThemeProvider, useColorScheme } from '@linagora/twake-mui'
import type { Preview } from '@storybook/react-vite'
import React, { useLayoutEffect } from 'react'

import '../src/vars.scss'
import '../src/utils.scss'

/**
 * MUI maps the light mode to the `light` scheme: the `contrast` scheme is
 * reached at runtime, the way an app switches it on.
 */
const ColorSchemeSync = ({ scheme }: { scheme: string }): null => {
  const { setMode, setColorScheme } = useColorScheme()

  useLayoutEffect(() => {
    setMode(scheme === 'dark' ? 'dark' : 'light')
    setColorScheme(
      scheme === 'contrast'
        ? { light: 'contrast', dark: 'contrast' }
        : { light: null, dark: null }
    )
  }, [scheme, setMode, setColorScheme])

  return null
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true }
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark', 'contrast'],
        showName: true
      }
    }
  },

  decorators: [
    (Story, context) => (
      <TwakeMuiThemeProvider
        key={context.globals.theme}
        mode={context.globals.theme === 'dark' ? 'dark' : 'light'}
      >
        <ColorSchemeSync scheme={context.globals.theme} />
        <Story />
      </TwakeMuiThemeProvider>
    )
  ]
}

export default preview
