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
  viteFinal: async (config, options) => {
    // react-docgen only skips paths under node_modules: following the workspace
    // symlink would make it parse the whole twake-icons bundle (~100s per start)
    config.resolve = { ...config.resolve, preserveSymlinks: true }
    if (options.configType === 'PRODUCTION') {
      config.base = '/twake-ui/twake-mui/'
    }
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
