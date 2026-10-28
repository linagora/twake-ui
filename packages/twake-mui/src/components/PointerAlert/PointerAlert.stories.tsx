/* eslint-disable no-console */
import { AlertTitle, Button, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Download, Icon } from '@linagora/twake-icons'

import PointerAlert, { PointerAlertDirection } from './index'

const directions: PointerAlertDirection[] = ['top', 'bottom', 'left', 'right']

const severities = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

const variants = ['standard', 'filled', 'outlined'] as const

const makeActionColor = (
  variant: (typeof variants)[number],
  severity: (typeof severities)[number]
): 'inherit' | (typeof severities)[number] | undefined => {
  if (variant === 'filled') return 'inherit'
  return severity === 'primary' || severity === 'secondary'
    ? undefined
    : severity
}

const text =
  'Get Cozy Drive for Desktop and synchronise your files safely to make them accessible at all times.'

const downloadAction = (
  <Button variant="text" size="small" startIcon={<Icon icon={Download} />}>
    Download
  </Button>
)

const meta: Meta<typeof PointerAlert> = {
  title: 'PointerAlert',
  component: PointerAlert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: directions },
    position: {
      control: 'text',
      description: 'Any CSS length or percentage, e.g. `30%` or `100px`'
    },
    severity: { control: 'select', options: severities },
    variant: { control: 'select', options: variants },
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
    direction: 'bottom',
    position: '50%',
    severity: 'primary',
    variant: 'standard'
  },
  render: args => (
    <PointerAlert {...args} sx={{ width: 480 }} action={downloadAction}>
      {text}
    </PointerAlert>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Stack spacing={1} useFlexGap>
      {children}
    </Stack>
  </section>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={3} sx={{ width: 640 }}>
      <Section title="Directions">
        {directions.map(direction => (
          <PointerAlert
            key={direction}
            direction={direction}
            severity="primary"
            action={downloadAction}
          >
            {direction}: {text}
          </PointerAlert>
        ))}
      </Section>

      <Section title="Positions">
        {['calc(0% + 0.75rem)', '30%', '100px', 'calc(100% - 0.75rem)'].map(
          position => (
            <PointerAlert key={position} position={position} severity="info">
              {position}
            </PointerAlert>
          )
        )}
      </Section>

      {variants.map(variant => (
        <Section key={variant} title={`${variant} variant`}>
          {severities.map(severity => (
            <PointerAlert
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
            </PointerAlert>
          ))}
        </Section>
      ))}

      <Section title="Content">
        <PointerAlert severity="primary">
          <AlertTitle>This is the title</AlertTitle>
          {text}
        </PointerAlert>
        <PointerAlert severity="primary" onClose={() => console.log('closed')}>
          {text}
        </PointerAlert>
        <PointerAlert
          severity="primary"
          action={
            <>
              {downloadAction}
              <Button variant="text" size="small">
                No, thanks!
              </Button>
            </>
          }
        >
          {text}
        </PointerAlert>
      </Section>
    </Stack>
  )
}
