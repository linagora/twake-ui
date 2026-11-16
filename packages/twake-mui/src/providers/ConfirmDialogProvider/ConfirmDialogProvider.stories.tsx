import { Button } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import ConfirmDialogProvider from './index'
import { ShowConfirmDialogOptions, useConfirmDialog } from './useConfirmDialog'

type StoryArgs = Pick<ShowConfirmDialogOptions, 'title' | 'content'>

const meta: Meta<StoryArgs> = {
  title: 'ConfirmDialogProvider',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const ShowConfirmDialogButton: React.FC<{ args: StoryArgs }> = ({ args }) => {
  const { showConfirmDialog, closeConfirmDialog } = useConfirmDialog()

  return (
    <Button
      onClick={() =>
        showConfirmDialog({
          ...args,
          actions: (
            <>
              <Button variant="outlined" onClick={closeConfirmDialog}>
                Cancel
              </Button>
              <Button>Ok</Button>
            </>
          )
        })
      }
    >
      Show ConfirmDialog
    </Button>
  )
}

export const Default: Story = {
  args: {
    title: 'Title of the ConfirmDialog',
    content: 'Content of the ConfirmDialog'
  },
  render: args => (
    <ConfirmDialogProvider>
      <ShowConfirmDialogButton args={args} />
    </ConfirmDialogProvider>
  )
}
