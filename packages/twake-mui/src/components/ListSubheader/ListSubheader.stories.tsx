import { FileTypeFolder, Icon } from '@linagora/twake-icons'
import { Box, List, ListItemIcon, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { ListSubheader, ListSubheaderProps } from './index'
import { ListItemButton } from '../ListItemButton'
import { ListItemText } from '../ListItemText'

const meta: Meta<typeof ListSubheader> = {
  title: 'ListSubheader',
  component: ListSubheader,
  tags: ['autodocs'],
  argTypes: {
    gutters: {
      control: 'select',
      options: ['default', 'double', 'disabled']
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'inherit']
    },
    inset: { control: 'boolean' },
    disableSticky: { control: 'boolean' }
  },
  decorators: [
    (Story): React.ReactElement => (
      <Box sx={{ maxWidth: 480 }}>
        <Story />
      </Box>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

const Example: React.FC<ListSubheaderProps> = props => (
  <List
    subheader={<ListSubheader {...props}>This is the subheader</ListSubheader>}
  >
    <ListItemButton>
      <ListItemIcon>
        <Icon icon={FileTypeFolder} size={32} />
      </ListItemIcon>
      <ListItemText primary="I'm a primary text" />
    </ListItemButton>
  </List>
)

export const Default: Story = {
  args: {
    gutters: 'default'
  },
  render: args => <Example {...args} />
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Default gutters">
        <Example />
      </Row>
      <Row title="Disabled gutters">
        <Example gutters="disabled" />
      </Row>
      <Row title="Double gutters">
        <Example gutters="double" />
      </Row>
      <Row title="Inset">
        <Example inset />
      </Row>
      <Row title="Not sticky">
        <Example disableSticky />
      </Row>
      <Row title="Primary color">
        <Example color="primary" />
      </Row>
    </Stack>
  )
}
