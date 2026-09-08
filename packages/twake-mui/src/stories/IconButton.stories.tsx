import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Stack, Box } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof IconButton> = {
  title: 'IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'error', 'warning', 'success']
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large']
    },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const COLORS = ['default', 'primary', 'error', 'warning', 'success'] as const
const SIZES = ['xsmall', 'small', 'medium', 'large'] as const

export const Default: Story = {
  args: { color: 'default', size: 'medium' },
  render: args => (
    <IconButton {...args}>
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  )
}

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      {SIZES.map(size => (
        <section key={size}>
          <h3 style={{ marginBottom: '12px' }}>{size}</h3>
          <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
            {COLORS.map(color => (
              <Stack
                key={color}
                spacing={1}
                sx={{ alignItems: 'center', width: 88 }}
              >
                <Box sx={{ fontSize: 12 }}>{color}</Box>
                <IconButton color={color} size={size}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton color={color} size={size} disabled>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </section>
      ))}
    </Stack>
  )
}
