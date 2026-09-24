import {
  CrossMedium,
  FileTypeFolder,
  FileTypeText,
  Icon
} from '@linagora/twake-icons'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Stack
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Dialog, DialogProps, DialogSize } from './index'
import { ListItemText } from '../ListItemText'

const sizes: DialogSize[] = ['small', 'medium', 'large', 'full']

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: sizes },
    fullScreen: { control: 'boolean' },
    scroll: { control: 'select', options: ['paper', 'body'] }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// The cozy-ui doc example: a close button, a title, a list and two actions
const ExampleDialog: React.FC<DialogProps> = props => (
  <Dialog aria-labelledby="dialog-title" {...props}>
    <IconButton
      aria-label="Close"
      size="medium"
      sx={{ position: 'absolute', top: '1.15rem', right: '1.15rem' }}
      onClick={event => props.onClose?.(event, 'backdropClick')}
    >
      <Icon icon={CrossMedium} />
    </IconButton>
    <DialogTitle id="dialog-title" className="dialogTitleWithClose">
      Ada Lovelace
    </DialogTitle>
    <Divider />
    <List sx={{ my: 1 }}>
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={FileTypeFolder} size={32} />
        </ListItemIcon>
        <ListItemText primary="I'm a primary text" />
      </ListItemButton>
      <Divider variant="inset" />
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={FileTypeText} size={32} />
        </ListItemIcon>
        <ListItemText
          primary="I'm a primary text"
          secondary="I'm a secondary text"
        />
      </ListItemButton>
      <Divider variant="inset" />
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={FileTypeText} size={32} />
        </ListItemIcon>
        <ListItemText primary="I'm a primary text" />
      </ListItemButton>
    </List>
    <Divider />
    <DialogActions>
      <Button
        variant="outlined"
        onClick={event => props.onClose?.(event, 'backdropClick')}
      >
        Close Modal
      </Button>
      <Button>Click Me</Button>
    </DialogActions>
  </Dialog>
)

const OpenableDialog: React.FC<DialogProps> = props => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Toggle modal</Button>
      <ExampleDialog {...props} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Default: Story = {
  args: { size: 'medium' },
  render: args => <OpenableDialog {...args} />
}

// Renders the dialog in the flow of the page rather than over it
const staticProps = {
  open: true,
  disablePortal: true,
  hideBackdrop: true,
  disableAutoFocus: true,
  disableScrollLock: true,
  sx: { position: 'static', '& .MuiDialog-container': { height: 'auto' } }
} satisfies Partial<DialogProps>

// Visual Regression - Dialog styles
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Example</h3>
        <ExampleDialog {...staticProps} />
      </section>

      {sizes.map(size => (
        <section key={size}>
          <h3 style={{ marginBottom: '12px' }}>{size}</h3>
          <Dialog {...staticProps} size={size} fullScreen={false}>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This is a {size} dialog with a title, some content and two
                action buttons.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined">Cancel</Button>
              <Button>Confirm</Button>
            </DialogActions>
          </Dialog>
        </section>
      ))}
    </Stack>
  )
}
