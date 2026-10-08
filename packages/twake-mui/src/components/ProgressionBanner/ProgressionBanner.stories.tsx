/* eslint-disable no-console */
import { CloudSync2, Icon } from '@linagora/twake-icons'
import { Button, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import ProgressionBanner from './index'

const icon = <Icon icon={CloudSync2} />
const errorLight = 'var(--twake-palette-error-light)'

const manageButton = (
  <Button variant="text" color="primary" onClick={() => console.log('clicked')}>
    Manage your storage space
  </Button>
)

const meta: Meta<typeof ProgressionBanner> = {
  title: 'ProgressionBanner',
  component: ProgressionBanner,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    text: { control: 'text' },
    progressBar: { control: 'boolean' },
    color: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 25,
    text: '4 remaining items',
    progressBar: true,
    icon
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    {children}
  </section>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Determinate">
        <ProgressionBanner value={25} text="4 remaining items" icon={icon} />
      </Row>
      <Row title="Indeterminate">
        <ProgressionBanner text="4 remaining items" icon={icon} />
      </Row>
      <Row title="Without progress bar">
        <ProgressionBanner
          progressBar={false}
          text="4 remaining items"
          icon={icon}
        />
      </Row>
      <Row title="With button">
        <ProgressionBanner
          value={25}
          text="Storage limit nearly reached"
          icon={icon}
          button={manageButton}
        />
      </Row>
      <Row title="Custom color">
        <ProgressionBanner
          value={25}
          color={errorLight}
          text="Storage limit nearly reached"
          icon={icon}
          button={manageButton}
        />
      </Row>
      <Row title="Default icon">
        <ProgressionBanner value={25} text="4 remaining items" />
      </Row>
    </Stack>
  )
}
