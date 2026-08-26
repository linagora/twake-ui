import {
  CalendarApp as Calendar,
  CalendarText,
  Camera,
  Chat,
  ChatText,
  Contacts,
  ContactText,
  Drive,
  DriveText,
  Mail,
  MailText,
  Notes,
  NoteText,
  Profile,
  ProText,
  VisioText
} from '@linagora/twake-icons'
import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import AppTitle from './index'

const meta: Meta<typeof AppTitle> = {
  title: 'AppTitle',
  component: AppTitle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    appIcon: {
      control: false,
      description: 'Icon component for the app logo'
    },
    appTextIcon: {
      control: false,
      description: 'Icon component for the app text/name'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const appLogotypes = [
  { name: 'Calendar', icon: Calendar, textIcon: CalendarText },
  { name: 'Chat', icon: Chat, textIcon: ChatText },
  { name: 'Contacts', icon: Contacts, textIcon: ContactText },
  { name: 'Drive', icon: Drive, textIcon: DriveText },
  { name: 'Mail', icon: Mail, textIcon: MailText },
  { name: 'Notes', icon: Notes, textIcon: NoteText },
  { name: 'Pro', icon: Profile, textIcon: ProText },
  { name: 'Visio', icon: Camera, textIcon: VisioText }
]

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={3}>
      {appLogotypes.map(app => (
        <Box key={app.name}>
          <AppTitle appIcon={app.icon} appTextIcon={app.textIcon} />
        </Box>
      ))}
    </Stack>
  )
}
