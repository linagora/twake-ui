import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { makeTheme } from '../src/lib/makeTheme'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#121212' },
        gray: { name: 'gray', value: '#f5f5f5' }
      }
    },
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '720px' }
        },
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' }
        }
      }
    },
    argos: {
      fitToContent: false,
      threshold: 0.2,
      modes: {
        desktop: { viewport: 'desktop' },
        mobile: { viewport: 'mobile' },
      },
    },
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
    (Story, context) => {
      const themeMode = context.globals.theme
      const theme = makeTheme(themeMode)

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ padding: '20px' }}>
            <Story />
          </div>
        </ThemeProvider>
      )
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
}

export default preview
