import { Chip, Box, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { screen } from 'storybook/test'

import ContactPopover from './index'

const meta: Meta<typeof ContactPopover> = {
  title: 'ContactPopover',
  component: ContactPopover,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs', 'argos'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Attendee display name'
    },
    email: {
      control: 'text',
      description: 'Attendee email address'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the popover'
    },
    onEmailCopy: {
      action: 'email copied'
    },
    onClose: {
      action: 'popover closed'
    }
  }
}

export default meta
type Story = StoryObj<typeof ContactPopover>

const Variant: React.FC<{
  title: string
  children: React.ReactNode
}> = ({ title, children }) => (
  <Box>
    <Typography variant="subtitle2" gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
)

export const Default: Story = {
  render: () => (
    <ContactPopover name="John Doe" email="john.doe@example.com">
      <Chip label="John Doe" clickable />
      <ContactPopover.Actions>
        <ContactPopover.EmailAction url="https://mail.example.com/john.doe" />
        <ContactPopover.CalendarAction url="https://calendar.example.com/john.doe" />
        <ContactPopover.ChatAction url="https://chat.example.com/john.doe" />
        <ContactPopover.VideoAction url="https://meet.example.com/john.doe" />
      </ContactPopover.Actions>
    </ContactPopover>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('John Doe'))
    await screen.findByText('john.doe@example.com')
  }
}

export const AllActionsVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Variant title="Default — all actions">
        <ContactPopover.Actions>
          <ContactPopover.EmailAction url="https://mail.example.com/john.doe" />
          <ContactPopover.CalendarAction url="https://calendar.example.com/john.doe" />
          <ContactPopover.ChatAction url="https://chat.example.com/john.doe" />
          <ContactPopover.VideoAction url="https://meet.example.com/john.doe" />
        </ContactPopover.Actions>
      </Variant>

      <Variant title="Default — all actions — Disabled">
        <ContactPopover.Actions>
          <ContactPopover.EmailAction
            disabled
            url="https://mail.example.com/jane.doe"
          />
          <ContactPopover.CalendarAction
            disabled
            url="https://calendar.example.com/jane.doe"
          />
          <ContactPopover.ChatAction
            disabled
            url="https://chat.example.com/jane.doe"
          />
          <ContactPopover.VideoAction
            disabled
            url="https://meet.example.com/jane.doe"
          />
        </ContactPopover.Actions>
      </Variant>
    </Box>
  )
}
