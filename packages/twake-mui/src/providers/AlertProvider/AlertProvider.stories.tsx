import { Button } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import AlertProvider from './index'
import { ShowAlertOptions, useAlert } from './useAlert'

const severities = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

const variants = ['filled', 'standard', 'outlined'] as const

interface StoryArgs extends ShowAlertOptions {
  closable: boolean
}

const makeOptions = ({ closable, ...options }: StoryArgs): ShowAlertOptions =>
  closable ? options : { ...options, onClose: undefined }

const meta: Meta<StoryArgs> = {
  title: 'AlertProvider',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    title: { control: 'text' },
    severity: { control: 'select', options: severities },
    variant: { control: 'select', options: variants },
    icon: {
      control: 'select',
      options: ['default', 'none'],
      mapping: { default: undefined, none: false }
    },
    duration: {
      control: 'number',
      description: 'Milliseconds before the alert hides, `null` to keep it open'
    },
    noTimeOut: { control: 'boolean' },
    noClickAway: { control: 'boolean' },
    closable: {
      control: 'boolean',
      description: 'Story only: passes `onClose: undefined` when off'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const ShowAlertButton: React.FC<{ args: StoryArgs }> = ({ args }) => {
  const { showAlert } = useAlert()

  return (
    <Button onClick={() => showAlert(makeOptions(args))}>Show alert</Button>
  )
}

export const Default: Story = {
  args: {
    message: 'Alert message',
    severity: 'success',
    variant: 'filled',
    noTimeOut: false,
    noClickAway: false,
    closable: true
  },
  render: args => (
    <AlertProvider>
      <ShowAlertButton args={args} />
    </AlertProvider>
  )
}
