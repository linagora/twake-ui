import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Dialog>

// Basic Dialog with open/close state
const BasicDialogComponent = (): React.ReactElement => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a basic dialog with a title, content, and action buttons.
            You can put any content here.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export const Default: Story = {
  render: () => <BasicDialogComponent />
}

// Visual Regression - Dialog styles
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      {/* Dialog Preview */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Dialog Components</h3>
        <Stack spacing={2}>
          <Dialog open={true}>
            <DialogTitle>Standard Dialog</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This demonstrates the standard dialog appearance with all its
                subcomponents styled according to the Twake theme.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button>Cancel</Button>
              <Button variant="contained">Confirm</Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </section>
    </Stack>
  )
}
