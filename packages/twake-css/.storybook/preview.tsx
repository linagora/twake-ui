import { TwakeMuiThemeProvider } from '@linagora/twake-mui'
import type { Preview } from '@storybook/react-vite'
import React from 'react'

import '../src/vars.scss'
import '../src/utils.scss'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },

  decorators: [
    (Story, context) => (
      <TwakeMuiThemeProvider mode={context.globals.theme}>
        <Story />
      </TwakeMuiThemeProvider>
    ),
  ],
}

export default preview
