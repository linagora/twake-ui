import { Tooltip, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Docs: Story = {
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
    title: (
      <>
        <Typography variant="body1" color="inherit">
          Carbon copy
        </Typography>
        <Typography variant="caption" color="inherit">
          Indicates whether the document is defined as &ldquo;authentic and
          original&rdquo;
        </Typography>
      </>
    ),
    children: <u>hover over me</u>
  }
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <div style={{ padding: 48 }}>
      <Tooltip
        open
        title={
          <>
            <Typography variant="body1" color="inherit">
              Carbon copy
            </Typography>
            <Typography variant="caption" color="inherit">
              Indicates whether the document is defined as &ldquo;authentic and
              original&rdquo;
            </Typography>
          </>
        }
      >
        <u>hover over me</u>
      </Tooltip>
    </div>
  )
}
