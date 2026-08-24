import { Drive, DriveText } from '@linagora/twake-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'

import AppTitle from './index'

const meta: Meta<typeof AppTitle> = {
  title: 'AppTitle',
  component: AppTitle,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'argos'],
  argTypes: {
    appIcon: {
      control: false,
      description: 'Icon component for the app logo'
    },
    appTextIcon: {
      control: false,
      description: 'Icon component for the app text/name'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    appIcon: Drive,
    appTextIcon: DriveText
  }
}

export const DarkMode: Story = {
  args: {
    appIcon: Drive,
    appTextIcon: DriveText
  },
  parameters: {
    backgrounds: { default: 'dark' },
    theme: 'dark'
  },
  globals: {
    theme: 'dark',
    backgrounds: { value: 'dark' }
  }
}
