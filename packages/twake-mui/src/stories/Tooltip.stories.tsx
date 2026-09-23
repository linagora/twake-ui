import { CarbonCopy, Icon } from '@linagora/twake-icons'
import { Stack, Tooltip, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const title = (
  <>
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
      <Icon icon={CarbonCopy} />
      <Typography variant="body1" color="inherit">
        Carbon copy
      </Typography>
    </Stack>
    <Typography variant="caption" color="inherit">
      Indicates whether the document is defined as &ldquo;authentic and
      original&rdquo; by Cozy Cloud, the host of your Cozy, as it can claim that
      it comes directly from a third-party service, without having undergone any
      modification.
    </Typography>
  </>
)

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end'
      ]
    },
    arrow: { control: 'boolean' }
  },
  args: {
    title,
    children: <u>hover over me</u>
  }
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <div style={{ padding: '48px 48px 200px' }}>
      <Tooltip open title={title}>
        <u>hover over me</u>
      </Tooltip>
    </div>
  )
}
