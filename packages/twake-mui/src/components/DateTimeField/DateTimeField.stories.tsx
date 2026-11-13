import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import DateTimeField from './index'

const meta: Meta<typeof DateTimeField> = {
  title: 'DateTimeField',
  component: DateTimeField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['date', 'time'] },
    label: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'date',
    defaultValue: '2026-11-12'
  }
}

const Row: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {children}
    </Stack>
  </section>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Row title="Date and time">
        <DateTimeField type="date" defaultValue="2026-11-12" />
        <DateTimeField type="time" defaultValue="09:30" />
      </Row>

      <Row title="With a label">
        <DateTimeField
          type="date"
          label="Start date"
          defaultValue="2026-11-12"
        />
        <DateTimeField type="time" label="Start time" defaultValue="09:30" />
      </Row>

      <Row title="Sizes">
        <DateTimeField type="date" size="small" defaultValue="2026-11-12" />
        <DateTimeField type="time" size="small" defaultValue="09:30" />
      </Row>

      <Row title="Disabled">
        <DateTimeField type="date" disabled defaultValue="2026-11-12" />
        <DateTimeField type="time" disabled defaultValue="09:30" />
      </Row>
    </Stack>
  )
}
