import { List } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Unlink } from '@linagora/twake-icons'

import MemberRow from './index'
import { Member } from './types'

const noop = (): void => {}

const roles = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' }
]

const rows: [string, Member][] = [
  [
    'Owner',
    {
      id: 'alice',
      name: 'Alice',
      subtitle: 'alice@cozy.cc',
      initials: 'A',
      isOwner: true,
      isCurrentUser: true
    }
  ],
  [
    'Role and remove button',
    {
      id: 'bob',
      name: 'Bob',
      subtitle: 'bob@cozy.cc',
      initials: 'B',
      role: 'editor',
      canChangeRole: true,
      canRemove: true
    }
  ],
  [
    'Role as text',
    {
      id: 'carol',
      name: 'Carol',
      subtitle: 'carol@cozy.cc',
      initials: 'C',
      role: 'viewer'
    }
  ],
  [
    'Action',
    {
      id: 'dave',
      name: 'Dave',
      subtitle: 'dave@cozy.cc',
      initials: 'D',
      action: { label: 'Verify', onClick: noop }
    }
  ],
  [
    'Pending',
    {
      id: 'eve',
      name: 'Eve',
      subtitle: 'eve@cozy.cc',
      initials: 'E',
      role: 'editor',
      canChangeRole: true,
      canRemove: true,
      isPending: true
    }
  ],
  [
    'Clickable group with its only role',
    {
      id: 'family',
      name: 'Family',
      subtitle: '2 members',
      isGroup: true,
      role: 'editor',
      roles: [{ value: 'editor', label: 'Editor' }],
      canChangeRole: true,
      canRemove: true,
      onClick: noop
    }
  ],
  [
    'Clickable group, other remove icon',
    {
      id: 'team',
      name: 'Team',
      subtitle: '3 members',
      isGroup: true,
      color: '#FF7F1B',
      role: 'editor',
      canRemove: true,
      removeIcon: Unlink,
      removeLabel: 'Unlink Team',
      onClick: noop
    }
  ]
]

const meta: Meta<typeof MemberRow> = {
  title: 'Members/MemberRow',
  component: MemberRow,
  tags: ['autodocs'],
  argTypes: {
    member: { control: 'object' },
    roles: { control: 'object' },
    isNew: { control: 'boolean' }
  },
  decorators: [
    (Story): React.JSX.Element => (
      <List>
        <Story />
      </List>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    member: rows[1][1],
    roles,
    isNew: false,
    onRoleChange: noop,
    onRemove: noop
  }
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <>
      {rows.map(([label, member]) => (
        <MemberRow
          key={member.id}
          member={{ ...member, name: `${member.name} (${label})` }}
          roles={roles}
          onRoleChange={noop}
          onRemove={noop}
        />
      ))}
    </>
  )
}
