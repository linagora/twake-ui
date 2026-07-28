import { Icon, Plus } from '@linagora/twake-icons'
import { Fab, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Fab> = {
  title: 'Fab',
  component: Fab,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Fab>

export const Docs: Story = {
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'inherit']
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    variant: { control: 'select', options: ['circular', 'extended'] }
  },
  render: ({ color = 'primary', size = 'medium', variant = 'circular' }) => (
    <Fab sx={{ gap: 1 }} color={color} size={size} variant={variant}>
      <Icon icon={Plus} />
      {variant === 'extended' && <>Extended</>}
    </Fab>
  )
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4} sx={{ p: 4 }}>
      <section>
        <h3>Default</h3>
        <Stack spacing={2} direction="row">
          <Fab color="primary" size="small">
            <Icon icon={Plus} />
          </Fab>
          <Fab color="primary" size="medium">
            <Icon icon={Plus} />
          </Fab>
          <Fab color="primary" size="large">
            <Icon icon={Plus} />
          </Fab>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <Fab color="inherit" size="small">
            <Icon icon={Plus} />
          </Fab>
          <Fab color="inherit" size="medium">
            <Icon icon={Plus} />
          </Fab>
          <Fab color="inherit" size="large">
            <Icon icon={Plus} />
          </Fab>
        </Stack>
      </section>
      <section>
        <h3>Extended</h3>
        <Stack spacing={2} direction="row">
          <Fab sx={{ gap: 1 }} color="primary" size="small" variant="extended">
            <Icon icon={Plus} /> Small
          </Fab>
          <Fab sx={{ gap: 1 }} color="primary" size="medium" variant="extended">
            <Icon icon={Plus} /> Medium
          </Fab>
          <Fab sx={{ gap: 1 }} color="primary" size="large" variant="extended">
            <Icon icon={Plus} /> Large
          </Fab>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          <Fab sx={{ gap: 1 }} color="inherit" size="small" variant="extended">
            <Icon icon={Plus} /> Small
          </Fab>
          <Fab sx={{ gap: 1 }} color="inherit" size="medium" variant="extended">
            <Icon icon={Plus} /> Medium
          </Fab>
          <Fab sx={{ gap: 1 }} color="inherit" size="large" variant="extended">
            <Icon icon={Plus} /> Large
          </Fab>
        </Stack>
      </section>
      <section>
        <h3>Disabled</h3>
        <Stack spacing={2} direction="row">
          <Fab color="primary" disabled>
            <Icon icon={Plus} />
          </Fab>
          <Fab color="inherit" disabled>
            <Icon icon={Plus} />
          </Fab>
          <Fab color="primary" disabled variant="extended">
            Extended
          </Fab>
        </Stack>
      </section>
    </Stack>
  )
}
