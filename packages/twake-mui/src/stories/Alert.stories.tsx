import { Alert, AlertTitle } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'text',
      description:
        'Severity level (error, warning, info, success) or custom color name (primary, secondary)'
    },
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'outlined']
    },
    color: {
      control: 'text',
      description:
        'Custom color (CSS color value or MUI palette color like "primary", "secondary")'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    severity: 'info',
    variant: 'standard'
  },
  render: args => (
    <Alert {...args}>
      <AlertTitle>Alert Title</AlertTitle>
      This is the alert content text
    </Alert>
  )
}

// Visual Regression - All severity colors and variants combined
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: '400px'
      }}
    >
      {/* Standard variant - all severities */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Standard Variant</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */}
          <Alert severity={'primary' as any}>
            <AlertTitle>Primary Alert</AlertTitle>
            This is a primary alert with title and text
          </Alert>

          <Alert severity={'secondary' as any}>
            <AlertTitle>Secondary Alert</AlertTitle>
            This is a secondary alert with title and text
          </Alert>
          {/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */}

          <Alert severity="error">
            <AlertTitle>Error Alert</AlertTitle>
            This is an error alert with title and text
          </Alert>

          <Alert severity="warning">
            <AlertTitle>Warning Alert</AlertTitle>
            This is a warning alert with title and text
          </Alert>

          <Alert severity="info">
            <AlertTitle>Info Alert</AlertTitle>
            This is an info alert with title and text
          </Alert>

          <Alert severity="success">
            <AlertTitle>Success Alert</AlertTitle>
            This is a success alert with title and text
          </Alert>
        </div>
      </section>

      {/* Filled variant */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Filled Variant</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert severity="error" variant="filled">
            <AlertTitle>Filled Error</AlertTitle>
            This is a filled error alert
          </Alert>

          <Alert severity="success" variant="filled">
            <AlertTitle>Filled Success</AlertTitle>
            This is a filled success alert
          </Alert>
        </div>
      </section>

      {/* Outlined variant */}
      <section>
        <h3 style={{ marginBottom: '12px' }}>Outlined Variant</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert severity="warning" variant="outlined">
            <AlertTitle>Outlined Warning</AlertTitle>
            This is an outlined warning alert
          </Alert>

          <Alert severity="info" variant="outlined">
            <AlertTitle>Outlined Info</AlertTitle>
            This is an outlined info alert
          </Alert>
        </div>
      </section>
    </div>
  )
}
