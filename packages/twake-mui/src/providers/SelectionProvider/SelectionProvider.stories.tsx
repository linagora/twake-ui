import { Button, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import SelectionProvider from './index'
import { useSelection } from './useSelection'

const meta: Meta<typeof SelectionProvider> = {
  title: 'SelectionProvider',
  component: SelectionProvider,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const SelectionExample: React.FC = () => {
  const { selectedItemsId, addSelectedItem, removeSelectedItem } =
    useSelection()

  return (
    <Stack spacing={1}>
      <Typography>
        selectedItemsId : {JSON.stringify(selectedItemsId)}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button onClick={() => addSelectedItem('01')}>Add Item</Button>
        <Button onClick={() => removeSelectedItem('01')}>Remove Item</Button>
      </Stack>
    </Stack>
  )
}

export const Default: Story = {
  render: () => (
    <SelectionProvider>
      <SelectionExample />
    </SelectionProvider>
  )
}
