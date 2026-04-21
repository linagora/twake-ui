// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import cozyReact from 'eslint-config-cozy-app/react'
import storybook from 'eslint-plugin-storybook'

export default [...cozyReact, ...storybook.configs['flat/recommended']]
