import {
  Attachment,
  Attention,
  Bottom,
  Contrast,
  Copy,
  Icon,
  Pen,
  People,
  Telephone
} from '@linagora/twake-icons'
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

const items = [
  <MenuItem key="modify">
    <ListItemIcon>
      <Icon icon={Pen} />
    </ListItemIcon>
    <ListItemText primary="Modify" />
    <ListItemIcon>
      <Typography color="error">
        <Icon icon={Attention} />
      </Typography>
    </ListItemIcon>
  </MenuItem>,
  <MenuItem key="people">
    <ListItemIcon>
      <Icon icon={People} />
    </ListItemIcon>
    <ListItemText primary="People" />
  </MenuItem>,
  <MenuItem key="attachment">
    <ListItemIcon>
      <Icon icon={Attachment} />
    </ListItemIcon>
    <ListItemText primary="Attachment" />
  </MenuItem>,
  <MenuItem key="long">
    <ListItemIcon>
      <Icon icon={People} />
    </ListItemIcon>
    <ListItemText primary="Item with a very long title to show how it should be displayed" />
  </MenuItem>,
  <MenuItem key="no-icon">
    <ListItemText primary="Item without icon" />
  </MenuItem>,
  <Divider key="divider" />,
  <MenuItem key="call">
    <ListItemIcon>
      <Icon icon={Telephone} />
    </ListItemIcon>
    <ListItemText primary="Call" />
  </MenuItem>,
  <MenuItem key="contrast">
    <ListItemIcon>
      <Icon icon={Contrast} />
    </ListItemIcon>
    <ListItemText primary="Contrast" />
  </MenuItem>,
  <MenuItem key="copy">
    <ListItemIcon>
      <Icon icon={Copy} />
    </ListItemIcon>
    <ListItemText primary="Copy" />
  </MenuItem>
]

interface ExampleMenuProps extends Omit<MenuProps, 'open'> {
  defaultOpen?: boolean
}

const ExampleMenu: React.FC<ExampleMenuProps> = ({
  defaultOpen = false,
  ...props
}) => {
  const [button, setButton] = useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(defaultOpen)

  return (
    <>
      <Button
        ref={setButton}
        variant="text"
        endIcon={<Icon icon={Bottom} />}
        onClick={() => setOpen(!open)}
      >
        Show menu
      </Button>
      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        {...props}
        anchorEl={button}
        open={open && Boolean(button)}
        onClose={() => setOpen(false)}
      >
        {items}
      </Menu>
    </>
  )
}

const meta: Meta<typeof Menu> = {
  title: 'Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['menu', 'selectedMenu'] },
    autoFocus: { control: 'boolean' },
    disableAutoFocusItem: { control: 'boolean' },
    keepMounted: { control: 'boolean' },
    marginThreshold: { control: 'number' },
    elevation: { control: 'number' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <ExampleMenu {...args} />
}

// Visual Regression - The cozy-ui Menu doc example, opened
export const Screenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'padded' },
  render: () => (
    <Box sx={{ minHeight: 440 }}>
      <ExampleMenu
        defaultOpen
        autoFocus={false}
        disablePortal
        disableScrollLock
        transitionDuration={0}
      />
    </Box>
  )
}
