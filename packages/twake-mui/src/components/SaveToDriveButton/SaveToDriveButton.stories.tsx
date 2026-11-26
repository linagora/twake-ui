import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import SaveToDriveButton from './index.js'

const meta: Meta<typeof SaveToDriveButton> = {
  title: 'SaveToDriveButton',
  component: SaveToDriveButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'inline-radio', options: ['idle', 'saving', 'saved'] },
    onSave: { control: false },
    onOpen: { control: false }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { status: 'idle', onSave: () => {}, onOpen: () => {} }
}

export const Screenshot: Story = {
  tags: ['argos'],
  args: Default.args,
  render: () => (
    <Stack direction="row" spacing={2}>
      <SaveToDriveButton status="idle" onSave={() => {}} />
      <SaveToDriveButton status="saving" onSave={() => {}} />
      <SaveToDriveButton status="saved" onSave={() => {}} />
      <SaveToDriveButton status="saved" onSave={() => {}} onOpen={() => {}} />
    </Stack>
  )
}
