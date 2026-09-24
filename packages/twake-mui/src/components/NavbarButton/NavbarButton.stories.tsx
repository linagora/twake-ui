import { Plus, Upload } from '@linagora/twake-icons'
import { Box, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { NavbarButton } from './index'

const meta: Meta<typeof NavbarButton> = {
  title: 'NavbarButton',
  component: NavbarButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: Plus,
    text: 'Create'
  }
}

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Box sx={{ p: 2, width: 236, bgcolor: 'background.default' }}>
      <Stack spacing={2}>
        {(['primary', 'secondary'] as const).map(variant => (
          <Stack key={variant} spacing={1}>
            <Typography variant="caption">{variant}</Typography>
            <NavbarButton
              variant={variant}
              icon={Plus}
              text="Create"
              fullWidth
            />
            <NavbarButton
              variant={variant}
              icon={Upload}
              text="Upload"
              fullWidth
            />
            <NavbarButton
              variant={variant}
              icon={Plus}
              text="Create"
              fullWidth
              disabled
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}
