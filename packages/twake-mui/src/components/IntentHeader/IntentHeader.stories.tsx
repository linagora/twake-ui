import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import IntentHeader from './index'

const appIcon = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="10" fill="#297EF2"/></svg>'
)}`

const meta: Meta<typeof IntentHeader> = {
  title: 'IntentHeader',
  component: IntentHeader,
  tags: ['autodocs'],
  argTypes: {
    appName: { control: 'text' },
    appEditor: { control: 'text' },
    appIcon: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    appName: 'Drive',
    appEditor: 'Twake',
    appIcon
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={2}>
      <Row title="Name only">
        <IntentHeader appName="Drive" />
      </Row>
      <Row title="With editor">
        <IntentHeader appName="Drive" appEditor="Twake" />
      </Row>
      <Row title="With icon">
        <IntentHeader appName="Drive" appIcon={appIcon} />
      </Row>
      <Row title="With editor and icon">
        <IntentHeader appName="Drive" appEditor="Twake" appIcon={appIcon} />
      </Row>
    </Stack>
  )
}
