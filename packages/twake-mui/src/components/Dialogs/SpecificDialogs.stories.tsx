import { Button, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import AlertProvider from '../../providers/AlertProvider'
import InstallFlagshipAppDialog from './InstallFlagshipAppDialog'
import ShortcutDialog from './ShortcutDialog'

const noop = (): void => undefined

const specificDialogs = {
  InstallFlagshipAppDialog,
  ShortcutDialog: ({ onClose }): React.ReactElement => (
    <ShortcutDialog onClose={onClose} onSave={noop} />
  )
} satisfies Record<string, React.FC<{ onClose: () => void }>>

type SpecificDialogName = keyof typeof specificDialogs

const Openers: React.FC = () => {
  const [opened, setOpened] = useState<SpecificDialogName | null>(null)
  const OpenedDialog = opened && specificDialogs[opened]

  return (
    <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
      {Object.keys(specificDialogs).map(name => (
        <Button
          key={name}
          onClick={() => setOpened(name as SpecificDialogName)}
        >
          Open {name}
        </Button>
      ))}
      {OpenedDialog && <OpenedDialog onClose={() => setOpened(null)} />}
    </Stack>
  )
}

const meta: Meta = {
  title: 'Dialogs/Specific dialogs',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story): React.ReactElement => (
      <AlertProvider>
        <Story />
      </AlertProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Openers />
}

// Visual Regression - one story per dialog, since each one covers the screen
export const InstallFlagshipAppScreenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'fullscreen' },
  render: () => <InstallFlagshipAppDialog onClose={noop} />
}

export const ShortcutScreenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'fullscreen' },
  render: () => (
    <ShortcutDialog
      shortcut={{ name: 'Twake.url', url: 'https://twake.app' }}
      onClose={noop}
      onSave={noop}
    />
  )
}
