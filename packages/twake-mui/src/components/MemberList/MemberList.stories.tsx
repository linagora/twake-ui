import { Button, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { Member } from '../MemberRow/types'
import MemberList, { MemberListProps } from './index'

const roles = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' }
]

const owner: Member = {
  id: 'alice',
  name: 'Alice',
  subtitle: 'alice@cozy.cc',
  initials: 'A',
  isOwner: true,
  isCurrentUser: true
}

const members: Member[] = [
  owner,
  {
    id: 'bob',
    name: 'Bob',
    subtitle: 'bob@cozy.cc',
    initials: 'B',
    role: 'editor',
    canChangeRole: true,
    canRemove: true
  },
  {
    id: 'carol',
    name: 'Carol',
    subtitle: 'Invitation sent',
    initials: 'C',
    role: 'viewer',
    canChangeRole: true,
    canRemove: true
  }
]

const noop = (): void => {}

const StatefulMemberList = (
  props: Pick<MemberListProps, 'members' | 'showEmptyState'>
): React.JSX.Element => {
  const [listMembers, setListMembers] = useState(props.members)

  const add = (): void => {
    setListMembers(previous => [
      ...previous,
      {
        id: `dave-${previous.length}`,
        name: 'Dave',
        subtitle: 'dave@cozy.cc',
        initials: 'D',
        role: 'viewer',
        canChangeRole: true,
        canRemove: true
      }
    ])
  }

  const changeRole = (member: Member, role: string): void => {
    setListMembers(previous =>
      previous.map(m => (m.id === member.id ? { ...m, role } : m))
    )
  }

  const remove = (member: Member): void => {
    setListMembers(previous => previous.filter(m => m.id !== member.id))
  }

  return (
    <>
      <Button variant="outlined" onClick={add}>
        Add a member
      </Button>
      <MemberList
        members={listMembers}
        roles={roles}
        showEmptyState={props.showEmptyState}
        onRoleChange={changeRole}
        onRemove={remove}
      />
    </>
  )
}

const meta: Meta<typeof MemberList> = {
  title: 'Members/MemberList',
  component: MemberList,
  tags: ['autodocs'],
  argTypes: {
    members: { control: 'object' },
    showEmptyState: { control: 'boolean' }
  },
  render: args => (
    <StatefulMemberList
      members={args.members}
      showEmptyState={args.showEmptyState}
    />
  )
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    members,
    roles,
    showEmptyState: true,
    onRoleChange: noop,
    onRemove: noop
  }
}

export const EmptyState: Story = {
  args: {
    members: [owner],
    roles,
    showEmptyState: true,
    onRoleChange: noop,
    onRemove: noop
  }
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Members</h3>
        <MemberList
          members={members}
          roles={roles}
          onRoleChange={noop}
          onRemove={noop}
        />
      </section>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Empty state</h3>
        <MemberList
          members={[owner]}
          roles={[]}
          onRoleChange={noop}
          onRemove={noop}
        />
      </section>
    </Stack>
  )
}
