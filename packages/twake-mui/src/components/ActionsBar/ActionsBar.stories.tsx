import { AppBarProps, Box, Button, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { FlagOutlined, Icon, Star } from '@linagora/twake-icons'

import { call } from '../ActionsMenu/Actions/call'
import { download } from '../ActionsMenu/Actions/download'
import { emailTo } from '../ActionsMenu/Actions/emailTo'
import { makeActions } from '../ActionsMenu/Actions/helpers'
import { modify } from '../ActionsMenu/Actions/modify'
import { smsTo } from '../ActionsMenu/Actions/smsTo'
import { ActionDocument } from '../ActionsMenu/types'
import ActionsBar from './index'

const doc: ActionDocument = {
  _id: 'id01',
  _type: 'io.cozy.contacts',
  phone: [{ number: '0102030405' }],
  email: [{ address: 'johndoe@example.com' }]
}

const actions = makeActions([modify, call, download, smsTo, emailTo], {
  client: {
    getStackClient: () => ({ uri: 'https://' }),
    getInstanceOptions: () => ({ subdomain: '' })
  },
  generateWebLink: () => '',
  downloadFile: () => undefined
})

const StarIcon = (): React.JSX.Element => (
  <Box component="span" sx={{ display: 'inline-flex', mr: 2 }}>
    <Icon icon={Star} />
  </Box>
)

const FlagIcon = (): React.JSX.Element => (
  <Box component="span" sx={{ display: 'inline-flex', mr: 2 }}>
    <Icon icon={FlagOutlined} />
  </Box>
)

const icons = { default: undefined, star: StarIcon, flag: FlagIcon }

interface ExampleArgs {
  color: AppBarProps['color']
  icon: keyof typeof icons
  maxDesktopActions: number
  autoClose: boolean
}

const ExampleActionsBar = ({
  color,
  icon,
  maxDesktopActions,
  autoClose
}: ExampleArgs): React.JSX.Element => {
  const [docs, setDocs] = useState<ActionDocument[]>([doc, doc])

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={() => setDocs([...docs, doc])}>
          Add a selected document
        </Button>
        <Button variant="outlined" onClick={() => setDocs(docs.slice(1))}>
          Remove a selected document
        </Button>
      </Stack>
      {docs.length > 0 && (
        <ActionsBar
          actions={actions}
          docs={docs}
          color={color}
          IconComponent={icons[icon]}
          maxDesktopActions={maxDesktopActions}
          autoClose={autoClose}
          onClose={() => setDocs([])}
        />
      )}
    </>
  )
}

const meta: Meta<ExampleArgs> = {
  title: 'ActionsBar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'inherit',
        'primary',
        'secondary',
        'transparent',
        'error',
        'warning',
        'info',
        'success'
      ]
    },
    icon: { control: 'select', options: Object.keys(icons) },
    maxDesktopActions: { control: 'number' },
    autoClose: { control: 'boolean' }
  },
  args: {
    color: 'default',
    icon: 'default',
    maxDesktopActions: 5,
    autoClose: true
  },
  render: args => (
    <Box sx={{ minHeight: 200, pt: 10, px: 2 }}>
      <ExampleActionsBar {...args} />
    </Box>
  )
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Visual Regression - the bar over two selected documents. Kept out of the
// docs page, where its fixed bar would cover the other stories
export const Screenshot: Story = {
  tags: ['argos', '!autodocs'],
  render: () => (
    <Box sx={{ minHeight: 200 }}>
      <ActionsBar
        actions={actions}
        docs={[doc, doc]}
        onClose={() => undefined}
      />
    </Box>
  )
}
