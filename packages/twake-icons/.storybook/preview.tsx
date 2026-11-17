import { Box, TwakeMuiThemeProvider } from '@linagora/twake-mui'
import type { Preview } from '@storybook/react'
import React from 'react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: { disable: true }
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true
      }
    }
  },

  decorators: [
    (Story, context) => (
      <TwakeMuiThemeProvider
        key={context.globals.theme}
        mode={context.globals.theme}
      >
        <Box sx={{ bgcolor: 'background.paper', color: 'text.icon' }}>
          <Story />
        </Box>
      </TwakeMuiThemeProvider>
    )
  ]
}

export default preview
