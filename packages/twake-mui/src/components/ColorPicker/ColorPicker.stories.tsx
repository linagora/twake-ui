import { Paper } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import ColorPicker, { ColorPickerProps } from './index'

const meta: Meta<typeof ColorPicker> = {
  title: 'ColorPicker',
  component: ColorPicker,
  parameters: { layout: 'padded' },
  tags: ['autodocs', 'argos'],
  args: { color: '#273891' }
}

export default meta
type Story = StoryObj<typeof meta>

const SelectableColorPicker: React.FC<ColorPickerProps> = props => {
  const [color, setColor] = useState(props.color)
  return <ColorPicker {...props} color={color} onChange={setColor} />
}

export const Default: Story = {
  render: args => (
    <Paper className="u-p-1 u-dib">
      <SelectableColorPicker {...args} />
    </Paper>
  )
}

export const OtherColor: Story = {
  args: { color: '#12AB34' },
  render: Default.render
}
