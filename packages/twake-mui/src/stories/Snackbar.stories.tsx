import { Cross, Icon } from '@linagora/twake-icons'
import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  SnackbarContent
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

const meta: Meta<typeof Snackbar> = {
  title: 'Snackbar',
  component: Snackbar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    autoHideDuration: { control: 'number' },
    anchorOrigin: { control: 'object' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'This is a simple snackbar.',
    autoHideDuration: 2000
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const handleToggle = (): void => setOpen(prev => !prev)

    return (
      <>
        <Button variant="outlined" size="small" onClick={handleToggle}>
          Open snackbar
        </Button>
        <Snackbar
          {...args}
          open={open}
          onClose={handleToggle}
          action={
            <>
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={handleToggle}
              >
                UNDO
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleToggle}
              >
                <Icon icon={Cross} size={14} />
              </IconButton>
            </>
          }
        />
      </>
    )
  }
}

const severities = ['error', 'warning', 'info', 'success'] as const

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
      <section>
        <h3 style={{ marginBottom: '12px' }}>Message and action</h3>
        <SnackbarContent
          message="This is a simple snackbar."
          action={
            <>
              <Button variant="text" color="error" size="small">
                UNDO
              </Button>
              <IconButton aria-label="close" color="inherit">
                <Icon icon={Cross} size={14} />
              </IconButton>
            </>
          }
        />
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Message only</h3>
        <SnackbarContent message="This is a simple snackbar." />
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>With an Alert inside</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */}
          <Alert
            variant="filled"
            elevation={6}
            severity={'primary' as any}
            onClose={() => {}}
          >
            This is a primary message!
          </Alert>
          <Alert
            variant="filled"
            elevation={6}
            severity={'secondary' as any}
            onClose={() => {}}
          >
            This is a secondary message!
          </Alert>
          {/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */}
          {severities.map(severity => (
            <Alert
              key={severity}
              variant="filled"
              elevation={6}
              severity={severity}
              onClose={() => {}}
            >
              This is a {severity} message!
            </Alert>
          ))}
        </div>
      </section>
    </div>
  )
}
