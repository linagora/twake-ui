import { Paper } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import ColorPickerCustom from './index'

const meta: Meta<typeof ColorPickerCustom> = {
  title: 'ColorPickerCustom',
  component: ColorPickerCustom,
  parameters: { layout: 'padded' },
  tags: ['autodocs', 'argos'],
  args: { color: '#AABBCC' }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Paper className="u-p-1 u-dib">
      <ColorPickerCustom {...args} />
    </Paper>
  )
}
