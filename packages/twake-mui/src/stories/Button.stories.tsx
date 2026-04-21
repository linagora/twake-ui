import { Button, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Button>

export const Docs: Story = {
  args: {
    variant: 'contained',
    children: 'Button'
  }
}

// Visual Regression - All variants combined
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      {/* Variants */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Variants</h3>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </Stack>
      </section>

      {/* Colors */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Colors</h3>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" color="error">
            Error
          </Button>
        </Stack>
      </section>

      {/* Sizes */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Sizes</h3>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Button variant="contained" size="small">
            Small
          </Button>
          <Button variant="contained" size="medium">
            Medium
          </Button>
          <Button variant="contained" size="large">
            Large
          </Button>
        </Stack>
      </section>

      {/* States */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>States</h3>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Normal</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
        </Stack>
      </section>
    </Stack>
  )
}
