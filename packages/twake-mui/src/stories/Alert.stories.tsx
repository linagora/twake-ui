import { DeviceLaptop, Dots, Download, Icon } from '@linagora/twake-icons'
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  ListItemIcon
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const severities = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

const message =
  'Get Twake Drive for Desktop and synchronise your files safely to make them accessible at all times.'

const longMessage =
  'Ada Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage proposed mechanical general-purpose computer, the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation.'

// primary and secondary have no Button equivalent, they use the default color
const makeButtonColor = (
  severity: (typeof severities)[number]
): 'success' | 'error' | 'warning' | 'info' | undefined =>
  severity === 'primary' || severity === 'secondary' ? undefined : severity

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: severities
    },
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'outlined']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    severity: 'primary',
    variant: 'standard'
  },
  render: args => (
    <Alert {...args}>
      <AlertTitle>This is the title</AlertTitle>
      {message}
    </Alert>
  )
}

// Visual Regression - every severity, variant and option in a single render
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '560px'
      }}
    >
      <section>
        <h3 style={{ marginBottom: '12px' }}>Standard</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {severities.map(severity => (
            <Alert
              key={severity}
              severity={severity}
              action={
                <Button
                  variant="text"
                  size="small"
                  color={makeButtonColor(severity)}
                >
                  ACTION
                </Button>
              }
            >
              <AlertTitle>{severity}</AlertTitle>
              This is a {severity} alert
            </Alert>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Filled</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {severities.map(severity => (
            <Alert
              key={severity}
              variant="filled"
              severity={severity}
              action={
                <Button variant="text" size="small" color="inherit">
                  ACTION
                </Button>
              }
            >
              <AlertTitle>{severity}</AlertTitle>
              This is a {severity} alert
            </Alert>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Outlined</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {severities.map(severity => (
            <Alert
              key={severity}
              variant="outlined"
              severity={severity}
              action={
                <Button
                  variant="text"
                  size="small"
                  color={makeButtonColor(severity)}
                >
                  ACTION
                </Button>
              }
            >
              <AlertTitle>{severity}</AlertTitle>
              This is a {severity} alert
            </Alert>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Options</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert>{message}</Alert>

          <Alert>
            <AlertTitle>This is the title</AlertTitle>
            {message}
          </Alert>

          <Alert>{longMessage}</Alert>

          <Alert icon={false}>{message}</Alert>

          <Alert icon={<Icon icon={DeviceLaptop} size={32} />}>{message}</Alert>

          <Alert className="square">{message}</Alert>

          <Alert sx={{ backgroundColor: '#EFA82D' }}>{message}</Alert>

          <Alert onClose={() => undefined}>{message}</Alert>

          <Alert
            action={
              <Button
                variant="text"
                size="small"
                startIcon={<Icon icon={Download} />}
              >
                Download
              </Button>
            }
          >
            {message}
          </Alert>

          <Alert
            action={
              <>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<Icon icon={Download} />}
                >
                  Download
                </Button>
                <Button variant="text" size="small">
                  No, thanks!
                </Button>
                <ListItemIcon>
                  <IconButton>
                    <Icon icon={Dots} />
                  </IconButton>
                </ListItemIcon>
              </>
            }
          >
            {message}
          </Alert>

          <Alert
            className="block"
            action={
              <>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<Icon icon={Download} />}
                >
                  Download
                </Button>
                <Button variant="text" size="small">
                  No, thanks!
                </Button>
              </>
            }
          >
            <AlertTitle>This is the title</AlertTitle>
            {message}
          </Alert>
        </div>
      </section>
    </div>
  )
}
