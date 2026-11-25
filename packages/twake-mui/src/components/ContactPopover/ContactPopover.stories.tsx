import { Button, Chip, Box, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import { screen } from 'storybook/test'

import ContactCard from './ContactCard.js'
import ContactPopover from './index.js'

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

/** Opened by the app (a chip it handles itself), with actions of its own */
const ControlledCard = ({ name }: { name: string }): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  return (
    <>
      <Chip
        label={name || 'jane.doe@example.com'}
        onClick={event => setAnchorEl(event.currentTarget)}
      />
      <ContactCard
        open={anchorEl !== null}
        anchorEl={anchorEl}
        name={name}
        email="jane.doe@example.com"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => setAnchorEl(null)}
      >
        <ContactPopover.Actions>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              flexGrow: 1
            }}
          >
            <Button variant="contained" fullWidth>
              Edit
            </Button>
            <Button variant="outlined" fullWidth>
              Create a rule
            </Button>
          </Box>
        </ContactPopover.Actions>
      </ContactCard>
    </>
  )
}

export const Controlled: Story = {
  render: () => <ControlledCard name="Jane Doe" />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Jane Doe'))
    await screen.findByRole('dialog', { name: 'Jane Doe' })
  }
}

export const WithoutName: Story = {
  render: () => <ControlledCard name="" />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('jane.doe@example.com'))
    await screen.findByRole('dialog', { name: 'jane.doe@example.com' })
  }
}
