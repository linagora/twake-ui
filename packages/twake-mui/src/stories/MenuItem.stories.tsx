import { Icon, Pen, Trash } from '@linagora/twake-icons'
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const longText =
  'Augusta Ada King, Countess of Lovelace, was an English mathematician and writer.'

const meta: Meta<typeof MenuItem> = {
  title: 'MenuItem',
  component: MenuItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    dense: { control: 'boolean' },
    divider: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Paper sx={{ width: 256 }}>
      <MenuList>
        <MenuItem {...args}>
          <ListItemIcon>
            <Icon icon={Pen} />
          </ListItemIcon>
          <ListItemText primary="Rename" />
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

const Items: React.FC<{ dense?: boolean }> = ({ dense }) => (
  <MenuList dense={dense}>
    <MenuItem>
      <ListItemIcon>
        <Icon icon={Pen} />
      </ListItemIcon>
      <ListItemText primary="Rename" />
    </MenuItem>
    <MenuItem selected>
      <ListItemIcon>
        <Icon icon={Pen} />
      </ListItemIcon>
      <ListItemText primary="Selected" />
    </MenuItem>
    <MenuItem disabled>
      <ListItemIcon>
        <Icon icon={Pen} />
      </ListItemIcon>
      <ListItemText primary="Disabled" />
    </MenuItem>
    <MenuItem>
      <ListItemIcon>
        <Icon icon={Pen} />
      </ListItemIcon>
      <ListItemText primary={longText} secondary="Wrapping text" />
    </MenuItem>
    <MenuItem>Without icon</MenuItem>
    <Divider />
    <MenuItem>
      <ListItemIcon>
        <Icon icon={Trash} />
      </ListItemIcon>
      <ListItemText primary="Delete" />
    </MenuItem>
  </MenuList>
)

// Visual Regression - Menu items in every state
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-start' }}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Default</h3>
        <Paper sx={{ width: 256 }}>
          <Items />
        </Paper>
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Dense</h3>
        <Paper sx={{ width: 256 }}>
          <Items dense />
        </Paper>
      </section>
    </Stack>
  )
}
