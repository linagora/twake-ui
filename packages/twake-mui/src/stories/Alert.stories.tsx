/* eslint-disable no-console */
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  ListItemIcon,
  Stack,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Dots, Download, Icon } from '@linagora/twake-icons'

import TwakeAlert from '../components/Alert'

const severities = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

const variants = ['standard', 'filled', 'outlined'] as const

// cozy-ui's doc tints the action button like the alert, except on `filled`
// where the alert already carries the contrast, and on primary/secondary where
// the button's own default already is that colour.
const makeActionColor = (
  variant: (typeof variants)[number],
  severity: (typeof severities)[number]
): 'inherit' | (typeof severities)[number] | undefined => {
  if (variant === 'filled') return 'inherit'
  return severity === 'primary' || severity === 'secondary'
    ? undefined
    : severity
}

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
      options: variants
    },
    color: {
      control: 'select',
      options: severities,
      description: 'Overrides the colour taken from `severity`'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    severity: 'success',
    variant: 'standard'
  },
  render: args => (
    <Alert {...args}>
      Get Cozy Drive for Desktop and synchronise your files safely to make them
      accessible at all times.
    </Alert>
  )
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={3} sx={{ width: 640 }}>
      {variants.map(variant => (
        <section key={variant}>
          <Typography variant="h4" gutterBottom>
            {variant} variant
          </Typography>
          <Stack spacing={1}>
            {severities.map(severity => (
              <Alert
                key={severity}
                variant={variant}
                severity={severity}
                action={
                  <Button
                    variant="text"
                    size="small"
                    color={makeActionColor(variant, severity)}
                  >
                    ACTION
                  </Button>
                }
              >
                <AlertTitle>{severity}</AlertTitle>
                This is a {severity} alert
              </Alert>
            ))}
          </Stack>
        </section>
      ))}

      <section>
        <Typography variant="h4" gutterBottom>
          Content
        </Typography>
        <Stack spacing={1}>
          <Alert severity="info">Get Cozy Drive for Desktop.</Alert>
          <Alert severity="info">
            Get Cozy Drive for Desktop and synchronise your files safely to make
            them accessible at all times.
          </Alert>
          <Alert severity="info">
            <AlertTitle>This is the title</AlertTitle>
            Get Cozy Drive for Desktop and synchronise your files safely to make
            them accessible at all times.
          </Alert>
        </Stack>
      </section>

      <section>
        <Typography variant="h4" gutterBottom>
          Actions
        </Typography>
        <Stack spacing={1}>
          <Alert severity="info" onClose={() => console.log('closed')}>
            <AlertTitle>This is the title</AlertTitle>
            Dismissable with a close button
          </Alert>
          <Alert
            severity="info"
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
            Get Cozy Drive for Desktop and synchronise your files safely to make
            them accessible at all times.
          </Alert>
        </Stack>
      </section>
    </Stack>
  )
}

/** The action on a row of its own under the message (`block`), at the end, the start or the centre */
export const ActionBelow: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={2} sx={{ width: 360 }}>
      <TwakeAlert
        severity="secondary"
        block
        action={
          <Button variant="text" size="small">
            Empty trash now
          </Button>
        }
      >
        `block`: all messages in Trash will be deleted if you reach limited
        storage.
      </TwakeAlert>
      <TwakeAlert
        severity="secondary"
        block="start"
        action={
          <>
            <Button variant="text" size="small">
              Show
            </Button>
            <Button variant="text" size="small">
              Always show for this sender
            </Button>
          </>
        }
      >
        `block=&quot;start&quot;`: remote images hidden to protect your privacy
      </TwakeAlert>
      <TwakeAlert
        severity="secondary"
        block="center"
        action={
          <Button variant="text" size="small">
            Empty spam now
          </Button>
        }
      >
        `block=&quot;center&quot;`: all messages in Spam will be deleted if you
        reach limited storage.
      </TwakeAlert>
      <TwakeAlert
        severity="secondary"
        action={
          <Button variant="text" size="small">
            Show
          </Button>
        }
      >
        The default placement, beside the message
      </TwakeAlert>
    </Stack>
  )
}
