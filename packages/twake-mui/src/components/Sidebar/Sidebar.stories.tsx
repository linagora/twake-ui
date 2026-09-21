import { Check, Download, Icon, Warn } from '@linagora/twake-icons'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Sidebar } from './index'

const Nav = (): React.ReactElement => (
  <List
    disablePadding
    sx={{ display: 'flex', flexDirection: { xs: 'row', lg: 'column' } }}
  >
    <ListItemButton selected>
      <ListItemIcon>
        <Icon icon={Warn} />
      </ListItemIcon>
      <ListItemText primary="Warn" slotProps={{ primary: { noWrap: true } }} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Icon icon={Check} />
      </ListItemIcon>
      <ListItemText primary="Check" slotProps={{ primary: { noWrap: true } }} />
    </ListItemButton>
    <ListItemButton>
      <ListItemText
        primary="Secondary link"
        slotProps={{ primary: { noWrap: true } }}
      />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Icon icon={Download} />
      </ListItemIcon>
      <ListItemText
        primary="Download"
        slotProps={{ primary: { noWrap: true } }}
      />
    </ListItemButton>
  </List>
)

const meta: Meta<typeof Sidebar> = {
  title: 'Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story): React.ReactElement => (
      <Box sx={{ display: 'flex', height: 400 }}>
        <Story />
      </Box>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Nav />
  }
}

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Sidebar>
      <Nav />
    </Sidebar>
  )
}
