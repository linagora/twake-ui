import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { Member } from '../MemberRow/types'
import MemberAutocomplete from './index'

const contacts: Member[] = [
  {
    id: 'alice',
    name: 'Alice Wonderland',
    subtitle: 'alice@cozy.cc',
    email: 'alice@cozy.cc',
    initials: 'AW'
  },
  {
    id: 'bob',
    name: 'Bob Sponge',
    subtitle: 'bob@cozy.cc',
    email: 'bob@cozy.cc',
    initials: 'BS'
  },
  {
    id: 'carol',
    name: 'Carol Singer',
    subtitle: 'carol@cozy.cc',
    email: 'carol@cozy.cc',
    initials: 'CS'
  },
  {
    id: 'family',
    name: 'Family',
    subtitle: '3 members',
    isGroup: true,
    color: '#FF7F1B'
  }
]

const roles = [
  { value: 'readWrite', label: 'Can edit' },
  { value: 'readOnly', label: 'Can view' }
]

const getSuggestions = (text: string): Member[] =>
  contacts.filter(contact =>
    [contact.name ?? '', contact.email ?? ''].some(field =>
      field.toLowerCase().includes(text.toLowerCase())
    )
  )

const getMembersFromText = (text: string): Member[] =>
  (text.match(/[^\s,;]+@[^\s,;]+\.[^\s,;]+/g) ?? []).map(email => ({
    id: email,
    name: email,
    subtitle: '-',
    email,
    initials: email[0].toUpperCase()
  }))

const noop = (): void => {}

interface DemoProps {
  hasTitle: boolean
  hasRoles: boolean
  hasSubmit: boolean
  loading: boolean
  disabled: boolean
  initialMembers?: Member[]
}

const Demo = ({
  hasTitle,
  hasRoles,
  hasSubmit,
  loading,
  disabled,
  initialMembers = []
}: DemoProps): React.JSX.Element => {
  const [members, setMembers] = useState(initialMembers)
  const [role, setRole] = useState('readWrite')

  return (
    <MemberAutocomplete
      value={members}
      getSuggestions={getSuggestions}
      getMembersFromText={getMembersFromText}
      roles={hasRoles ? roles : undefined}
      role={role}
      title={hasTitle ? 'Add people' : undefined}
      placeholder="Type a name or email address"
      loading={loading}
      disabled={disabled}
      onChange={setMembers}
      onRoleChange={setRole}
      onSubmit={hasSubmit ? (): void => setMembers([]) : undefined}
    />
  )
}

const meta: Meta<typeof Demo> = {
  title: 'Members/MemberAutocomplete',
  component: Demo,
  tags: ['autodocs'],
  argTypes: {
    hasTitle: { control: 'boolean' },
    hasRoles: { control: 'boolean' },
    hasSubmit: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hasTitle: true,
    hasRoles: true,
    hasSubmit: true,
    loading: false,
    disabled: false
  }
}

export const WithPickedMembers: Story = {
  render: () => (
    <MemberAutocomplete
      value={[contacts[0], contacts[1], contacts[3]]}
      title="Add people"
      onChange={noop}
      onSubmit={noop}
    />
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    {children}
  </section>
)

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Title, roles and send button">
        <Demo hasTitle hasRoles hasSubmit loading={false} disabled={false} />
      </Section>
      <Section title="Field only">
        <Demo
          hasTitle={false}
          hasRoles={false}
          hasSubmit={false}
          loading={false}
          disabled={false}
        />
      </Section>
      <Section title="Loading">
        <Demo hasTitle={false} hasRoles hasSubmit loading disabled={false} />
      </Section>
      <Section title="Disabled">
        <Demo hasTitle={false} hasRoles hasSubmit loading={false} disabled />
      </Section>
      <Section title="With picked members">
        <MemberAutocomplete
          value={[contacts[0], contacts[1], contacts[3]]}
          title="Add people"
          onChange={noop}
          onSubmit={noop}
        />
      </Section>
      <Section title="More members than shown">
        <Demo
          hasTitle={false}
          hasRoles
          hasSubmit
          loading={false}
          disabled={false}
          initialMembers={contacts}
        />
      </Section>
    </Stack>
  )
}
