import React from 'react'
import type { Preview, StoryContext } from '@storybook/react-vite'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { I18n } from 'twake-i18n'
import { makeTheme } from '../src/lib/makeTheme'

/**
 * Argos renders the story, then resizes the preview iframe to the mode's
 * viewport, then screenshots. Some MUI components have internal debounces
 * when resizing making flaky tests. Here we avoid totally these issues
 * by sizing the frame before the story renders.
 */
const sizeFrameToViewport = (context: StoryContext): void => {
  const frame = window.frameElement as HTMLIFrameElement | null
  const viewports = context.parameters.viewport?.viewports
  const styles = viewports?.[context.globals.viewport as string]?.styles

  if (!frame || !styles) return

  frame.style.width = styles.width
  frame.style.height = styles.height
}

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
        "desktop-light": { viewport: 'desktop' },
        "mobile-light": { viewport: 'mobile' },
        "desktop-dark": {
          viewport: 'desktop',
          theme: 'dark',
          backgrounds: { value: 'dark' },
        },
        "mobile-dark": {
          viewport: 'mobile',
          theme: 'dark',
          backgrounds: { value: 'dark' },
        },
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

  beforeEach: sizeFrameToViewport,

  decorators: [
    (Story, context) => {
      const themeMode = context.globals.theme
      const theme = makeTheme(themeMode)

      const isFullscreen = context.parameters.layout === 'fullscreen'

      return (
        <I18n lang="en" dictRequire={() => ({})}>
          <ThemeProvider theme={theme} defaultMode={themeMode}>
            <CssBaseline />
            <Box
              sx={
                isFullscreen
                  ? undefined
                  : { padding: '20px', bgcolor: 'background.paper' }
              }
            >
              <Story />
            </Box>
          </ThemeProvider>
        </I18n>
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
