import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
  viteFinal: async (config) => {
    // Supress chunk size warnings from Storybook core
    if (config.build) {
      config.build.chunkSizeWarningLimit = 1000
    }
    // Suppress eval warnings from Storybook core
    if (config.build?.rollupOptions) {
      config.build.rollupOptions.onwarn = (warning, warn) => {
        if (warning.code === 'EVAL' && warning.message.includes('storybook/core')) {
          return
        }
        warn(warning)
      }
    }
    return config
  },
}

export default config
