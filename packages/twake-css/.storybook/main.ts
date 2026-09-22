import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
  viteFinal: async (config, options) => {
    if (options.configType === 'PRODUCTION') {
      config.base = '/twake-ui/twake-css/'
    }
    return config
  },
}

export default config
