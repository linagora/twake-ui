import { Chip, Box, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useEffect, useRef } from 'react'

import { ContactPopover } from './index'

const meta: Meta<typeof ContactPopover> = {
  title: 'Components/ContactPopover',
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

export const Default: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const timer = setTimeout(() => {
        containerRef.current
          ?.querySelectorAll<HTMLElement>('[role="button"]')[0]
          .click()
      }, 100)
      return (): void => clearTimeout(timer)
    }, [])

    return (
      <Box
        ref={containerRef}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Default — all actions
          </Typography>
          <ContactPopover name="John Doe" email="john.doe@example.com">
            <Chip label="John Doe" clickable />
            <ContactPopover.Actions>
              <ContactPopover.EmailAction url="https://mail.example.com/john.doe" />
              <ContactPopover.CalendarAction url="https://calendar.example.com/john.doe" />
              <ContactPopover.ChatAction url="https://chat.example.com/john.doe" />
              <ContactPopover.VideoAction url="https://meet.example.com/john.doe" />
            </ContactPopover.Actions>
          </ContactPopover>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Email only
          </Typography>
          <ContactPopover name="" email="jane.smith@example.com">
            <Chip label="jane.smith@example.com" clickable />
            <ContactPopover.Actions>
              <ContactPopover.EmailAction url="mailto:jane.smith@example.com" />
            </ContactPopover.Actions>
          </ContactPopover>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Without actions
          </Typography>
          <ContactPopover name="Alice Brown" email="alice.brown@example.com">
            <Chip label="Alice Brown" clickable />
          </ContactPopover>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Long name / email
          </Typography>
          <ContactPopover
            name="Christopher Alexander Montgomery"
            email="christopher.montgomery@verylongdomain.example.com"
          >
            <Chip label="Christopher Alexander Montgomery" clickable />
            <ContactPopover.Actions>
              <ContactPopover.ChatAction url="https://chat.example.com/christopher" />
              <ContactPopover.VideoAction url="https://meet.example.com/christopher" />
              <ContactPopover.CalendarAction url="https://calendar.example.com/christopher" />
            </ContactPopover.Actions>
          </ContactPopover>
        </Box>
      </Box>
    )
  }
}
