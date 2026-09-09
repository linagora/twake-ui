import {
  Cross,
  Icon,
  People,
  Restore,
  Stop,
  Trash
} from '@linagora/twake-icons'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof IconButton> = {
  title: 'IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'inherit', 'primary', 'secondary', 'error']
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large']
    },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Icon icon={People} />
  }
}

const sizes = ['xsmall', 'small', 'medium', 'large'] as const

const Row = ({
  size,
  disabled
}: {
  size: (typeof sizes)[number]
  disabled?: boolean
}): React.ReactElement => (
  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
    <IconButton size={size} disabled={disabled}>
      <Icon icon={People} />
    </IconButton>
    <IconButton color="primary" size={size} disabled={disabled}>
      <Icon icon={Restore} />
    </IconButton>
    <IconButton color="secondary" size={size} disabled={disabled}>
      <Icon icon={Cross} />
    </IconButton>
    <IconButton color="error" size={size} disabled={disabled}>
      <Icon icon={Trash} />
    </IconButton>
  </Stack>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4} sx={{ p: 4 }}>
      {sizes.map(size => (
        <section key={size}>
          <h3>{size}</h3>
          <Stack direction="row" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="caption">default</Typography>
              <Row size={size} />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="caption">disabled</Typography>
              <Row size={size} disabled />
            </Stack>
          </Stack>
        </section>
      ))}
      <section>
        <h3>Embedded button</h3>
        <IconButton size="small">
          <Button
            component="div"
            sx={{
              minWidth: 'auto',
              width: 16,
              height: 16,
              borderRadius: '50%'
            }}
            size="small"
          >
            <Icon icon={Stop} size={12} />
          </Button>
        </IconButton>
      </section>
    </Stack>
  )
}
