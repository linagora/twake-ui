import { Cross, Icon } from '@linagora/twake-icons'
import {
  AppBar,
  AppBarProps,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const colors = [
  'default',
  'inherit',
  'primary',
  'secondary',
  'transparent',
  'error',
  'warning',
  'info',
  'success'
] as const

const meta: Meta<typeof AppBar> = {
  title: 'AppBar',
  component: AppBar,
  tags: ['autodocs'],
  args: { position: 'static' },
  argTypes: {
    color: { control: 'select', options: colors },
    position: {
      control: 'select',
      options: ['fixed', 'absolute', 'sticky', 'static', 'relative']
    },
    elevation: { control: 'number' },
    enableColorOnDark: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const Bar: React.FC<AppBarProps> = props => (
  <AppBar {...props}>
    <Toolbar>
      <IconButton aria-label="close" color="inherit" edge="start">
        <Icon icon={Cross} />
      </IconButton>
      <Typography variant="h6" color="inherit">
        {props.color ?? 'default'}
      </Typography>
    </Toolbar>
  </AppBar>
)

export const Default: Story = {
  render: args => <Bar {...args} />
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={2} sx={{ p: 4 }}>
      {colors.map(color => (
        <Bar key={color} position="static" color={color} />
      ))}
    </Stack>
  )
}
