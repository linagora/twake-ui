import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Plus } from '@linagora/twake-icons'

import { ExtendableFab } from './index'

const meta: Meta<typeof ExtendableFab> = {
  title: 'ExtendableFab',
  component: ExtendableFab,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    label: 'Add',
    icon: Plus,
    color: 'primary',
    size: 'medium',
    topLimit: 50,
    scrollOptions: { delay: 250 }
  },
  argTypes: {
    label: { control: 'text' },
    icon: { control: false },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'inherit']
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    topLimit: { control: 'number' },
    scrollOptions: { control: 'object' },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Box sx={{ p: 2 }}>
      <ExtendableFab sx={{ position: 'sticky', top: 16 }} {...args} />
      <Box sx={{ py: 2 }}>Scroll the page vertically</Box>
      <Box sx={{ height: '200vh' }} />
    </Box>
  )
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={2} direction="row" sx={{ p: 4 }}>
      <ExtendableFab label="Add" icon={Plus} color="primary" />
      <ExtendableFab label="Add" icon={Plus} color="inherit" />
    </Stack>
  )
}
